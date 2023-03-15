// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {ERC1155Upgradeable, IERC1155Upgradeable, IERC1155MetadataURIUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {AccessControlUpgradeable, IAccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract Badge is ERC1155Upgradeable, AccessControlUpgradeable {
    bytes32 public constant TOASTMASTER_ROLE = keccak256("TOASTMASTER_ROLE");
    mapping(uint256 => uint256) public totalSupply;

    function initialize(
        string calldata uri_,
        address initialDefaultAdmin
    ) public initializer {
        __ERC1155_init(uri_);
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, initialDefaultAdmin);
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount
    ) public onlyRole(TOASTMASTER_ROLE) {
        require(exists(id), "Token does not exist");
        _mint(to, id, amount, "");
    }

    function mintBatch(
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) public onlyRole(TOASTMASTER_ROLE) {
        _mintBatch(to, ids, amounts, "");
    }

    function exists(uint256 id) public view virtual returns (bool) {
        return totalSupply[id] > 0;
    }

    function createCollection(uint256 id, uint256 _totalSupply) public {
        totalSupply[id] = _totalSupply;
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
                totalSupply[ids[i]] += amounts[i];
            }
        }

        if (to == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                uint256 id = ids[i];
                uint256 amount = amounts[i];
                uint256 supply = totalSupply[id];
                require(
                    supply >= amount,
                    "ERC1155: burn amount exceeds totalSupply"
                );
                unchecked {
                    totalSupply[id] = supply - amount;
                }
            }
        }
    }
}
