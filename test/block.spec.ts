import { expect } from 'chai';
import Block from '../src/components/block';

describe('Block tests', () => {
  function createBlock(...options:Array<{}|string>) {
    return new Block(...options);
  }
  it('Should return an instance of Block', () => {
    const block = createBlock();
    expect(block).to.be.a.instanceOf(Block);
  });

  it('Should return an HTML element', ()=>{
    const block = createBlock({}, 'SPAN');
    expect(block.getElement()).to.be.an.instanceOf(Object);
    expect(block.getElement()?.tagName).to.equal('SPAN');
  });

});