const Ethospital = artifacts.require("Ethospital");
require('chai')
.use(require('chai-as-promised'))
.should();

contract(Ethospital,([deployer, doctor, patient_1, patient_2])=>{
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

    // book appointment test
    describe('Book an appointment', async () => {
        let result, numAppointments

        before(async ()=>{
            result = await ethospital.createAppoinment('Daniel', {from: patient_2})
            numAppointments = await ethospital.totalNumber()
        })

        /*
            Book Appointment
        */
       
        it ('Check whether the appointment has been added (event-wise)', async ()=>{
            //SUCCESSFUL from log
            assert.equal(numAppointments,1);
        })

    });


});