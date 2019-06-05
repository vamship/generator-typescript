import { expect } from 'chai';
import 'mocha';

import transform from '../../src/index';

describe('[index]', () => {
    it('should expose the expected modules, functions and properties', () => {
        expect(transform).to.be.a('function');
    });
});
