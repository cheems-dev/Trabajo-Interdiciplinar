import express, { Request, Response } from "express";
import { connect__mongoDB } from "./mongoose";
import { Routes } from "../routes";
import * as dotenv from "dotenv";

export class Server {
  public app: express.Application;
  public static _instance: Server;
  public port = process.env.PORT || 3001;

  constructor() {
    dotenv.config();
    this.app = express();
    connect__mongoDB();
    this.settings__json();
    this.settings__cors();
    this.settings__routes();
  }

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

  settings__json() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  settings__routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "the server is active" });
    });

    this.app.use(Routes);
  }

  run__start() {
    this.app.listen(this.port, () => {
      console.log(
        `The server running successfully in port http://localhost:${this.port}`
      );
    });
  }
}
