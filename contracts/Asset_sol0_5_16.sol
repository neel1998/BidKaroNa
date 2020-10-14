/* 
Authors:vaibhav.garg
        anchit.gupta
        preet.thakkar
Date: 8th October

The abstract parent contract for assets that
are eligible to be sold in the auction.
Every actual asset must be derived from 
this contract.
*/

pragma solidity >=0.4.21 <0.7.0;

contract Asset {
  
  // State variables
  address owner;
  string public description;

  // Modifiers
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // Methods
  constructor(string memory _description) public {
    owner = msg.sender;
    description = _description;
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function setOwner(address _owner) public onlyOwner returns (bool) {
    owner = _owner;
    return true;
  }
  
  function getAssetAddress() public view returns (address) {
      return address(this);
  }

}
