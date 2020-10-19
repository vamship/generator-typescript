import { IRouteDefinition } from '@vamship/expressjs-routes';
import IHealthResponse from './health-response';

const routeDefinitions: IRouteDefinition[] = [
    {
        method: 'GET',
        path: '/',
        handler: (): IHealthResponse => ({ status: 'ok' }),
        inputMapper: (): Record<string, unknown> => ({}),
    },
    {
        method: 'GET',
        path: '/ready',
        handler: (): IHealthResponse => ({ status: 'ok' }),
        inputMapper: (): Record<string, unknown> => ({}),
    },
];

export default routeDefinitions;
