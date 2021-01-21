import chai from 'chai';
import Block from '../src/components/block';

const expect = chai.expect;

describe('Block tests', () => {
	function createBlock(...options: Array<Record<string, unknown> | string>) {
		return new Block(...options);
	}

	function initSpyFunc() {
		const spy = chai.spy();

		const block = createBlock();

		return {block, spy};
	}

	it('Constructor should return an instance of Block', () => {
		const block = createBlock();
		expect(block).to.be.a.instanceOf(Block);
	});

	it('getElement should return an HTML element', () => {
		const block = createBlock({}, 'SPAN');
		expect(block.getElement()).to.be.an.instanceOf(Object);
		expect(block.getElement()?.nodeName).to.equal('SPAN');
	});

	it('_registerEvents should call eventBus.on with first argument INIT', () => {
		const {block, spy} = initSpyFunc();
		block.eventBus.on = spy;

		block._registerEvents(block.eventBus);

		expect(spy).to.be.called.with(Block.EVENTS.INIT);
	});

	it('_registerEvents should call eventBus.on with first argument FLOW_CDM', () => {
		const {block, spy} = initSpyFunc();
		block.eventBus.on = spy;

		block._registerEvents(block.eventBus);

		expect(spy).to.be.called.with(Block.EVENTS.FLOW_CDM);
	});

	it('_registerEvents should call eventBus.on with first argument FLOW_RENDER', () => {
		const {block, spy} = initSpyFunc();
		block.eventBus.on = spy;

		block._registerEvents(block.eventBus);

		expect(spy).to.be.called.with(Block.EVENTS.FLOW_RENDER);
	});

	it('_registerEvents should call eventBus.on with first argument FLOW_CDR', () => {
		const {block, spy} = initSpyFunc();
		block.eventBus.on = spy;

		block._registerEvents(block.eventBus);

		expect(spy).to.be.called.with(Block.EVENTS.FLOW_CDR);
	});

	it('_registerEvents should call eventBus.on with first argument FLOW_CDU', () => {
		const {block, spy} = initSpyFunc();
		block.eventBus.on = spy;

		block._registerEvents(block.eventBus);

		expect(spy).to.be.called.with(Block.EVENTS.FLOW_CDU);
	});

	it('init should call eventBus.emit with first argument FLOW_CDM', () => {
		const {block, spy} = initSpyFunc();
		block.eventBus.emit = spy;

		block.init();

		expect(spy).to.be.called.with(Block.EVENTS.FLOW_CDM);
	});

	it('init should call _createResources', () => {
		const {block, spy} = initSpyFunc();

		block._createResources = spy;
		block.init();

		expect(spy).to.be.called();
	});

	it('_componentDidMount should call eventBus.emit with first argument FLOW_RENDER', () => {
		const {block, spy} = initSpyFunc();
		block.eventBus.emit = spy;

		block._componentDidMount();

		expect(spy).to.be.called.with(Block.EVENTS.FLOW_RENDER);
	});

	it('_componentDidMount should call componentDidMount', () => {
		const {block, spy} = initSpyFunc();
		block.componentDidMount = spy;

		block._componentDidMount();

		expect(spy).to.be.called();
	});

	it('_componentDidUpdate should call eventBus.emit with FLOW_RENDER', () => {
		const {block, spy} = initSpyFunc();
		block.eventBus.emit = spy;

		block._componentDidUpdate();

		expect(spy).to.be.called.with(Block.EVENTS.FLOW_RENDER);
	});

	it('_render should call eventBus.emit with FLOW_CDR', () => {
		const {block, spy} = initSpyFunc();
		block.eventBus.emit = spy;

		block._render();

		expect(spy).to.be.called.with(Block.EVENTS.FLOW_CDR);
	});

	it('_render should set _element.innerHTML to render', () => {
		const block = createBlock();

		const render = 'some string';

		block.render = () =>{
			return render;
		};

		block._render();

		expect(block._element?.innerHTML).to.be.equal(render);
	});

	it('_componentDidRender should call componentDidRender', () => {
		const {block, spy} = initSpyFunc();
		block.componentDidRender = spy;

		block._componentDidRender();

		expect(spy).to.be.called();
	});

	it('hide should set _element.style.display to "none"', () => {
		const block = createBlock();

		block.hide();

		expect(block._element?.style.display).to.be.equal('none');
	});

	it('hide should call hide of childBlocks', () => {
		const {block, spy} = initSpyFunc();

		block.childBlocks.testBlock = createBlock();
		block.childBlocks.testBlock.hide = spy;

		block.hide();

		expect(spy).to.be.called();
	});

	it('show should set _element.style.display to ""', () => {
		const block = createBlock();

		block.show();

		expect(block._element?.style.display).to.be.equal('');
	});

	it('show should call show of childBlocks', () => {
		const {block, spy} = initSpyFunc();

		block.childBlocks.testBlock = createBlock();
		block.childBlocks.testBlock.show = spy;

		block.show();

		expect(spy).to.be.called();
	});

});