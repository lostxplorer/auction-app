const SUCCESS = 200;
const NO_CONTENT = 204;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;
const FORBIDDEN = 403;

const success = (res, data) => {
    res.status(SUCCESS).send({
        status: 'SUCCESS',
        data,
    });
}

const created = (res) => {
    res.status(CREATED).send('created');
}

const error = (res, message, description = '') => {
    res.status(INTERNAL_SERVER_ERROR).send({
        status: 'ERROR',
        data: {
                error: {
                    message,
                    description,
                },
            },
        });
    }

const unprocessableEntity = (res, code, message, description = '') => {
        res.status(UNPROCESSABLE_ENTITY).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        });
    }

const badRequest = (res, message, description = '') => {
        res.status(BAD_REQUEST).send({
            status: 'FAILURE',
            data: {
                error: {
                    message,
                    description,
                },
            },
        });
    }

const unauthorized = (res, code, message, description = '') => {
        res.status(UNAUTHORIZED).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        });
    }

const conflict = (res, message, description = '') => {
        res.status(CONFLICT).send({
            status: 'FAILURE',
            data: {
                error: {
                    message,
                    description,
                },
            },
        });
    }

const noContent = (res) => {
        res.status(NO_CONTENT).send({});
    }

const notFound = (res, message, description = '') => {
        res.status(NOT_FOUND).send({
            status: 'FAILURE',
            data: {
                error: {
                    message,
                    description,
                },
            },
        });
    }

const forbidden = (res, code, message, description = '') => {
        res.status(FORBIDDEN).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        });
    }

const failure = (res, error) => {
        res.status(UNPROCESSABLE_ENTITY).send({
            status: 'FAILURE',
            error,
        });
    }

module.exports = {
    success,
    created,
    error,
    failure,
    badRequest,
    forbidden,
    unprocessableEntity,
    unauthorized,
    conflict,
    noContent,
    notFound
}
