import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../../src/App';

/**
 * @jest-environment jsdom
 */

describe('App', () => {
    // beforeAll(() => {});
    // it('should render component properly', () => {
    //     const componentRenderer = renderer.create(<App />);
    //     const tree = componentRenderer.toJSON();

    //     expect(tree).toMatchSnapshot();
    // });

    it('should render App', () => {
        render(<App />);
        expect(screen.getByText('Hello App')).toBeDefined();
    });
});
