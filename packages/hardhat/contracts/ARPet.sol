// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ARPet is ERC721, Ownable {
	// Base URI for metadata
	string public baseURI = "QmVW9v1DMqwUqfXuZwRZyvQKzMorHvJ2U6WdGHKzJy2hNx";
	string public imageURI = "QmREQxx6q1aiktrtt5YLktm6jLajkAgMMnhd7h8PGXbxMN";

	// Minting price
	uint256 public mintPrice = 0.0001 ether;

	// Feeding price
	uint256 public feedingPrice = 0.0000001 ether;

	// Mapping from token ID to last fed timestamp
	mapping(uint256 => uint256) private lastFed;

	// Token ID tracker
	uint256 private _tokenIdCounter;

	constructor() ERC721("ARPet", "ARP") {}

	// Function to mint a new pet NFT
	function mintPet() external payable {
		require(msg.value >= mintPrice, "Incorrect Ether value sent");

		_tokenIdCounter++;
		_mint(msg.sender, _tokenIdCounter);
	}

	// Function to feed the pet
	function feedPet(uint256 tokenId) external payable {
		require(_exists(tokenId), "Pet does not exist");
		require(ownerOf(tokenId) == msg.sender, "You do not own this pet");
		require(msg.value >= feedingPrice, "Incorrect Ether value sent");

		lastFed[tokenId] = block.timestamp;
	}

	// Function to check when the pet was last fed
	function checkLastFed(uint256 tokenId) external view returns (uint256) {
		require(_exists(tokenId), "Pet does not exist");
		return lastFed[tokenId];
	}

	// Function to check if an address owns a specific token ID
	function ownsNFT(
		address owner,
		uint256 tokenId
	) external view returns (bool) {
		return ownerOf(tokenId) == owner;
	}

	// Function to check if an address owns any NFT from this contract
	function hasNFT(address owner) external view returns (bool) {
		for (uint256 i = 1; i <= _tokenIdCounter; i++) {
			if (ownerOf(i) == owner) {
				return true; // The owner has at least one NFT
			}
		}
		return false; // The owner does not have any NFTs
	}

	// Function to withdraw funds from the contract
	function withdraw() external onlyOwner {
		payable(owner()).transfer(address(this).balance);
	}
}
