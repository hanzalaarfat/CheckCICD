const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      // required: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

adminSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

adminSchema.virtual("fullName").get(function () {
  /// full name ko call kiy h login route me
  return `${this.firstName} ${this.lastName}`;
});

adminSchema.methods = {
  authenticate: function (password) {
    //login time call hoga ye method whan se password pass hoga
    return bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("Admin", adminSchema);
