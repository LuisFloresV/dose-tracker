const joi = require('joi')


const medicineIdSchema = joi.string().regex(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
const medicineUserIdSchema = joi.string().regex(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)

const medicineNameSchema = joi.string().max(60).min(3)
const medicineDosageSchema = joi.number().max(10)
const medicineFrequencySchema = joi.string().max(60)


const medicineSchema = joi.object({
  user_id: medicineUserIdSchema.required(),
  name: medicineNameSchema.required(),
  dosage: medicineDosageSchema.required(),
  frequency: medicineFrequencySchema.required()
})

module.exports = {
  medicineIdSchema,
  medicineSchema
}
