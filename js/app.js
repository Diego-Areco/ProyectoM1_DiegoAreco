function createPalette(size) {
    paletteList.innerHTML = ''; 
    for (let i = 0; i < size; i++) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.className = 'paletteColor';
        const color = generarColorAleatorio();
        button.style.backgroundColor = color;
        button.textContent = color;
        item.appendChild(button);
        paletteList.appendChild(item);
    }
}

function generarColorAleatorio() {
    if (colorFormat.value === 'rgba') {
        return `rgba(${numeroAleatorio(0, 255)}, ${numeroAleatorio(0, 255)}, ${numeroAleatorio(0, 255)}, 1)`;
    }
    return `hsl(${numeroAleatorio(0, 360)}, ${numeroAleatorio(50, 100)}%, ${numeroAleatorio(40, 60)}%)`;

}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

paletteSize.addEventListener('change', (event) => {
    const size = Number(event.target.value);
    createPalette(size);
});

colorFormat.addEventListener('change', (event) => {
    const format = event.target.value;
    createPalette(paletteSize.value);
});

generatePalette.addEventListener('click', () => {
    createPalette(paletteSize.value);
});

createPalette(paletteSize.value);