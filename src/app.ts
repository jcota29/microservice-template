import express from 'express';
import bodyParser from 'body-parser';
import { Routes } from './routes/routes';
import AppConfiguration from './middleware/configuration';
import configuration from './configuration';

import mongoose from 'mongoose';
import { MongoError } from 'mongodb';

class App {

    public app: express.Application;
    public routes: Routes = new Routes();
    public appConfiguration: AppConfiguration = new AppConfiguration();

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void{
        //Opción que permite soporte para "Content-Type: application/json" en el payload.
        this.app.use(bodyParser.json({ limit: '50mb' }));
        //Opción que permite soporte para "Content-Type: application/x-www-form-urlencoded" en el payload.
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //Encabezados:
        this.appConfiguration.setResponseHeaders(this.app);
        //Validación del encabezado de autorización:
        //this.app.use(authorization.isAuthorizationHeaderValid);
        //Manejo de rechazos no manejados:
        this.appConfiguration.unhandledRejection();
        //Mongoose.
        //mongooseConfiguration.setup(mongoose, this.mongoURL);
        this.mongoSetup();
        //Rutas.
        this.routes.routes(this.app);
    }

    private mongoSetup = (): void => {
        // let configuration: any = {};
        let environment: string = process.env.NODE_ENV || 'development';
        if(['development'].indexOf(environment) >= 0) {
	    console.log(configuration.connection.url);
            mongoose.connect(configuration.connection.url, {
		dbName: configuration.connection.dbName,
                useNewUrlParser: true,
                useCreateIndex: true ,
		useUnifiedTopology: true
            });
        } else {
            mongoose.connect(configuration.connection.url, {
                dbName: configuration.connection.dbName,
                user: configuration.connection.user,
                pass: configuration.connection.pass,
                // auth: { authdb: 'admin' },
                useNewUrlParser: true,
		useUnifiedTopology: true
            }).catch((error: MongoError) => {
                console.log(error);
                if(error.code === 18) {
                    // Error de autenticación.
                    console.log('app.ts][mongooseConnection][error]: Error de autenticación.')
                }
            });
        }
    };
}

export default new App().app;
