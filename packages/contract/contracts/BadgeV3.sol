// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {ERC1155Upgradeable, IERC1155Upgradeable, IERC1155MetadataURIUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {ERC1155URIStorageUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import {AccessControlUpgradeable, IAccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract BadgeV3 is
    ERC1155Upgradeable,
    ERC1155URIStorageUpgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable
{
    bytes32 public constant TOASTMASTER_ROLE = keccak256("TOASTMASTER_ROLE");

    mapping(uint256 => Series) series;
    uint256 public countOfSeries;

    struct Series {
        address creator;
        string tokenURI;
        uint256 currentSupply;
        uint256 totalSupply;
        uint256 mintStart;
        uint256 mintEnd;
    }

    event SeriesCreated(
        address indexed creator,
        uint256 indexed collectionId,
        uint256 indexed supplyCollection
    );

    error NonTransferrableToken();

    function initialize(
        address initialDefaultAdmin
    ) public virtual initializer {
        __ERC1155URIStorage_init();
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, initialDefaultAdmin);
        __Pausable_init();
    }

    function creator(uint256 tokenId) public view virtual returns (address) {
        return series[tokenId].creator;
    }

    function currentSupply(
        uint256 tokenId
    ) public view virtual returns (uint256) {
        return series[tokenId].currentSupply;
    }

    function totalSupply(
        uint256 tokenId
    ) public view virtual returns (uint256) {
        return series[tokenId].totalSupply;
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
        string memory tokenURI = series[tokenId].tokenURI;
        return
            bytes(tokenURI).length > 0
                ? string(abi.encodePacked("ipfs://", tokenURI))
                : super.uri(tokenId);
    }

    function exists(uint256 id) public view virtual returns (bool) {
        return series[id].totalSupply > 0 && series[id].creator != address(0);
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

    function createSeries(
        uint256 _totalSupply,
        string memory tokenURI_,
        uint256 mintStart,
        uint256 mintEnd
    )
        public
        virtual
        whenNotPaused
        onlyRole(TOASTMASTER_ROLE)
        returns (uint256)
    {
        require(
            mintStart < mintEnd,
            "mintStart cannot be greater than or equal to mintEnd"
        );
        uint256 id = countOfSeries;
        Series memory serie = Series(
            msg.sender,
            tokenURI_,
            0,
            _totalSupply,
            mintStart,
            mintEnd
        );
        series[id] = serie;
        emit SeriesCreated(msg.sender, id, _totalSupply);
        countOfSeries++;
        return id;
    }

    function mint(
        address to,
        uint256 id
    ) public virtual whenNotPaused onlyRole(TOASTMASTER_ROLE) {
        require(exists(id), "Token does not exist");
        Series memory serie = series[id];
        require(serie.mintStart <= block.timestamp, "Minting hasn't started");
        require(serie.mintEnd > block.timestamp, "Minting has ended");
        require(
            serie.currentSupply + 1 <= serie.totalSupply,
            "All tokens from this series are already minted"
        );
        require(balanceOf(to, id) == 0, "Only One NFT per Wallet");
        _mint(to, id, 1, "");
    }

    function mintBatch(
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) public virtual whenNotPaused onlyRole(TOASTMASTER_ROLE) {
        uint256 idsLength = ids.length;
        uint256 amountsLength = amounts.length;

        require(idsLength == amountsLength, "Input array length mismatch");

        for (uint256 i = 0; i < idsLength; i++) {
            require(exists(i), "Token does not exist");
            Series memory serie = series[i];
            require(
                serie.mintStart <= block.timestamp,
                "Minting hasn't started"
            );
            require(serie.mintEnd > block.timestamp, "Minting has ended");
            require(
                serie.currentSupply + 1 <= serie.totalSupply,
                "All tokens from this series are already minted"
            );
            require(balanceOf(to, i) == 0, "Only One NFT per Wallet");
        }
        _mintBatch(to, ids, amounts, "");
    }

    function pause() external virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function _beforeTokenTransfer(
        address,
        address from,
        address,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory
    ) internal virtual override {
        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                series[ids[i]].currentSupply += amounts[i];
            }
        } else {
            revert NonTransferrableToken();
        }
    }
}
