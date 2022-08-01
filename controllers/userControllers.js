module.exports = {
  login: (req, res) => {
    return res.render("users/login", {
      title: "Sylvestris | Login",
    });
  },
  register: (req, res) => {
    return res.render("users/register", {
      title: "Sylvestris | Register",
    });
  },
};
