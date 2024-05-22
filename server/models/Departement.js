const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DepartementSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
});




const Departement = mongoose.model("Departement", DepartementSchema);

module.exports = Departement;