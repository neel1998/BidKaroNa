/* 
Authors: vaibhav.garg:anchit.gupta:preet.thakkar
Date: 8th October

The main contract containing all the business logic
for the application, also provides the necessary 
methods for the front-end
*/

pragma solidity 0.5.16;

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

  // Events
  event LogFailure(string log);
  event auctionCreated(uint256 auctionId, string title, address assetAddress, uint256 reservePrice, uint256 deadline);
  event auctionActivated(uint256 auctionId);
  event auctionEnded(uint256 actionId, string newOwner, address newOwnerAddress);
  event auctionCancelled(uint256 auctionId);
  event withdrewRefund(address bidder, uint256 auctionId, uint256 refundAmout);
  event bidPlaced(uint256 auctionId, address bidder, uint256 bidAmount);

  // Methods
  constructor() public {
    owner = msg.sender;
  }

  function partyOwnsAsset(address _party, address _assetAddress) public view returns (bool) {
    Asset assetContract = Asset(_assetAddress);
    return assetContract.getOwner() == _party;
  }

  function createAuction(
                        address _assetAddress,
                        uint256 _reservePrice,
                        uint256 _deadline,
                        string memory _title) public returns (int256) {
    
    // Check if the seller owns the asset
    if (!partyOwnsAsset(msg.sender, _assetAddress)) {
      emit LogFailure("Seller does not own this asset.");
      return -1;
    }
    
    // Check if given deadline is in the future
    if (block.timestamp >= _deadline) {
      emit LogFailure("Invalid deadline.");
      return -1;
    }

    // Check if asset is not already on auction
    if (activeAssets[_assetAddress]) {
      emit LogFailure("Item is already on auction.");
      return -1;
    }

    // Creating the auction in Inactive State
    uint256 auctionId = auctions.length++;
    auctions[auctionId].reservePrice = _reservePrice;
    auctions[auctionId].seller = msg.sender;
    auctions[auctionId].assetAddress = _assetAddress;
    auctions[auctionId].deadline = _deadline;
    auctions[auctionId].title = _title;
    auctions[auctionId].status = AuctionStatus.Inactive;
    activeAssets[_assetAddress] = true;
    emit auctionCreated(auctionId, _title, _assetAddress, _reservePrice, _deadline);
    
    // changing the ownership of the asset
    Asset asset = Asset(_assetAddress);
    asset.setOwner(address(this));
    emit auctionActivated(auctionId);
    auctions[auctionId].status = AuctionStatus.Active;
    
    return int256(auctionId);
  }

//   function activateAuction(uint256 auctionId) public onlySeller(auctionId) returns (bool) {
    
//     if(block.timestamp >= auctions[auctionId].deadline) {
//       emit LogFailure("The deadline for auction has already passed."); 
//       return false;
//     }
    
//     if (!partyOwnsAsset(address(this), auctions[auctionId].assetAddress)){
//       emit LogFailure("Transfer ownership to BidKaroNa before activating the auction."); 
//       return false;
//     }

//     if(auctions[auctionId].status == AuctionStatus.Active) {
//       emit LogFailure("The auction is already active."); 
//       return false;
//     }
    
//     auctions[auctionId].status = AuctionStatus.Active;
//     emit auctionActivated(auctionId);
//     return true;
//   }

  function endAuction(uint256 auctionId) public returns (bool) {

    // The deadline should be gone
    if (block.timestamp < auctions[auctionId].deadline) {
      emit LogFailure("Cannot end auction before the deadline."); 
      return false;
    }

    // Auction needs to be active, so that it is ended only once
    if (auctions[auctionId].status == AuctionStatus.Inactive) {
      emit LogFailure("Cannot end an already ended/cancelled auction."); 
      return false;
    }

    auctions[auctionId].status = AuctionStatus.Inactive;
    Asset assetContract = Asset(auctions[auctionId].assetAddress);

    string memory newOwner;
    address newOwnerAddress;

    // no valid bidds were placed
    if(auctions[auctionId].bids.length == 0) {
      // Tranferring ownership of asset back to the seller
      assetContract.setOwner(auctions[auctionId].seller);
      
      newOwner = "seller";
      newOwnerAddress = auctions[auctionId].seller;
    }
    else{
      // Finding index corresponding to the highest bid
      uint256 bidIdx = 0;
      for(uint256 i=1; i<auctions[auctionId].bids.length; i++) {
        if(auctions[auctionId].bids[i].amount > auctions[auctionId].bids[bidIdx].amount) {
          bidIdx = i;
        }
      }

      // Marking the asset on auction as inactive
      activeAssets[auctions[auctionId].assetAddress] = false;

      // Transferring the ownership to the highest bidder
      assetContract.setOwner(auctions[auctionId].bids[bidIdx].bidder);

      // Transferring the highest bid amount to the seller
      auctions[auctionId].refunds[auctions[auctionId].bids[bidIdx].bidder] -= auctions[auctionId].bids[bidIdx].amount;
      auctions[auctionId].refunds[auctions[auctionId].seller] += auctions[auctionId].bids[bidIdx].amount;
      
      newOwner = "bidder";
      newOwnerAddress = auctions[auctionId].bids[bidIdx].bidder;
    }

    emit auctionEnded(auctionId, newOwner, newOwnerAddress);
    return true;  
  }

