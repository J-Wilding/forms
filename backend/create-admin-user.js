const reader = require("readline-sync");
const mongoose = require("mongoose");
const users = require("./users.js");

const User = users.model;

mongoose.connect("mongodb://localhost:27017/explore_info_sys", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Get administrator information
let firstName = reader.question("First name: ");
let lastName = reader.question("Last name: ");
let username = reader.question("Username: ");
let password = reader.question("Password: ", {
  hideEchoBack: true,
});

if (firstName === "" || lastName === "" || username === "" || password === "") {
  console.log(
    "You need to enter a first name, last name, username, and password"
  );
  process.exit();
}

User.findOne({
  username: username,
})
  .then((user) => {
    if (user) {
      console.log("That username already exists");
      process.exit();
    }
  })
  .then(() => {
    let user = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      role: "admin",
    });
    user.save().then(() => {
      console.log(
        "OK, admin user created for",
        firstName,
        lastName,
        "with username",
        username
      );
      process.exit();
    });
    // });
  })
  .catch((error) => {
    console.log(error);
  });
