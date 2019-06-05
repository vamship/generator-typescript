import _chai from 'chai';
import _chaiAsPromised from 'chai-as-promised';
import 'mocha';
import _sinonChai from 'sinon-chai';

_chai.use(_chaiAsPromised);
_chai.use(_sinonChai);
const { expect } = _chai;

import transform from '../../src/transform-function';

describe('[transform-function]', () => {
    it('should expose the expected modules, functions and properties', () => {
        expect(transform).to.be.a('function');
    });

    it('should return an IResult', () => {
        const kind = 'any';
        const data = Buffer.from('Here is some data');
        const wrapper = () => transform({ kind, data });

        const ret = wrapper();

        expect(ret).to.be.an('object');
        expect(ret.action).to.exist.and.to.be.a('string');
        expect(ret.target).to.exist.and.to.be.a('string');
        expect(ret.message).to.exist.and.to.be.an('object');
        expect(ret.message.kind).to.exist.and.to.be.a('string');
        expect(ret.message.data).to.exist;
    });
});
