const Ethospital = artifacts.require("Ethospital");
require('chai')
.use(require('chai-as-promised'))
.should();

contract(Ethospital,([deployer, doctor, patient])=>{
    let ethospital;
    before(async () =>{
        ethospital = await Ethospital.deployed();
    });

    // deployment test
    describe('Deployment', async()=>{
        it("deploys successully", async() => {
            const address = await ethospital.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
        })

        it("deploys correct hospital name", async() => {
            const hospitalName = await ethospital.hospitalName();
            assert.equal(hospitalName, "Dapp Hospital !");
        })
    });


});