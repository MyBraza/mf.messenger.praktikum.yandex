import Block from "../components/block";

export default function render(query: string, block: Block) {
    const root = document.querySelector(query);
    const el = block.getElement();
    if (el !== undefined && root !== null) {
        root.appendChild(el);
    }
    return root;
}