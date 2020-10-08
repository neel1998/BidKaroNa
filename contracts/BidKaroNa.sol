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
    Asset asset;
    uint256 reservePrice;
    address seller;
    uint256 deadline;
    string title;
    AuctionStatus status;
  }

  // State variables
  address public owner;
  Auction[] auctions;
  mapping(address=>uint256) refunds;

  // Modifiers
  modifier onlySeller() {
    _;
  }

  // Methods
  constructor(address _owner) public returns (bool) {
    owner = _owner;
    return true;
  }

  function createAuction() public returns (uint256) {

  }

  function activateAuction(int auctionId) public onlySeller(auctionId) returns (bool) {

  }

  function cancelAuction(int auctionId) public onlySeller(auctionId) returns (bool) {

  }

  function getRefund() public returns (bool) {

  }

  function placeBid(int auctionId) public returns (bool) {

  }

}
