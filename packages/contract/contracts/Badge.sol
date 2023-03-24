// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {ERC1155Upgradeable, IERC1155Upgradeable, IERC1155MetadataURIUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {ERC1155URIStorageUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import {AccessControlUpgradeable, IAccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract Badge is
    ERC1155Upgradeable,
    ERC1155URIStorageUpgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable
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
        __Pausable_init();
    }

    function mint(address to, uint256 id) public onlyRole(TOASTMASTER_ROLE) {
        require(exists(id), "Token does not exist");
        require(
            currentSupply[id] + 1 <= totalSupply[id],
            "All tokens from this series are already minted"
        );
        _mint(to, id, 1, "");
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

    function exists(uint256 id) public view virtual returns (bool) {
        return totalSupply[id] > 0;
    }

    function createCollection(
        uint256 _totalSupply,
        string memory tokenURI_
    ) public onlyRole(TOASTMASTER_ROLE) returns (uint256) {
        uint256 id = collections;
        totalSupply[id] = _totalSupply;
        _setURI(id, tokenURI_);
        emit CollectionCreated(msg.sender, id, _totalSupply);
        collections++;
        return id;
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

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override whenNotPaused {
        super.safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override whenNotPaused {
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
