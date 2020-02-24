/*
 * @Author: Daniel Tong
 * @Date: 2020-02-10 18:19:59
 */

pragma solidity ^0.5.0;


contract Ethospital {
    string public hospitalName;
    uint public totalNumber = 0;  // total number of appointment
    enum eventstatus {no_appointment, pending, approved}

    // appointment struct
    struct Appointment {
        uint patientID;
        string patientName;
        address patient;
        eventstatus status;
    }

    mapping(address => Appointment) Appointments;


    // events declaration
    // appointment ready - patient action
    event AppointmentReady (
        uint appointmentID,
        uint doctorID,
        string patientName,
        eventstatus status
    );

    // appointment been cancelled - patient action
    event AppointmentCancel (
        uint appointmentID,
        uint doctorID,
        string patientName,
        eventstatus status
    );

    // appointment been approved - doctor action
    event AppointmentApproved (
        uint appointmentID,
        uint doctorID,
        string patientName,
        eventstatus status
    );

    // constructor
    constructor() public{
        hospitalName = "Dapp Hospital !";
    }

    /*
    Functions:
    patients - make appointment
             - cancel appointment (only when same)
    doctors  - approve appointment
    */
    // create appointment
    function createAppoinment(string memory _patientName) public {
        // 1. check name 2. check patient status
        require(bytes(_patientName).length > 0, 'Patient name must not be empty');
        require(Appointments[msg.sender].status != eventstatus.no_appointment, 'Patient cannot submit request twice');

        // all requires pass, perform creating appoinment
        totalNumber++;
        // save appointment
        Appointments[msg.sender] = Appointment(totalNumber, _patientName, msg.sender, eventstatus.pending);
        emit AppointmentReady(totalNumber, totalNumber, _patientName, eventstatus.pending);
    }


}