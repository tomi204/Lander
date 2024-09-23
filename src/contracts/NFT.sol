// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import 'erc721a/contracts/ERC721A.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import { Pausable } from '@openzeppelin/contracts/utils/Pausable.sol';

/**
 * @title NFT
 * @dev Implements an ERC721A token with USDC minting options
 */
contract NFT is ERC721A, Ownable, Pausable {
  /// @dev Price of each NFT
  uint256 public price;

  /// @dev Maximum supply of NFTs
  uint256 public maxSupply;

  /// @dev Base URI for token metadata
  string private _baseTokenURI;

  /// @dev USDC token contract
  IERC20 private immutable usdcToken;

  /// @dev Emitted when an NFT is minted
  event NftMinted(address indexed requester, string token, uint256 quantity);

  /// @dev Thrown when minting would exceed max supply
  error ExceedsMaxSupply();

  /// @dev Thrown when ERC20 transfer fails
  error ERC20TransferFailed();

  /**
   * @dev Constructor to initialize the NFT contract
   * @param initialBaseURI The initial base URI for token metadata
   * @param initialPrice The initial price for each NFT
   * @param initialMaxSupply The maximum supply of NFTs
   * @param initialOwner The initial owner of the contract
   * @param name The name of the NFT collection
   * @param symbol The symbol of the NFT collection
   */
  constructor(
    string memory initialBaseURI,
    uint256 initialPrice,
    uint256 initialMaxSupply,
    address initialOwner,
    string memory name,
    string memory symbol
  ) ERC721A(name, symbol) Ownable(initialOwner) {
    _baseTokenURI = initialBaseURI;
    price = initialPrice;
    maxSupply = initialMaxSupply;
    usdcToken = IERC20(0xc2132D05D31c914a87C6611C10748AEb04B58e8F);
  }

  /**
   * @dev Returns the base URI for token metadata
   * @return string The base URI
   */
  function _baseURI() internal view override returns (string memory) {
    return _baseTokenURI;
  }

  /**
   * @dev Returns the URI for a given token ID
   * @param tokenId The ID of the token
   * @return string The token URI
   */
  function tokenURI(
    uint256 tokenId
  ) public view override returns (string memory) {
    if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
    return _baseTokenURI;
  }

  /**
   * @dev Mints NFTs using USDC
   * @param quantity The number of NFTs to mint
   * @param to The address to mint the NFTs to
   */
  function mintUSDC(uint256 quantity, address to) external whenNotPaused {
    if (_totalMinted() + quantity > maxSupply) revert ExceedsMaxSupply();

    uint256 totalCost = price * quantity;
    if (!usdcToken.transferFrom(msg.sender, owner(), totalCost)) {
      revert ERC20TransferFailed();
    }

    _safeMint(to, quantity);
    emit NftMinted(msg.sender, 'USDC', quantity);
  }

  /**
   * @dev Sets a new base URI for all token metadata
   * @param newBaseURI The new base URI to set
   */
  function setBaseURI(string memory newBaseURI) external onlyOwner {
    _baseTokenURI = newBaseURI;
  }

  /**
   * @dev Sets a new price for minting NFTs
   * @param newPrice The new price to set
   */
  function setPrice(uint256 newPrice) external onlyOwner {
    price = newPrice;
  }

  /**
   * @dev Sets a new maximum supply for the NFTs
   * @param newMaxSupply The new maximum supply to set
   */
  function setMaxSupply(uint256 newMaxSupply) external onlyOwner {
    require(
      newMaxSupply >= _totalMinted(),
      'New max supply must be >= current minted amount'
    );
    maxSupply = newMaxSupply;
  }

  /**
   * @dev Pauses token minting and transfers
   */
  function pause() external onlyOwner {
    _pause();
  }

  /**
   * @dev Unpauses token minting and transfers
   */
  function unpause() external onlyOwner {
    _unpause();
  }

  /**
   * @dev Withdraws all Ether from the contract to the owner
   */
  function withdraw() external onlyOwner {
    uint256 balance = address(this).balance;
    (bool success, ) = payable(owner()).call{ value: balance }('');
    require(success, 'Transfer failed');
  }

  /**
   * @dev Withdraws all tokens of a specific ERC20 from the contract to the owner
   * @param token The ERC20 token to withdraw
   */
  function withdrawERC20(IERC20 token) external onlyOwner {
    uint256 balance = token.balanceOf(address(this));
    require(token.transfer(owner(), balance), 'Transfer failed');
  }

  /**
   * @dev Returns the starting token ID
   * @return uint256 The starting token ID (1)
   */
  function _startTokenId() internal pure override returns (uint256) {
    return 1;
  }
}
