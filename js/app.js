
function createPalette(size) {

    for (let i = 0; i < size; i++) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.className = 'paletteColor';
        button.textContent = `Paleta ${i + 1}`;
        item.appendChild(button);
        paletteList.appendChild(item);
    }
}

paletteSize.addEventListener('change', (event) => {
    const size = Number(event.target.value);
    paletteList.innerHTML = ''; 
    createPalette(size);
});

createPalette(paletteSize.value);