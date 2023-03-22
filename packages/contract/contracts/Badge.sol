// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {ERC1155Upgradeable, IERC1155Upgradeable, IERC1155MetadataURIUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {ERC1155URIStorageUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import {AccessControlUpgradeable, IAccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract Badge is
    ERC1155Upgradeable,
    ERC1155URIStorageUpgradeable,
    AccessControlUpgradeable
{
    bytes32 public constant TOASTMASTER_ROLE = keccak256("TOASTMASTER_ROLE");
    mapping(uint256 => uint256) public totalSupply;
    mapping(uint256 => uint256) public currentSupply;
    uint256 public collections;

    event CollectionCreated(
        address indexed creator,
        uint256 indexed collectionId,
        uint256 indexed supplyCollection
    );

    function initialize(
        string calldata baseUri_,
        address initialDefaultAdmin
    ) public initializer {
        __ERC1155URIStorage_init();
        _setBaseURI(baseUri_);
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, initialDefaultAdmin);
    }

    function mint(address to, uint256 id) public onlyRole(TOASTMASTER_ROLE) {
        require(exists(id), "Token does not exist");
        require(
            currentSupply[id] + 1 <= totalSupply[id],
            "All tokens from this series are already minted"
        );
        _mint(to, id, 1, "");
    }

    function uri(
        uint256 tokenId
    )
        public
        view
        virtual
        override(ERC1155Upgradeable, ERC1155URIStorageUpgradeable)
        returns (string memory)
    {
        return ERC1155URIStorageUpgradeable.uri(tokenId);
    }

    function mintBatch(
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) public onlyRole(TOASTMASTER_ROLE) {
        uint256 idsLength = ids.length;
        uint256 amountsLength = amounts.length;

        require(idsLength == amountsLength, "Input array length mismatch");

        for (uint256 i = 0; i < idsLength; i++) {
            require(exists(i), "Token does not exist");
            require(
                currentSupply[i] + amounts[i] <= totalSupply[i],
                "All tokens from this series are already minted"
            );
        }
        _mintBatch(to, ids, amounts, "");
    }

    function exists(uint256 id) public view virtual returns (bool) {
        return totalSupply[id] > 0;
    }

    function createCollection(
        uint256 _totalSupply,
        string memory tokenURI_
    ) public onlyRole(TOASTMASTER_ROLE) {
        uint256 id = collections;
        totalSupply[id] = _totalSupply;
        _setURI(id, tokenURI_);
        emit CollectionCreated(msg.sender, id, _totalSupply);
        collections++;
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC1155Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return
            interfaceId == type(IERC1155Upgradeable).interfaceId ||
            interfaceId == type(IERC1155MetadataURIUpgradeable).interfaceId ||
            interfaceId == type(IAccessControlUpgradeable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                currentSupply[ids[i]] += amounts[i];
            }
        }

        if (to == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                uint256 id = ids[i];
                uint256 amount = amounts[i];
                uint256 totalSupply_ = totalSupply[id];
                uint256 currentSupply_ = currentSupply[id];

                require(
                    currentSupply_ >= amount && totalSupply_ >= amount,
                    "ERC1155: burn amount exceeds totalSupply"
                );
                unchecked {
                    totalSupply[id] = totalSupply_ - amount;
                    currentSupply[id] = currentSupply_ - amount;
                }
            }
        }
    }
}
