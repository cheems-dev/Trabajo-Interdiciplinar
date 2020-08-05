import mongoose, { model } from "mongoose";//plugin para hacer la conexion
import { userSchema } from "../models/user"; //esquema del usuario
import { silaboSchema } from "../models/silabo"; //esquema del silabo
import { cursoSchema } from "../models/curso"; //esquema del curso

export const connect__mongoDB = () => {//metodo par ala conexion
  mongoose.set("useFindAndModify", false);//
  mongoose
    .connect(
      "mongodb+srv://revan:xMLm8DHdprY6ofN3yRDJYny7GGGxqSmf26BTDvhfQicBhJpfFiKFHv@cluster0.2hznd.mongodb.net/sgl?retryWrites=true&w=majority",//url
      //paremetros
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        dbName: "sgl",
        useUnifiedTopology: true,
      }
    )
    //si se conecto
    .then(() => {
      console.log("=======================================================");
      console.log("===========MongoDB connect successfully===========");
      console.log("=======================================================");
    })
    //si existe algun error
    .catch((err: any) => {
      console.log("=======================================================");
      console.log(err);
      console.log("===========Failed to connect database===========");
    });
};

//se exporta para usarlo en otro archivo
export const userModel = model("User", userSchema);
export const silaboModel = model("Silabo", silaboSchema);
export const cursoModel = model("Curso", cursoSchema);
