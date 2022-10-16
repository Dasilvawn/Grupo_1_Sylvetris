module.exports = {
  googleSignin: async (req, res = response) => {
    const firstLetterName = req.session.passport.user.name
      .split(" ")[0]
      .charAt(0);

    req.session.userLogin = {
      id: req.session.passport.user.id,
      name: req.session.passport.user.name,
      lastname: req.session.passport.user.lastname,
      email: req.session.passport.user.email,
      id_social: req.session.passport.user.id_social,
      rol: 2,
      social_provider: req.session.passport.user.social_provider,
      avatar: req.session.passport.user.avatar,
      iconNavbar: firstLetterName,
    };
    res.cookie("sylvestris", req.session.userLogin, {
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.redirect("/");
  },
};
