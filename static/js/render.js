export default function render(query, block) {
    const root = document.querySelector(query);
    const el = block.getElement();
    if (el !== undefined && root !== null) {
        root.appendChild(el);
    }
    return root;
}
//# sourceMappingURL=render.js.map