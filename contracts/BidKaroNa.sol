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
    mapping(address => uint256) refunds;
    AuctionStatus status;
  }

  // State variables
  address public owner;
  Auction[] auctions;
  mapping(address => bool) activeAssets;

  // Modifiers
  modifier onlySeller(uint256 auctionId) {
    require(auctions[auctionId].seller == msg.sender);
    _;
  }

  // Methods
  constructor(address _owner) public returns (bool) {
    owner = _owner;
    return true;
  }

  function partyOwnsAsset(address _party, address _assetAddress) public returns (bool) {
    Asset assetContract = Asset(_assetAddress);
    return assetContract.getOwner() == _party;
  }

  function createAuction(
                        address _assetAddress,
                        uint256 _reservePrice,
                        uint256 _deadline,
                        string memory _title) public returns (uint256) {
    
    // Check if the seller owns the asset
    if (!partyOwnsAsset(msg.sender, _assetAddress)) {
      LogFailure("LOG: Seller does not own this asset.");
      revert();
    }
    
    // Check if given deadline is in the future
    if (block.number >= _deadline) {
      LogFailure("LOG: Invalid deadline.");
      revert();
    }

    // Check if reserve price is valid
    if (_reservePrice <= 0) {
      LogFailure("LOG: Reserve price should be above 0.");
      revert();
    }

    // Check if asset is not already on auction
    if (activeAssets[_assetAddress]) {
      LogFailure("LOG: Item is already on auction.");
      revert();
    }

    // Createing the auction in Inactive State
    uint256 auctionId = auctions.length++;
    Auction a = auctions[auctionId];
    a.reservePrice = _reservePrice;
    a.seller = msg.sender;
    a.assetAddress = _assetAddress;
    a.deadline = _deadline;
    a.title = _title;
    a.status = AuctionStatus.Inactive;

    return auctionId;
  }

  function activateAuction(int auctionId) public onlySeller(auctionId) returns (bool) {
    
    Auction a = auctions[auctionId];
    
    if(block.number >= a.deadline) {
      LogFailure("LOG: The deadline for auction has already passed."); 
      return false;
    }
    
    if (!partyOwnsAsset(this, a.assetAddress)){
      LogFailure("LOG: Transfer ownership to BidKaroNa before activating the auction."); 
      return false;
    } 

    if(a.status == AuctionStatus.Active) {
      LogFailure("LOG: The auction is already active."); 
      return false;
    }
    
    a.status = AuctionStatus.Active;
    return true;
  }

  function endAuction(int auctionId) public returns (bool) {

    Auction a = auctions[auctionId];

    // The deadline should be gone
    if (block.number < a.deadline) {
      LogFailure("LOG: Cannot end auction before the deadline."); 
      return false;
    }

    // Auction needs to be active, so that it is ended only once
    if (a.status == AuctionStatus.Inactive) {
      LogFailure("LOG: Cannot end an already ended/cancelled auction."); 
      return false;
    }

    a.status = AuctionStatus.Inactive;
    Asset assetContract = Asset(a.assetAddress);

    // no valid bidds were placed
    if(a.bids.length == 0) {
      // Tranferring ownership of asset back to the seller
      assetContract.setOwner(a.seller);
    }
    else{
      // Finding index corresponding to the highest bid
      uint256 bidIdx = 0;
      for(uint256 i=1; i<a.bids.length; i++) {
        if(a.bids[i].amount > a.bids[bidIdx].amount) {
          bidIdx = i;
        }
      }

      // Transferring the ownership to the highest bidder
      assetContract.setOwner(a.bids[bidIdx].bidder);

      // Transferring the highest bid amount to the seller
      a.refunds[a.bids[bidIdx].bidder] -= a.bids[bidIdx].amount;
      a.refunds[a.seller] += a.bids[bidIdx].amount;
    }
    return true;  
  }

  function cancelAuction(int auctionId) public onlySeller(auctionId) returns (bool) {
    
    Auction a = auctions[auctionId];

    if (a.status == AuctionStatus.Inactive) {
      LogFailure("LOG: Cannot cancel an inactive auction."); 
      return false;
    }

    if (block.number >= a.deadline) {
      LogFailure("LOG: Cannot cancel an auction after the deadline."); 
      return false;
    }

    if (a.bids.length > 0) {
      LogFailure("LOG: Cannot cancel the auction, there are valid bids placed");
      return false;
    }

    a.status = AuctionStatus.Inactive;
    return true;

  }

  function withdrawRefund(uint256 auctionId) public returns (bool) {

    // Cannot withdraw from an active auction
    Auction a = auctions[auctionId];
    if(a.status == AuctionStatus.Active) {
      LogFailure("LOG: Cannot withdraw from an active auction.");
      return false;
    }

    uint256 refund = a.refunds[msg.sender];
    a.refunds[msg.sender] = 0;
    
    if (!msg.sender.send(refund)){
      LogFailure("LOG: Unable to transfer ethers.");
      a.refunds[msg.sender] = refund;
      return false;
    }

    return true;
  }

  function placeBid(int auctionId) public returns (bool) {
    
    Auction a = auctions[auctionId];
    
    // inactive auction
    if (a.status == AuctionStatus.Inactive) {
      LogFailure("LOG: Auction not active.");
      return false;
    }

    // bid should be greater than reserve price
    if (msg.value < a.reservePrice) {
      LogFailure("LOG: Amount less than the reserve price.");
      return false;
    }

    uint256 bidId = a.bids.length++;
    Bid currBid = a.bids[bidId];
    currBid.bidder = msg.sender;
    currBid.amount = msg.value;
    currBid.timeStamp = block.number;

    a.refunds[msg.sender] += msg.value;

    return true;
  }

}
