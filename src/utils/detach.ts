import Block from "../components/block";

export default function detach(query: string, block: Block) {
	const root = document.querySelector(query);
	const el = block.getElement();
	if (el !== undefined && root !== null) {
		root.removeChild(el);
	}
	return root;
}