import { body } from "express-validator";

const registerValidate = [
  body("fullname")
    .notEmpty()
    .withMessage("Fullname field is required")
    .isLength({ min: 4 })
    .withMessage("Must be more than 4 chars")
    .isLength({ max: 18 })
    .withMessage("Mustnot be more than 9 chars"),
  body("contact")
    .notEmpty()
    .withMessage("Contact field is required")
    .isNumeric()
    .withMessage("Must be numberical value"),
  body("email")
    .notEmpty()
    .withMessage("Email must be required")
    .isEmail()
    .withMessage("Unsatisfied email address"),
  body("password")
    .notEmpty()
    .withMessage("Password must be required")
    .isStrongPassword({
      minLength: 3,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage("Password must contain one uppercase and symbols"),
];

const loginValidation = [
  body("email").isLength({ min: 3 }).withMessage("All field are required"),
  body("password").isLength({ min: 3 }).withMessage("All field are required"),
];

export { registerValidate, loginValidation };
