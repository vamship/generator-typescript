import {
    args as _argErrors,
    data as _dataErrors,
    http as _httpErrors
} from '@vamship/error-types';
import { Router } from 'express';

const { SchemaError } = _argErrors;
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError
} = _httpErrors;
const { DuplicateRecordError, ConcurrencyControlError } = _dataErrors;

/**
 * Configures and returns a set of routes based on a list of declarative route
 * definitions.
 *
 * @module routes
 */
const router: Router = Router();
router.get('/error/:type', (req, res, next) => {
    const errorType = req.params.type;
    switch (errorType.toLowerCase()) {
        case 'badrequest':
            next(new BadRequestError());
            break;
        case 'notfound':
            next(new NotFoundError());
            break;
        case 'unauthorized':
            next(new UnauthorizedError());
            break;
        case 'forbidden':
            next(new ForbiddenError());
            break;
        case 'schema':
            next(new SchemaError());
            break;
        case 'duplicaterecord':
            next(new DuplicateRecordError());
            break;
        case 'concurrencycontrol':
            next(new ConcurrencyControlError());
            break;
        case 'error':
            break;
        default:
            next(new Error());
            break;
    }
});

export default router;
