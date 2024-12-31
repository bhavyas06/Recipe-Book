import express from "express";
import UserModel from "../models/users.js";
import { verifyToken } from "../utils/helpers.js";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  console.log("The default response object is: ", res.statusCode);
  UserModel.getUser(req, (dbRes) => {
    if (dbRes) {
      res.send(dbRes);
    } else {
      res.status(204);
      res.send(dbRes);
    }
  },
    (dbErr) => {
      console.log(dbErr.name);
      res.status(dbErr.status || 500);
      res.send({ error: dbErr.message });
    }
  );
});

router.post("/", (req, res) => {
  const { action, ...userData } = req.body;

  if (action === "signUp") {
    UserModel.addUser(
      userData,
      (dbRes) => {
        res.status(201).send(dbRes);
      },
      (dbErr) => {
        console.error(dbErr.name);
        if (dbErr.name === "ValidationError") {
          res.status(400);
        } else {
          res.status(500);
        }
        res.send({ error: dbErr.message });
      }
    );
  } else if (action === "signIn") {
    UserModel.signIn(
      userData,
      (dbRes) => {
        res.status(200).send(dbRes);
      },
      (dbErr) => {
        console.error(dbErr.name);
        res.status(dbErr.status || 500).send({ error: dbErr.message });
      }
    );
  } else {
    res.status(400).send({ error: "Invalid action" });
  }
});


export default router;