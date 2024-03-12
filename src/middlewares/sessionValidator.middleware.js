const sessionValidator = (req, res, next) => {
  if (req.session.id) {
    next();
  } else {
    req.render("/login");
  }
};

export default sessionValidator;
