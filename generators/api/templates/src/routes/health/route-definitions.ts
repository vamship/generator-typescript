import { IRouteDefinition } from '@vamship/expressjs-routes';
import IHealthResponse from './health-response';

const routeDefinitions: IRouteDefinition[] = [
    {
        method: 'GET',
        path: '/',
        handler: (): IHealthResponse => ({ status: 'ok' }),
        inputMapper: (): {} => ({})
    },
    {
        method: 'GET',
        path: '/ready',
        handler: (): IHealthResponse => ({ status: 'ok' }),
        inputMapper: (): {} => ({})
    }
];

export default routeDefinitions;
