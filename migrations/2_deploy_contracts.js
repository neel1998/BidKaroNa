var Asset = artifacts.require("Asset")
var BidKaroNa = artifacts.require("BidKaroNa");

module.exports = function(deployer) {
  deployer.deploy(Asset, "Base asset class");
  deployer.deploy(BidKaroNa);
};
