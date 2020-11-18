/**
 * A context object injected into the lambda call.
 */
export interface IContext {
    /**
     * The name of the lambda function.
     */
    functionName: string;

    /**
     * The ARN of the invoked function.
     */
    invokedFunctionArn: string;

    /**
     * The amount of memeory allocated to the function.
     */
    memoryLimitInMB: number;

    /**
     * The AWS request id associated with the invocation.
     */
    awsRequestId: string;

    /**
     * The log group name used for cloudwatch logging.
     */
    logGroupName: string;

    /**
     * The log stream name used for cloudwatch logging.
     */
    logStreamName: string;
}

type LoggerArg = Record<string, unknown> | string;

/**
 * An extension object associated with the lambda invocation.
 */
export interface IExt {
    /**
     * The config object injected into the handler.
     */
    config: {
        /**
         * Retrieves a config value using a dot separated config key.
         */
        get: (key: string) => string | number | boolean | {};
    };

    /**
     * The logger object injected into the handler.
     */
    logger: {
        /**
         * Trace logging method.
         */
        trace: (mergeObj?: LoggerArg, message?: LoggerArg) => void;

        /**
         * Debug logging method.
         */
        debug: (mergeObj?: LoggerArg, message?: LoggerArg) => void;

        /**
         * Info logging method.
         */
        info: (mergeObj?: LoggerArg, message?: LoggerArg) => void;

        /**
         * Warning logging method.
         */
        warn: (mergeObj?: LoggerArg, message?: LoggerArg) => void;

        /**
         * Error logging method.
         */
        error: (mergeObj?: LoggerArg, message?: LoggerArg) => void;

        /**
         * Fatal error logging method.
         */
        fatal: (mergeObj?: LoggerArg, message?: LoggerArg) => void;
    };

    /**
     * The alias associated with the lambda function.
     */
    alias: string;
}
