import express, { Application } from 'express';
import mongoose from 'mongoose'; // used to connect the models for the data
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan'; //its a login tools
import controller from '@utils/interfaces/controller.interface';
import ErrorMiddleware from '@middleware/error.middleware';
import helmet from 'helmet';
import exp from 'constants';

class App {
  public express: Application;
  public port: number;

  constructor(controllers: controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initaliseDatabaseConnection();
    this.intialiseMiddleware();
    this.initaliseControllers(controllers);
    this.intialiseErrorHandling();
  }

  private intialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initaliseControllers(controllers: controller[]): void {
    controllers.forEach((controller: controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private intialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private initaliseDatabaseConnection(): void {
    const { MONGO_PATH } = process.env;

    mongoose.connect(
      `mongodb+srv://rahulshenoys_Node:Node_Learning@cluster0.unqsspw.mongodb.net/`,
    );
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default App;
