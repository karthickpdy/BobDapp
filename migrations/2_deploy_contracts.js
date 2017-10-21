var CustomerKyc = artifacts.require("./CustomerKyc.sol");

module.exports = function(deployer) {
  deployer.deploy(CustomerKyc);
};
