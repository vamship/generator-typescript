import type { ReactElement } from 'react';
import { Greetings } from './components/GreetingComponent';

export const App = (): ReactElement => {
    return (
        <>
            <Greetings />
        </>
    );
};

export default App;
