/**
 * Describes the input to the greeting handler.
 */
export interface IGreetingInput {
    /**
     * The name of the user to greet.
     */
    name: string;

    /**
     * The language in which to greet the user.
     */
    language: Languages;
}

/**
 * Describes the output of the greeting handler.
 */
export interface IGreetingOutput {
    /**
     * The greeting message to respond with.
     */
    message: string;
}

/**
 * Enumeration of supported languages for greetings.
 */
export enum Languages {
    ENGLISH = 'en',
    FRENCH = 'fr',
}
