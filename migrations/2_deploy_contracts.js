var Asset = artifacts.require("Asset")
var BidKaroNa = artifacts.require("BidKaroNa");

module.exports = function(deployer) {
  deployer.deploy(Asset, "Base asset class");
  deployer.deploy(Asset, "Base asset class 1");
  deployer.deploy(Asset, "Base asset class 2");
  deployer.deploy(Asset, "Base asset class 3");
  deployer.deploy(Asset, "Base asset class 4");
  deployer.deploy(BidKaroNa);
};
