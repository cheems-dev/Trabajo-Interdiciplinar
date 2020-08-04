import mongoose, { model } from "mongoose";
import { userSchema } from "../models/user";
import { silaboSchema } from "../models/silabo";
import { cursoSchema } from "../models/curso";

export const connect__mongoDB = () => {
  mongoose.set("useFindAndModify", false);
  mongoose
    .connect(
      "mongodb+srv://revan:xMLm8DHdprY6ofN3yRDJYny7GGGxqSmf26BTDvhfQicBhJpfFiKFHv@cluster0.2hznd.mongodb.net/sgl?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        dbName: "sgl",
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("=======================================================");
      console.log("===========MongoDB connect successfully===========");
      console.log("=======================================================");
    })
    .catch((err: any) => {
      console.log("=======================================================");
      console.log(err);
      console.log("===========Failed to connect database===========");
    });
};

export const userModel = model("User", userSchema);
export const silaboModel = model("Silabo", silaboSchema);
export const cursoModel = model("Curso", cursoSchema);
