import express, { Request, Response } from 'express';
import { FooController } from '../controllers/foo';

export class Routes {

    private fooController: FooController = new FooController();

    public routes(app: express.Application): void {
        app.route('/').get((request: Request, response: Response) => {
            response.status(200).send({ message: '[ROOT] Request OK.' });
	});

	app.route('/foos')
	    .get(this.fooController.getFoos);

	app.route('/foo')
	    .post(this.fooController.postFoo);
    }
}
