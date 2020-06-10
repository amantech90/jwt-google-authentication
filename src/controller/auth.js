const User = require("../models/User");
const UserController = function () {};

UserController.prototype.signUp = async function (data, callback) {
  let retObj = {};
  try {
    const { name, email, password } = data;
    const user = await User.findOne({ email });
    if (user) {
      retObj.status = true;
      retObj.message = "Email address is alreay exists!";
      return callback(retObj);
    }
    const newUser = await User.create(data);
    if (newUser) {
      retObj.status = true;
      retObj.message = "Successfully sign up!";
      retObj.data = newUser.getSignedJwtToken();
      return callback(retObj);
    }
    retObj.status = false;
    retObj.message = "Something went wrong";
    return callback(retObj);
  } catch (error) {
    console.log(error);
  }
};

UserController.prototype.login = async function (data, callback) {
  const retObj = {};
  try {
    console.log(data);
    const { email, password } = data;
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      retObj.status = false;
      retObj.message = "Email is not found!";
      return callback(retObj);
    }
    console.log(user);
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      retObj.status = false;
      retObj.message = "Email/password is incorrect!";
      return callback(retObj);
    }
    retObj.status = true;
    retObj.message = "Login is success!";
    retObj.data = user.getSignedJwtToken();
    callback(retObj);
  } catch (error) {
    console.log(error);
  }
};

UserController.prototype.home = async function (data, callback) {
  const retObj = {};
  try {
    retObj.status = true;
    retObj.data = data;
    callback(retObj);
  } catch (error) {
    console.log(error);
  }
};

module.exports = new UserController();
