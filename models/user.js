const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
      require: true,
    },
    Password: {
      type: String,
      require: true,
    },
    Confirmpassword: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("Password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.Password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.Password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});
UserSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("Confirmpassword") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.Confirmpassword, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.Confirmpassword = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

const LogIn = mongoose.model("User", UserSchema);
module.exports = LogIn;
