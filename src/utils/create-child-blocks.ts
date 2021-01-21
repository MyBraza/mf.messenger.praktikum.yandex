import FormInput from 'components/form-input/form-input';
import Block from 'components/block';

interface FormInputs {
	[key: string]: { [key: string]: string }
}

interface ChildBlocks {
	[key: string]: Block;
}

const createChildBlocks = (formInputs: FormInputs, childBlocks: ChildBlocks): void => {
	const skip: Array<string> = [];

	for (const item in formInputs) {
		if (Object.prototype.hasOwnProperty.call(formInputs, item) && !skip.includes(item) && item !== 'button') {
			const itemProps = {...formInputs[item]};
			itemProps.id = item;
			const neighbor = itemProps.with;
			if (neighbor !== undefined && !skip.includes(neighbor)) {
				const neighborProps = {...formInputs[neighbor]};
				neighborProps.id = neighbor;
				childBlocks[neighbor] = new FormInput(neighborProps, 'form-window__item', `#${item}-container`);
				skip.push(neighbor);
			}
			childBlocks[item] = new FormInput(itemProps, 'form-window__item', `#${item}-container`);
		}
	}
};

export default createChildBlocks;
