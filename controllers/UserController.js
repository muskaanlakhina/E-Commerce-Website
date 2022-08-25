const User = require("../models/User");
const { createPasswordHash, generateToken } = require("../util/index");

exports.redirect_to_login = (request, response) => {
  console.log(request.session)
  response.render("user/login");
};

exports.login = async (request, response) => {
  const { username, password } = request.body;
  let hashed_password = createPasswordHash(password);
  await User.findOne({
    username: { $eq: username },
    password: { $eq: hashed_password },
  }).then((data, err) => {
    if (data == null) {
      console.log("Incorrect Username and password");
      request.flash("message", "Oops !! Incorrect username or password .");
      response.redirect("/user/login");
    } else {
      console.log("user found.");
      request.session.authentication = {
        token: generateToken(),
        data: {
          id: data._id,
          name: `${data.f_name} ${data.l_name}`,
          username: username,
        }
      };
      response.redirect("/");
    }
  });
};

exports.redirect_to_signup = (request, response) => {
  response.render("user/sign-up");
};

exports.signup = async (request, response) => {
  const { first_name, last_name, username, password } = request.body;
  const hashedPassword = createPasswordHash(password);
  await User.find({ username: { $eq: username } }).then((data, err) => {
    if (data.length == 0) {
      let new_user = new User({
        f_name: first_name,
        l_name: last_name,
        username: username,
        password: hashedPassword,
      });
      new_user.save((err, data) => {
        if (!err) {
          console.log("Successfully registered !");
          request.session.authentication = {
              token: generateToken(),
              data: {
                id: data._id,
                name: `${data.f_name} ${data.l_name}`,
                username: data.username,
              },
          };
          response.redirect("/");
        }
      });
    } else {
      console.log("User is already registered.");
      response.redirect("/user/login");
    }
  });
};

exports.logout = (request,response) => {
   if (request.user != null){
      request.session.destroy();
      console.log("Logout")
      response.redirect("/")
   }
}