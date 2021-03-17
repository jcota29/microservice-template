import { Request, Response } from 'express';
import FooModel from '../models/foo';

export class FooController {

    /**
     * Create a 'foo' instance.
     * @param {Request} request - HttpRequest. 
     * @param {Response} response - HttpResponse 
     */
    public postFoo(request: Request, response: Response): void {
        let foo = new FooModel(request.body);
	foo.save((error: any, data: any) => {
	    if (error) {
                response.status(400).end(JSON.stringify(error));
	    } else {
		response.status(200).end(JSON.stringify(data));
	    }
	});
    }

    /**
     * Get all 'foo' instances.
     * @param {Request} request - HttpRequest.
     * @param {Response} response - HttpResponse.
     */
    public getFoos(request: Request, response: Response): void {
	let { ...filters }: any = request.query;
	FooModel.find(filters).exec((error: any, data: any) => {
	    if (error) {
		response.status(400).end(JSON.stringify(error));
	    } else {
		response.status(200).end(JSON.stringify(data));
	    }
	});
    }
}

