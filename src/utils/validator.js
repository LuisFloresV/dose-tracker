const medicineRegistrationSchema = {
  name: {
    notEmpty: true,
    errorMessage: "Name of the medicine cannot be empty"
  },
  frequency: {
    notEmpty: true,
    errorMessage: "Frequency of the medicine cannot be empty"
  },
  dosage: {
    isInt: true,
    errorMessage: "Dosage of the medicine cannot be empty and needs to be a number!"
  }
}

module.exports = {
  medicineRegistrationSchema
}