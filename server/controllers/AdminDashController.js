const User = require("../models/user.js");
const Appointment = require("../models/appointment.js");
const Prescription = require("../models/prescription.js");
const mongoose = require("mongoose");

var moment = require('moment'); 

const getUserCountByRole = async (req, res) => {
     console.log("api hit")
    try {
        var userType = req.body.userType;
        console.log(req.body);
        let users = [];
        if (userType) {
            users = await User.find({ "userType": userType });
            res.json({ 'count': users.length });
        }
        else {
            res.status(400).json({ errors: ["User type is missing in body"] })
        }

    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
}

const getAppointmentCount = async (req, res) => {
    try {
        let query = {
            "appointmentDate": moment(new Date()).format('YYYY-MM-DD'),
            'isTimeSlotAvailable': false,
        }
        if(req.sender.doctorId){
            query.doctorId = req.sender.doctorId
        }
        if(req.sender.patientId){
            query.patientId = req.sender.patientId
        }
        let appointmentsToday = await Appointment.find(query);

        let pendingAppointmentsToday = await Appointment.find({
            ...query,
            "completed": false
        })
        // console.log(new Date().toLocaleDateString('zh-Hans-CN'));
        // console.log(appointmentsToday.length);
        res.json({
            "message": "success",
            'totalAppointments': appointmentsToday.length,
            "pendingAppointments": pendingAppointmentsToday.length,
        });

    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
}

const getPatientsTreatedCount = async (req, res) => {
    try {
        if (!req.sender || !req.sender.doctorId) {
            return res.status(400).json({ errors: ["Doctor ID is missing"] });
        }

        const doctorId = mongoose.Types.ObjectId(req.sender.doctorId);

        let prescriptions = await Prescription.find({})
            .populate({
                path: 'appointmentId',
                populate: {
                    path: 'doctorId',
                    match: { _id: doctorId }
                }
            });

        prescriptions = prescriptions.filter(pre => pre.appointmentId && pre.appointmentId.doctorId);

        res.json({
            "message": "success",
            'treatedPatients': prescriptions.length
        });

    } catch (error) {
        console.error('Error fetching treated patients count:', error);
        res.status(500).json({ errors: [error.message] });
    }
};
 //5558
module.exports = {
    getUserCountByRole,
    getAppointmentCount,
    getPatientsTreatedCount
}