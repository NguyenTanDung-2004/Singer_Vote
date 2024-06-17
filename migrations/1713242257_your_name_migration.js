var SolidityContract = artifacts.require("singer_vote");

module.exports = function(deployer) {
  // Deploy the SolidityContract contract as our only task
  deployer.deploy(SolidityContract);
};
