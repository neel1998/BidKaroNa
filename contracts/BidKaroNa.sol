/* 
Authors: vaibhav.garg:anchit.gupta:preet.thakkar
Date: 8th October

The main contract containing all the business logic
for the application, also provides the necessary 
methods for the front-end
*/

pragma solidity >=0.4.21 <0.7.0;

import "./Asset.sol";

contract BidKaroNa {
  
  // Struct definitions

  enum AuctionStatus {Active, Inactive}

  struct Bid {
    address bidder;
    uint256 amount;
    uint256 timeStamp;
  }

  struct Auction {
    Bid[] bids;
    uint256 reservePrice;
    address seller;
    address assetAddress;
    uint256 deadline;
    string title;
    AuctionStatus status;
  }

  // State variables
  address public owner;
  Auction[] auctions;
  mapping(address => uint256) refunds;
  mapping(address => bool) activeAssets;

  // Modifiers
  modifier onlySeller(uint256 auctionId) {
    if (auctions[auctionId].seller != msg.sender) revert();
    _;
  }

  // Methods
  constructor(address _owner) public returns (bool) {
    owner = _owner;
    return true;
  }

  function partyOwnsAsset(address _party, address _contract) public returns (bool success) {
    Asset assetContract = Asset(_contract);
    return assetContract.owner == _party;
  }

  function createAuction(
                        address _asset,
                        uint256 _reservePrice,
                        uint256 _deadline,
                        string _title) public returns (uint256) {
    
    // Check if the seller owns the asset
    if (!partyOwnsAsset(msg.sender, _asset)) {
      LogFailure("Seller does not own this asset");
    }
    
    // Check if given deadline is in the future
    if (block.number >= _deadline) {
      LogFailure("Invalid deadline");
    }

    // Check if reserve price is valid
    if (_reservePrice < 0) {
      LogFailure("Reserve price below 0");
    }

    // Check if asset is not already on auction
    if (activeAssets[_asset] == true) {
      LogFailure("Item already on auction");
    }

    auctionId = auctions.length++;
    Auction a = auctions[auctionId];
    a.reservePrice = _reservePrice;
    a.seller = msg.sender;
    a.assetAddress = _asset;
    a.deadline = _deadline;
    a.title = _title;
    a.status = AuctionStatus.Inactive;

    return auctionId;
  }

  function activateAuction(int auctionId) public onlySeller(auctionId) returns (bool) {
    if (!partyOwnsAsset(this, a.assetAddress)) revert();
    Auction a = auctions[auctionId];
    a.status = AuctionStatus.Active;
    return true;
  }

  function cancelAuction(int auctionId) public onlySeller(auctionId) returns (bool) {

  }

  function getRefund() public returns (bool) {
    uint256 refund = refunds[msg.sender];
    refunds[msg.sender] = 0;
    if (!msg.sender.send(refund))
      refunds[msg.sender] = refund;
  }

  function placeBid(int auctionId) public returns (bool) {

  }

}
