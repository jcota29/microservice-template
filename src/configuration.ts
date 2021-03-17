let configuration: any = {};
let environment: string = process.env.NODE_ENV || 'development';

switch(environment.toLowerCase().trim()) {
    case 'production':
        configuration = require('./configuration/configuration.prod.json');
        break;
    case 'development':
    default:
        configuration = require('./configuration/configuration.dev.json');
        break;
}

export default configuration;
