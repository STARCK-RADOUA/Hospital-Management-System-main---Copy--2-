const User = require("../models/user.js");
const Patient = require("../models/patient.js");
const Doctor = require("../models/doctor.js");

const getUsers = async (req, res) => {
    try {
        const { name, role } = req.query;

        let conditions = [];
        if (name) {
            conditions.push({ firstName: name });
            conditions.push({ lastName: name });
        }
        if (role) {
            conditions.push({ userType: role });
        }

        const users = conditions.length === 0 ? await User.find({}) : await User.find({ $or: conditions });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const isUserValid = (newUser) => {
    let errorList = [];
    if (!newUser.firstName) errorList.push("Please enter first name");
    if (!newUser.lastName) errorList.push("Please enter last name");
    if (!newUser.email) errorList.push("Please enter email");
    if (!newUser.password) errorList.push("Please enter password");
    if (!newUser.confirmPassword) errorList.push("Please re-enter password in Confirm Password field");
    if (!newUser.userType) errorList.push("Please enter User Type");
    if (newUser.password !== newUser.confirmPassword) errorList.push("Password and Confirm Password did not match");

    return errorList.length > 0 ? { status: false, errors: errorList } : { status: true };
}

const saveUser = async (req, res) => {
    const newUser = req.body;
    const userValidStatus = isUserValid(newUser);

    if (!userValidStatus.status) {
        return res.status(400).json({ message: 'error', errors: userValidStatus.errors });
    }

    try {
        const userDetails = await User.create({
            email: newUser.email,
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            password: newUser.password,
            userType: newUser.userType,
            activated: true
        });

        if (newUser.userType === "Doctor") {
            await Doctor.create({
                userId: userDetails._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            });
        } else if (newUser.userType === "Patient") {
            await Patient.create({
                userId: userDetails._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            });
        }
        res.status(201).json({ message: "success" });
    } catch (error) {
        res.status(400).json({ message: "error", errors: [error.message] });
    }
}

const updateUser = async (req, res) => {
    const newUser = req.body;
    const userValidStatus = isUserValid(newUser);

    if (!userValidStatus.status) {
        return res.status(400).json({ message: 'error', errors: userValidStatus.errors });
    }

    try {
        await User.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(201).json({ message: 'success' });
    } catch (error) {
        res.status(400).json({ message: 'error', errors: [error.message] });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user.userType === 'Doctor') {
            await Doctor.deleteOne({ userId: req.params.id });
        } else if (user.userType === 'Patient') {
            await Patient.deleteOne({ userId: req.params.id });
        }

        await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'success' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getActivatedStatus = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("Utilisateur introuvable");

        return { activated: user.activated };
    } catch (error) {
        throw error;
    }
}

const editActivatedStatus = async (userId, newActivatedStatus) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("Utilisateur introuvable");

     
        const updatedDepartement = await User.findByIdAndUpdate(
          userId,
          { activated: newActivatedStatus },
         
        );




        

        return { message: "Statut 'activated' mis à jour avec succès" };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUsers,
    getUserById,
    saveUser,
    updateUser,
    deleteUser,
    getActivatedStatus,
    editActivatedStatus
}
