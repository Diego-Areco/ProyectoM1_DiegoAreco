function getTextColor(backgroundColor) {
    const [r, g, b] = backgroundColor.match(/\d+/g).map(Number);
    const brightness = (r + g + b) / 3;
    return brightness < 128 ? '#fff' : '#000';
}

function toHex(n) {
   return n.toString(16).padStart(2, '0');
}

function colorToHex(backgroundColor) {
    const [r, g, b] = backgroundColor.match(/\d+/g).map(Number);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function updatePalette(size) {
    for (let i = 0; i < size; i++) {
        if (!palette[i] || !palette[i].locked) {
            palette[i] = { color: generarColorAleatorio(), locked: false };
        }
    }
    palette.length = size;
}

function renderPalette() {
    paletteList.innerHTML = ''; 

    palette.forEach((item, index) => {
        const li = document.createElement('li');

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'paletteColor';
        button.style.backgroundColor = item.color;
        button.title = 'Click para copiar';

        const lockBtn = document.createElement('button');
        lockBtn.type = 'button';
        lockBtn.className = 'lockButton';

        const code = document.createElement('span');
        code.className = 'colorCode';
        code.textContent = item.color;
        
        function updateLockButton() {
            lockBtn.textContent = item.locked ? '🔒' : '🔓';
            lockBtn.title = item.locked ? 'Clic para desbloquear' : 'Clic para bloquear';
            lockBtn.setAttribute('aria-pressed', item.locked);
            lockBtn.setAttribute('aria-label',`${item.locked ? 'Desbloquear' : 'Bloquear'} color ${index + 1}`);
        }

        updateLockButton();

        lockBtn.addEventListener('click', () => {
            item.locked = !item.locked;
            updateLockButton();
        });

        button.appendChild(code);
        li.appendChild(button);
        li.appendChild(lockBtn);
        paletteList.appendChild(li);
        button.style.color = getTextColor(getComputedStyle(button).backgroundColor);
        const hex = colorToHex(getComputedStyle(button).backgroundColor);

        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(hex);
                showToast(`¡Color copiado ${hex}!`);
            } catch {
                showToast('No se pudo copiar');
            }
        });

    });
}

function createPalette(size) {
    updatePalette(size);
    renderPalette();
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

generatePalette.addEventListener('click', () => {
    createPalette(Number(paletteSize.value));
    showToast('¡Paleta generada!');
});

let palette = [];

createPalette(Number(paletteSize.value));

const toast = document.getElementById('toast');
let toastTimeout;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 1500);
}

const addFavorite = document.getElementById('addFavorite');
const favoritesList = document.getElementById('favoritesList');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function renderFavorites() {
    favoritesList.innerHTML = '';

    favorites.forEach((fav, index) => {
        const li = document.createElement('li');
        li.className = 'favorite';

        const colors = document.createElement('div');
        colors.className = 'favoriteColors';
        fav.forEach(item => {
            const box = document.createElement('span');
            box.className = 'favoriteColor';
            box.style.backgroundColor = item.color;
            colors.appendChild(box);
        });

        li.appendChild(colors);
        favoritesList.appendChild(li);
    });
}

addFavorite.addEventListener('click', () => {
    favorites.push(JSON.parse(JSON.stringify(palette)));
    saveFavorites();
    renderFavorites();
    showToast('¡Paleta agregada a favoritos!');
});

renderFavorites();