//   function cancelAuction(uint256 auctionId) public onlySeller(auctionId) returns (bool) {

//     if (auctions[auctionId].status == AuctionStatus.Inactive) {
//       emit LogFailure("Cannot cancel an inactive auction."); 
//       return false;
//     }

//     if (block.timestamp >= auctions[auctionId].deadline) {
//       emit LogFailure("Cannot cancel an auction after the deadline."); 
//       return false;
//     }

//     if (auctions[auctionId].bids.length > 0) {
//       emit LogFailure("Cannot cancel the auction, there are valid bids placed");
//       return false;
//     }

//     auctions[auctionId].status = AuctionStatus.Inactive;
//     emit auctionCancelled(auctionId);
//     return true;
//   }

  function withdrawRefund(uint256 auctionId) public returns (bool) {

    // Cannot withdraw from an active auction
    if(auctions[auctionId].status == AuctionStatus.Active) {
      emit LogFailure("Cannot withdraw from an active auction.");
      return false;
    }
    
    uint256 numBids = auctions[auctionId].bids.length++;
    uint256 err = 0;
    for(uint256 i=0; i<numBids; i++){
        address payable adr = address(uint160(auctions[auctionId].bids[i].bidder));
        uint256 refund = auctions[auctionId].refunds[adr];
        emit withdrewRefund(adr, auctionId, refund + 100);
        auctions[auctionId].refunds[adr] = 0;
        if(!adr.send(refund)){
            emit withdrewRefund(adr, auctionId, refund);
            auctions[auctionId].refunds[adr] = refund;
            err += 1;
        }
    }
    if (err > 0){
        return false;
    }
    else {
        return true;
    }
    
    // uint256 refund = auctions[auctionId].refunds[msg.sender];
    // auctions[auctionId].refunds[msg.sender] = 0;
    
    // if (!msg.sender.send(refund)){
    //   emit LogFailure("Unable to transfer ethers.");
    //   auctions[auctionId].refunds[msg.sender] = refund;
    //   return false;
    // }

    // return true;
  }

  function placeBid(uint256 auctionId) public payable returns (bool) {
    
    // inactive auction
    if (auctions[auctionId].status == AuctionStatus.Inactive) {
      emit LogFailure("Auction not active.");
      return false;
    }

    // bid should be greater than reserve price
    if (msg.value < auctions[auctionId].reservePrice) {
      emit LogFailure("Amount less than the reserve price.");
      return false;
    }

    uint256 bidId = auctions[auctionId].bids.length++;
    auctions[auctionId].bids[bidId].bidder = msg.sender;
    auctions[auctionId].bids[bidId].amount = msg.value;
    auctions[auctionId].bids[bidId].timeStamp = block.timestamp;

    auctions[auctionId].refunds[msg.sender] += msg.value;

    emit bidPlaced(auctionId, msg.sender, msg.value);
    return true;
  }

  function getAuctionsLength() public view returns(uint256) {
    return auctions.length;
  }
  
  function getAuctionBalance() public view returns(uint256) {
      return address(this).balance;
  }
  function getAuctionDetails(uint256 auctionId) public view returns(
    address, address, string memory, uint256, uint256, AuctionStatus
  ) {

    return (
      auctions[auctionId].seller,
      auctions[auctionId].assetAddress,
      auctions[auctionId].title,
      auctions[auctionId].deadline,
      auctions[auctionId].reservePrice,
      auctions[auctionId].status
    );
  }
}
