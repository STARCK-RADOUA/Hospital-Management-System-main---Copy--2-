const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Doctor = require("../../models/doctor");


function doctorAuth(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, "ae2d8329d69cb40ef776f4d64c9b20ee67971cfd3df455f199d1f500712018fc", async (err, payload) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.sender = {
            "id": payload.id,
            "userType": payload.userType
        };
        // console.log("doctorAuth ", payload);
        if (payload.userType == "Doctor") {
            let doctor = await Doctor.findOne({
                'userId': mongoose.Types.ObjectId(req.sender.id)
            })
            req.sender.doctorId = doctor._id;
            next();
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    });

}

module.exports = doctorAuth;
