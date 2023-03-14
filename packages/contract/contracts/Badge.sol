// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {ERC1155Upgradeable, IERC1155Upgradeable, IERC1155MetadataURIUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {AccessControlUpgradeable, IAccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract Badge is ERC1155Upgradeable, AccessControlUpgradeable {
    bytes32 public constant TOASTMASTER_ROLE = keccak256("TOASTMASTER_ROLE");

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
        _mint(to, id, amount, "");
    }

    function mintBatch(
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) public onlyRole(TOASTMASTER_ROLE) {
        _mintBatch(to, ids, amounts, "");
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
}
