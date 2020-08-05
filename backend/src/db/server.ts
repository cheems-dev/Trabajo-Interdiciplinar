import express, { Request, Response } from "express"; //para solicitud y respuesta
import { connect__mongoDB } from "./mongoose"; //para concectar al servidor
import { Routes } from "../routes"; //para usar las rutas
import * as dotenv from "dotenv"; //para cargar las variables del entorno

export class Server {
  public app: express.Application; //para usar la aplicacion
  public static _instance: Server; //para la instancia de la aplicacion
  public port = process.env.PORT || 3001; //especifica el puerto

  //configuracion del servidor
  constructor() {
    dotenv.config();//para leer las variables de entorno
    this.app = express();//inicia la aplicacion
    connect__mongoDB();//conecta al servidor
    this.settings__json();
    this.settings__cors();
    this.settings__routes();
  }

  //configuracion para solicitar recursos desde otro dominio
  settings__cors = () => {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization,token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
  };


  settings__json() {//configuracion del JSON
    this.app.use(express.json()); //pare reconocer el objeto de solicitud entrante como JSON
    this.app.use(express.urlencoded({ extended: true }));//para reconocer como amtrices o cadenas
  }


  settings__routes() { //la configuracion de las rutas
    this.app.get("/", (req: Request, res: Response) => {//indica la ruta para las solicitudes GET
      res.status(200).json({ message: "the server is active" });//la solicitud tuvo exito
    });

    this.app.use(Routes);//para usar las rutas en la aplicacion
  }

  run__start() {//para iniciar el servidor
    this.app.listen(this.port, () => { //para atender las solicitudes en el puerto
      console.log(
        `The server running successfully in port http://localhost:${this.port}`//mensaje de exito y el puerto
      );
    });
  }
}
