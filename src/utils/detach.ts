import Block from 'components/block';

export default function detach(query: string, block: Block): Node | null {
	const root = document.querySelector(query);
	const el = block.getElement();
	if (el && root) {
		root.removeChild(el);
	}
	return root;
}
