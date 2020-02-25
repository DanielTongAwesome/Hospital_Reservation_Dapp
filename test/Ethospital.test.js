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
    describe('Book Appointment Tests', async () => {
        let result, numAppointments

        // create appoinment and get total number
        before(async ()=>{
            result = await ethospital.createAppoinment('Haha', {from: patient_2})
            numAppointments = await ethospital.totalNumber()
        })

        // test previous run
        it('Check the appointment status and appoint booking', async ()=> {
            assert.equal(numAppointments, 1);
            const event = result.logs[0].args;
            assert.equal(event.appointmentID.toNumber(), 1, 'Appointment ID should equal to 1 since this is the first one');
            assert.equal(event.patientName, 'Haha', 'Check the user registration name');
            assert.equal(event.status, 1, 'User status should be pending now');
        })

        // creating appointment should fail if no user name
        it('Check the user name', async () => {
            await ethospital.createAppoinment('', {from: patient_1}).should.be.rejected;
        })

        // creating appointment should fail if user already registered before
        it('register twice should be rejected', async () => {
            await ethospital.createAppoinment('hahahhaha', {from: patient_2}).should.be.rejected;
        })

    });

    describe('Cancel Appointment Tests', async () => {
    
        it('Check the user status', async () => {
            result = await ethospital.cancelAppointment({from: patient_2});
            event = result.logs[0].args;
            assert.equal(event.status, 0, 'user event been cancelled');
        })
    })

});