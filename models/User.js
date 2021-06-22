const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const jwt = require("jsonwebtoken");

const aspirantSchema = new mongoose.Schema(
  {
    voteCount: {
      type: Number,
      default: 0,
    },
    name:String,
    position: String
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    matric :{
      type:String
    },
    department: {
      type: String,
    },
    level: {
      type: Number,
    },
    votes: [
      {
        type: ObjectId,
        ref: "Aspirant",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//sign jwt with refresh token
userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

//sign jwt with activation token
userSchema.methods.getActivationToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACTIVATION_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );
};

const Aspirants = mongoose.model("Aspirant", aspirantSchema);
const User = mongoose.model("User", userSchema);
module.exports = { User, Aspirants };
