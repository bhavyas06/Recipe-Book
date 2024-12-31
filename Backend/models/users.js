import mongoose from "mongoose";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constant.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("users", userSchema);

UserModel.getUser = async (req, successCallback, errorCallback) => {
  const emailFromReq = req?.params?.email;
  const emailFromAuthToken = req?.emailFromAuthToken;

  console.log("The req.emailFromAuthToken is: ", req.emailFromAuthToken);

  if (emailFromReq !== emailFromAuthToken) {
    errorCallback({ status: 401, message: "Invalid credentials" });
  }

  try {
    const dbRes = await UserModel.find({ email: emailFromReq });
    console.log("GET | dbRes is: ", dbRes);
    successCallback(dbRes);
  } catch (dbErr) {
    console.error("GET | dbErr is: ", dbErr.Error);
    errorCallback(dbErr);
  }
};

UserModel.signIn = async (user, successCallback, errorCallback) => {
  try {
    const dbRes = await UserModel.findOne({ email: user.email });
    if (!dbRes) {
      return errorCallback({ status: 404, message: "User does not exist" });
    }

    if (dbRes) {
      console.log("SignIn | dbRes is: ", dbRes);
      const isPasswordMatch = brcypt.compareSync(user.password, dbRes.password);
      if (isPasswordMatch) {
        const authToken = jwt.sign({ email: dbRes.email }, JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
        successCallback({
          token: authToken,
          user: {
            id: dbRes._id,  // Use dbRes._id, not user._id
            email: dbRes.email,
            name: dbRes.name,
            phoneNumber: dbRes.phoneNumber,
          },
        });
      } else {
        errorCallback({ status: 401, message: "Invalid password" });
      }
    } else {
      errorCallback({ message: "User does not exist" });
      return;
    }
  } catch (dbErr) {
    console.error("GET | dbErr is: ", dbErr.Error);
    errorCallback(dbErr);
  }
};

UserModel.addUser = async (user, successCallback, errorCallback) => {
  console.log("Incoming user data:", user);

  let encryptedPassword = "";
  if (user?.password) {
    try {
      encryptedPassword = brcypt.hashSync(user.password, 10);
    } catch (error) {
      console.error("Error encrypting password: ", error);
      return errorCallback({ message: "Error encrypting password" });
    }
  }

  if (!user?.name || !user?.email || !user?.phoneNumber || !encryptedPassword) {
    return errorCallback({ message: "Missing required fields" });
  }

  try {
    const dbRes = await UserModel.create([
      { ...user, password: encryptedPassword },
    ]);
    console.log("Post | dbRes is: ", dbRes);
    successCallback(dbRes);
  } catch (dbErr) {
    console.error("Error inserting user: ", dbErr); 
  errorCallback({ message: "Error occurred while creating user", error: dbErr });
  }
};


export default UserModel;