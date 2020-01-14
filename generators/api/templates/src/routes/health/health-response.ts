/**
 * Response from a health/readiness check endpoint.
 */
export default interface IHealthResponse {
    /**
     * The status of the service.
     */
    status: string;
} // eslint-disable-line semi
