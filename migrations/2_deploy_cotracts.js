const Ethospital = artifacts.require("Ethospital");

module.exports = function(deployer){
    deployer.deploy(Ethospital);
};

