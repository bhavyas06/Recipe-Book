import mongoose from "mongoose";

try {
  await mongoose.connect(
    "mongodb+srv://soodbhavya1:bhavya153@cluster0.huoje.mongodb.net/recipebookdb"
  );
  console.log("Db connection success");
} catch(error) {
  console.error("Db connection failed with error", error);
}
