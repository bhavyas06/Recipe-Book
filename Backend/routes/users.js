import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("The default response object is: ", res.statusCode);
  let fileData = fs.readFileSync("./db.json", { encoding: "utf-8" });

  const users = JSON.parse(fileData)?.users;
  console.log("The user data is: ", users);
  if (users && users.length > 0) {
    res.send(users);
  }
  else {
    res.status(204);
    res.send();
  }
});

router.post("/", (req, res) => {
  const user = req.body;
  let db;
  try {
    db = fs.readFileSync("./db.json", { encoding: "utf-8" });
  } catch (err) {
    res.status(500);
    return res.send({
      message: "Problem connecting with database",
      error: err
    });
  }


  let dbParsed = JSON.parse(db);
  let currentUsers = dbParsed.users;
  let updatedUsersList = [...currentUsers, user];
  let updatedDbParsed = { ...dbParsed, users: updatedUsersList };
  let updateDb = JSON.stringify(updatedDbParsed);

  try {
    fs.writeFileSync("./db.json", updateDb);
    res.send({
      message: "POST api success",
      user: user
    });
  } catch (err) {
    res.status(500);
    res.send({
      error: err,
      message: "POST api failure"
    });
  }
});

export default router;