import { renderizarProducto, inicializarMenuHamburguesa, renderizarTarjetas, inicializarBuscador } from './js/ui.js';
import { inicializarCarrito } from './js/carritoUI.js';

let listaProductos = [];
let currentIndex = 0;

async function cargarTarjetas() {
    try {
        const res = await fetch('./json/tarjetas.json');
        const tarjetas = await res.json();
        renderizarTarjetas(tarjetas);
        inicializarBuscador(tarjetas);
    } catch (error) {
        console.error('Error al cargar tarjetas:', error);
    }
}

async function iniciarApp() {
    try {
        const res = await fetch('./json/productos.json');
        listaProductos = await res.json();
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % listaProductos.length;
            renderizarProducto(listaProductos[currentIndex], currentIndex);
        }, 5000);

    } catch (err) {
        console.error("Fallo al cargar JSON", err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
    inicializarMenuHamburguesa();
    cargarTarjetas();

    if (document.getElementById('carrito-items')) {
        inicializarCarrito();
    }
});