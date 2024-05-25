const Doctor = require("../models/doctor.js");
const User = require("../models/user.js");
const { getActivatedStatus, editActivatedStatus } = require("../controllers/UserController");




const crypto = require('crypto');

const getDoctors = async (req, res) => {
    try {
        const searchdoctor = req.query.name ? new RegExp(req.query.name, 'i') : null;

        let doctors;
        if (searchdoctor) {
            doctors = await Doctor.find().populate({
                path: 'userId',
                select: 'firstName lastName email username activated',
                match: {
                    $or: [
                        { firstName: { $regex: searchdoctor } },
                        { lastName: { $regex: searchdoctor } },
                        { email: { $regex: searchdoctor } }
                    ]
                }
            }).then(doctors => doctors.filter(doctor => doctor.userId != null));
        } else {
            doctors = await Doctor.find({}).populate('userId', 'firstName lastName email username activated');
        }

        // Ajout de la propriété activated à chaque médecin
        for (let doctor of doctors) {
            if (doctor.userId && doctor.userId.activated !== undefined) {
                doctor = doctor.toObject();  // Convertir en objet JS standard pour ajouter la propriété
                doctor.activated = doctor.userId.activated;
            } else {
                const { activated } = await getActivatedStatus(doctor.userId._id);
                doctor = doctor.toObject();  // Convertir en objet JS standard pour ajouter la propriété
                doctor.activated = activated;
            }
        }

        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getDoctorById = async (req, res) => {
    //console.log(req.params.id);
    try {
        const doctor = await Doctor.findById(req.params.id).populate('userId');
        res.json(doctor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const isDoctorValid = (newdoctor) => {
    let errorList = [];
    if (!newdoctor.firstName) {
        errorList[errorList.length] = "Please enter first name";
    }
    if (!newdoctor.lastName) {
        errorList[errorList.length] = "Please enter last name";
    }
    if (!newdoctor.email) {
        errorList[errorList.length] = "Please enter email";
    }
    if (!newdoctor.password) {
        errorList[errorList.length] = "Please enter password";
    }
    if (!newdoctor.confirmPassword) {
        errorList[errorList.length] = "Please re-enter password in Confirm Password field";
    }
    if (!(newdoctor.password == newdoctor.confirmPassword)) {
        errorList[errorList.length] = "Password and Confirm Password did not match";
    }

    if (errorList.length > 0) {
        result = {
            status: false,
            errors: errorList
        }
        return result;
    }
    else {
        return { status: true };
    }

}
const saveVerificationToken = async (userId, verificationToken) => {
    await User.findOneAndUpdate({ _id: userId }, { "verificationToken": verificationToken });
    return;
}
const generateVerificationToken = () => {
    const token = crypto.randomBytes(64).toString('hex');
    const expires = Date.now() + 3 * 60 * 60 * 1000; // 3 hours from now
    let verificationToken = {
        "token": token,
        "expires": expires
    };
    return verificationToken;
};

const editDoctorActivatedStatus = async (req, res) => {
    try {
       
        const { activated } = req.body;
        const doctor = await Doctor.findById(req.params.userId).populate('userId');

        // Modifier l'état "activated" de l'utilisateur
        await editActivatedStatus(doctor.userId._id, activated);

        res.status(200).json({ message: "Statut 'activated' mis à jour avec succès" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const saveDoctor = async (req, res) => {
    let newdoctor = req.body;

    let doctorValidStatus = isDoctorValid(newdoctor);
    if (!doctorValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: doctorValidStatus.errors
        });
    }
    else {

        User.create(
            {
                email: newdoctor.email,
                username: newdoctor.username,
                firstName: newdoctor.firstName,
                lastName: newdoctor.lastName,
                password: newdoctor.password,
                userType: 'Doctor',
                activated: true,
            },
           

            (error, userDetails) => {
                if (error) {
                    res.json({ message: "error", errors: [error.message] });
                } else {
                    let verificationToken = generateVerificationToken()
                    saveVerificationToken(userDetails._id, verificationToken);

                  
                        Doctor.create(
                            {
                                userId: userDetails._id,
                                firstName: newdoctor.firstName,
                                lastName: newdoctor.lastName,
                                email: newdoctor.email,
                                username: newdoctor.email,
                                department: newdoctor.department,
                                phone: newdoctor.phone ,
                                imageUrls : newdoctor.imageUrls ,
                            },
                            (error2, doctorDetails) => {
                                if (error2) {
                                    User.deleteOne({ _id: userDetails });
                                    res.json({ message: "error", errors: [error2.message] });
                                } else {
                                   
                                    res.json({ message: "success" });
                                }
                            }
                        );}});













        
    }
}

const updateDoctor = async (req, res) => {
    let newdoctor = req.body;

    let doctorValidStatus = isDoctorValid(newdoctor);
    if (!doctorValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: doctorValidStatus.errors
        });
    }
    else {
        try {

            const updateddoctor = await Doctor.updateOne({ _id: req.params.id }, { $set: { "phone": req.body.phone, "department": req.body.department } });

            const updateduser = await User.updateOne({ _id: req.body.userId }, { $set: { "firstName": req.body.firstName, "lastName": req.body.lastName, "email": req.body.email, "username": req.body.username, "password": req.body.password } });

            res.status(201).json({ message: 'success' });
        } catch (error) {
            res.status(400).json({ message: 'error', errors: [error.message] });
        }
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('userId');

        const deleteddoctor = await Doctor.deleteOne({ _id: req.params.id });

        const deleteduser = await User.deleteOne({ _id: doctor.userId._id });
        res.status(200).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getDoctors,
    getDoctorById,
    saveDoctor,
    updateDoctor,
    editDoctorActivatedStatus,
    deleteDoctor
}