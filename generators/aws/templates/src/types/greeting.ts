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
 * Enumeration of supported languages for greetings.
 */
export enum Languages {
    ENGLISH = 'en',
    FRENCH = 'fr'
}
