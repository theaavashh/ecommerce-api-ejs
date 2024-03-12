const loginValidate = [
  body("email").isLength({ min: 3 }).withMessage("All field are required"),
  body("password").isLength({ min: 3 }).withMessage("All field are required"),
];

export { loginValidate };
