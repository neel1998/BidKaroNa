pragma solidity 0.5.16;

import "./Asset.sol";

contract Econtract {
    // Struct definitions
    enum AuctionStatus {
        Active,
        Inactive
    }

    struct econtract {
        string party1;
        string party2;
        string crop;
        string crop_details;
        uint256 price;
        uint256 duration;
        address seller;
        address assetAddress;
        AuctionStatus status;
    }

    // State variables
    address public owner;
    econtract[] econtracts;
    mapping(address => bool) activeAssets;

    //Events
    event LogFailure(string log);
    event contractCreated(
        uint256 contractId,
        string party1,
        string party2,
        address assetAddress,
        string crop,
        string crop_details,
        uint256 price,
        uint256 duration
    );

    //Methods

    constructor() public {
        owner = msg.sender;
    }


    function partyOwnsAsset(address _party, address _assetAddress)
        public
        view
        returns (bool)
    {
        Asset assetContract = Asset(_assetAddress);
        return assetContract.getOwner() == _party;
    }

    function createContract(
        address _assetAddress,
        string memory _party1,
        string memory _party2,
        string memory _crop,
        string memory _crop_details,
        uint256 _price,
        uint256 _duration
    ) public returns (int256) {
        // Check if the seller owns the asset
        if (!partyOwnsAsset(msg.sender, _assetAddress)) {
            emit LogFailure("Seller does not own this asset.");
            return -1;
        }

        // Check if given deadline is in the future
        if (block.timestamp >= _duration) {
            emit LogFailure("Invalid deadline");
            return -1;
        }

        // Check if asset is not already on auction
        if (activeAssets[_assetAddress]) {
            emit LogFailure("Item is already on auction.");
            return -1;
        }

        // changing the ownership of the asset
        Asset asset = Asset(_assetAddress);
        asset.setOwner(address(this));

        //Creating contract and activating it
        uint256 CId = econtracts.length++;
        econtracts[CId].party1 = _party1;
        econtracts[CId].party2 = _party2;
        econtracts[CId].crop = _crop;
        econtracts[CId].crop_details = _crop_details;
        econtracts[CId].price = _price;
        econtracts[CId].duration = _duration;
        econtracts[CId].seller = msg.sender;
        econtracts[CId].assetAddress = _assetAddress;
        activeAssets[_assetAddress] = true;
        econtracts[CId].status = AuctionStatus.Active;

        emit contractCreated(
            CId,
            _party1,
            _party2,
            _assetAddress,
            _crop,
            _crop_details,
            _price,
            _duration
        );
        return int256(CId);
    }

    function getContractsLength() public view returns(uint256) {
    return econtracts.length;
  }
  function getContractDetails(uint256 contractId) public view returns(
     address,string memory,string memory,string memory,string memory, uint256,uint256
    ) {
    return(
      econtracts[contractId].assetAddress,
      econtracts[contractId].party1,
      econtracts[contractId].party2,
      econtracts[contractId].crop,
      econtracts[contractId].crop_details,
      econtracts[contractId].price,
      econtracts[contractId].duration
    );
  }
}
