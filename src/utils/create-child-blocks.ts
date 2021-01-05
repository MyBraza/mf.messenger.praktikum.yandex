import FormInput from "../components/form-input/form-input";
import Block from "../components/block";

interface FormInputs {
	[key: string]: { [key: string]: string }
}

interface ChildBlocks {
	[key: string]: Block;
}

const createChildBlocks = (formInputs: FormInputs, childBlocks: ChildBlocks) => {
	let skip: Array<string> = [];

	for (let item in formInputs) {
		if (formInputs.hasOwnProperty(item) && !skip.includes(item) && item !== 'button') {
			let itemProps = Object.assign({}, formInputs[item]);
			itemProps.id = item;
			let neighbor = itemProps.with;
			if (neighbor !== undefined && !skip.includes(neighbor)) {
				let neighborProps = Object.assign({}, formInputs[neighbor]);
				neighborProps.id = neighbor;
				childBlocks[neighbor] = new FormInput(neighborProps, 'form-window__item', `#${item}-container`,);
				skip.push(neighbor);
			}
			childBlocks[item] = new FormInput(itemProps, 'form-window__item', `#${item}-container`,);
		}
	}
};

export default createChildBlocks;