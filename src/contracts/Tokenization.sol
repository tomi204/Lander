// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import OpenZeppelin contracts for upgradeability and access control
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import { UUPSUpgradeable } from '@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
// Import custom NFT contract
import { NFT } from './NFT.sol';

/// @title Creator Contract for NFT Deployment
/// @notice This contract allows for the creation of new NFT contracts
/// @dev Implements upgradeability using UUPS pattern and access control
contract Creator is Initializable, OwnableUpgradeable, UUPSUpgradeable {
  /// @notice Emitted when a new NFT contract (crow) is created
  /// @param crow Address of the newly created NFT contract
  /// @param projectId Unique identifier for the project
  event crowCreated(address indexed crow, string projectId);

  /// @notice Initializes the contract
  /// @dev Sets up the initial owner of the contract
  function initialize() public initializer {
    __Ownable_init(msg.sender);
  }

  /// @notice Authorizes an upgrade to a new implementation
  /// @dev Required by UUPS pattern, restricted to owner
  /// @param newImplementation Address of the new implementation contract
  function _authorizeUpgrade(
    address newImplementation
  ) internal override onlyOwner {}

  /// @notice Creates a new NFT contract
  /// @dev Deploys a new instance of the NFT contract and emits an event
  /// @param _baseURI Base URI for token metadata
  /// @param _price Price of each token
  /// @param _totalSupply Total number of tokens that can be minted
  /// @param _owner Address of the NFT contract owner
  /// @param _name Name of the NFT collection
  /// @param _userId Identifier of the user creating the NFT
  /// @param _symbol Symbol of the NFT collection
  function createToken(
    string memory _baseURI,
    uint256 _price,
    uint256 _totalSupply,
    address _owner,
    string calldata _name,
    string memory _userId,
    string memory _symbol
  ) public {
    // Deploy new NFT contract
    address newCrow = address(
      new NFT(_baseURI, _price, _totalSupply, _owner, _name, _symbol)
    );
    // Emit event to log the creation of the new NFT contract
    emit crowCreated(newCrow, _userId);
  }
}
