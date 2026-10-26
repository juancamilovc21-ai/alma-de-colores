/* ==========================================
   1. VARIABLES GLOBALES DE ESTADO Y CATÁLOGO
   ========================================== */
let precioBase = 25000;
let precioDisenoExtra = 0;
let disenoSeleccionado = "Flores";

/**
 * Catálogo organizado por categorías para el personalizador en tiempo real:
 * - Cerámica
 * - Cuadros
 * - Materos
 * - Porcelanas
 */
const catalogoPersonalizador = {
    ceramica: [
        { id: "taza", nombre: "☕ Taza Cerámica Clásica", precio: 25000, silueta: "pieza-taza", badge: "Cerámica" },
        { id: "tazon", nombre: "🥣 Tazón Cerámico Rústico", precio: 28000, silueta: "pieza-taza", badge: "Cerámica" },
        { id: "plato", nombre: "🍽️ Plato Cerámico Hondo", precio: 30000, silueta: "pieza-plato", badge: "Cerámica" }
    ],
    cuadros: [
        { id: "cuadro", nombre: "🖼️ Cuadro Retablo Lienzo", precio: 35000, silueta: "pieza-cuadro", badge: "Cuadro" },
        { id: "cuadro-mosaico", nombre: "🎨 Cuadro Mosaico Azulejo", precio: 38000, silueta: "pieza-cuadro", badge: "Cuadro" },
        { id: "retablo", nombre: "🪵 Retablo de Madera Mini", precio: 32000, silueta: "pieza-cuadro", badge: "Cuadro" }
    ],
    materos: [
        { id: "matera", nombre: "🪴 Matera Cónica Terracota", precio: 28000, silueta: "pieza-matera", badge: "Matero" },
        { id: "matera-buho", nombre: "🦉 Matera Artesanal Búho", precio: 32000, silueta: "pieza-matera-buho", badge: "Matero" },
        { id: "matera-mini", nombre: "🌵 Mini Maceta Suculenta", precio: 22000, silueta: "pieza-matera", badge: "Matero" }
    ],
    porcelanas: [
        { id: "porcelana-plato", nombre: "🍽️ Plato de Porcelana Fina", precio: 32000, silueta: "pieza-porcelana", badge: "Porcelana" },
        { id: "porcelana-florero", nombre: "🏺 Florero de Porcelana", precio: 36000, silueta: "pieza-porcelana-florero", badge: "Porcelana" },
        { id: "porcelana-figura", nombre: "👼 Escultura Ángel Porcelana", precio: 40000, silueta: "pieza-porcelana", badge: "Porcelana" }
    ]
};

/* ==========================================
   2. FUNCIONES DEL PERSONALIZADOR EN TIEMPO REAL
   ========================================== */

/**
 * Actualiza el texto visible sobre la pieza de cerámica.
 */
function cambiarNombre() {
    let inputNombre = document.getElementById("nombreText").value;
    let vistaNombre = document.getElementById("vistaNombre");

    vistaNombre.innerText = inputNombre.trim() === "" ? "Tu mensaje aquí" : inputNombre;
}

/**
 * Cambia el diseño gráfico/icono seleccionado y notifica al usuario.
 * @param {string} nombreDiseno - Nombre de la categoría de diseño
 * @param {number} precioExtra - Costo adicional del diseño
 */
function cambiarDiseno(nombreDiseno, precioExtra) {
    disenoSeleccionado = nombreDiseno;
    precioDisenoExtra = precioExtra;

    let vistaDiseno = document.getElementById("vistaDiseno");

    // Asignación de icono según selección
    if (nombreDiseno === "Flores") vistaDiseno.innerText = "🌸";
    else if (nombreDiseno === "Mascotas") vistaDiseno.innerText = "🐶";
    else if (nombreDiseno === "Fútbol") vistaDiseno.innerText = "⚽";
    else if (nombreDiseno === "Amor") vistaDiseno.innerText = "❤️";

    // Notificación Toast con SweetAlert2
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `✨ Diseño de ${nombreDiseno} aplicado`,
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true
    });

    calcularPrecioTotal();
}

/**
 * Llena dinámicamente el selector de piezas según la categoría elegida
 * (cerámica, cuadros, materos, porcelanas).
 */
function cambiarCategoria() {
    const selectCat = document.getElementById("categoriaProducto");
    const cat = selectCat ? selectCat.value : "ceramica";
    const selectPieza = document.getElementById("tipoPieza");

    if (!selectPieza) return;

    const lista = catalogoPersonalizador[cat] || catalogoPersonalizador["ceramica"];
    selectPieza.innerHTML = lista.map(p => `
        <option value="${p.id}" data-precio="${p.precio}" data-silueta="${p.silueta}" data-badge="${p.badge}">
            ${p.nombre} ($${p.precio.toLocaleString("es-CO")})
        </option>
    `).join('');

    actualizarVista();
}

/**
 * Cambia la silueta física, el tipo de pieza y su precio según la selección.
 */
function actualizarVista() {
    const selectPieza = document.getElementById("tipoPieza");
    if (!selectPieza || !selectPieza.options || selectPieza.selectedIndex < 0) return;

    const opcionSeleccionada = selectPieza.options[selectPieza.selectedIndex];
    const silueta = opcionSeleccionada.getAttribute("data-silueta") || "pieza-taza";
    const badgeText = opcionSeleccionada.getAttribute("data-badge") || "Pieza";
    precioBase = parseInt(opcionSeleccionada.getAttribute("data-precio")) || 25000;

    const badgeElem = document.getElementById("vistaTipo");
    if (badgeElem) badgeElem.innerText = badgeText;

    const canvas = document.getElementById("canvasCeramica");
    if (canvas) {
        canvas.className = "canvas-ceramica " + silueta;
    }

    calcularPrecioTotal();
}

/**
 * Recalcula y actualiza el valor total del producto en COP.
 */
function calcularPrecioTotal() {
    let total = precioBase + precioDisenoExtra;
    document.getElementById("precioTotal").innerText = "$" + total.toLocaleString("es-CO") + " COP";
}

/* ==========================================
   3. MODALES INTERACTIVOS (SWEETALERT2)
   ========================================== */

/**
 * Listado oficial de las 10 piezas artesanales de Creación (1 al 10)
 */
const productosCreacion = [
    {
        id: 1,
        nombre: "Sagrado Corazón con Rosas",
        imagen: "images/1.jpg",
        descripcion: "Escultura en fina cerámica con rosas en relieve y detalles sagrados.",
        precio: "$38.000 COP"
    },
    {
        id: 2,
        nombre: "Altar Virgen de Guadalupe",
        imagen: "images/2.jpg",
        descripcion: "Nicho artesanal con rosas moldeadas, querubín y aureola en relieve.",
        precio: "$42.000 COP"
    },
    {
        id: 3,
        nombre: "Dúo Virgen de Guadalupe",
        imagen: "images/3.jpg",
        descripcion: "Figuras artesanales en dos tamaños con delicado manto y querubín.",
        precio: "$35.000 COP"
    },
    {
        id: 4,
        nombre: "Angelito Orante con Cruz",
        imagen: "images/4.jpg",
        descripcion: "Tierna figura de angelito orando con cruz en el pecho y alas abiertas.",
        precio: "$22.000 COP"
    },
    {
        id: 5,
        nombre: "Set x4 Querubines Angelicales",
        imagen: "images/5.jpg",
        descripcion: "Colección de cuatro angelitos en diferentes poses de descanso y ternura.",
        precio: "$45.000 COP"
    },
    {
        id: 6,
        nombre: "Buda Zen de Meditación",
        imagen: "images/6.jpg",
        descripcion: "Escultura oriental en flor de loto con detalles en relieve en su manto.",
        precio: "$32.000 COP"
    },
    {
        id: 7,
        nombre: "Set x4 Monjes de la Sabiduría",
        imagen: "images/7.jpg",
        descripcion: "Cuatro pequeños monjes con expresiones de paz, reflexión y alegría.",
        precio: "$36.000 COP"
    },
    {
        id: 8,
        nombre: "Pequeño Monje Lector",
        imagen: "images/8.jpg",
        descripcion: "Figura artesanal de monje con libro abierto, símbolo de conocimiento y calma.",
        precio: "$24.000 COP"
    },
    {
        id: 9,
        nombre: "Buda de la Abundancia",
        imagen: "images/9.jpg",
        descripcion: "Figura tradicional sonriente que atrae alegría y buena vibra al hogar.",
        precio: "$25.000 COP"
    },
    {
        id: 10,
        nombre: "Monje Bebé de la Paz",
        imagen: "images/10.jpg",
        descripcion: "Figura simpática y tierna haciendo el símbolo de paz y amor.",
        precio: "$22.000 COP"
    }
];

/**
 * Listado oficial de los 4 Empaques Ecológicos (11 al 14)
 */
const productosEmpaques = [
    {
        id: 1,
        nombre: "Caja Kraft Almohada con Yute",
        imagen: "images/11.jpg",
        descripcion: "Empaque biodegradable tipo almohada con lazo de cuerda natural de yute.",
        precio: "+$3.000 COP"
    },
    {
        id: 2,
        nombre: "Bolsas Ecológicas Reutilizables",
        imagen: "images/12.jpg",
        descripcion: "Bolsas sostenibles de tela y papel kraft reciclado para tus detalles.",
        precio: "+$2.000 COP"
    },
    {
        id: 3,
        nombre: "Caja Rígida Ilustrada con Moño",
        imagen: "images/13.jpg",
        descripcion: "Caja de regalo premium con acabado satinado, lazo y cierre imantado.",
        precio: "+$5.000 COP"
    },
    {
        id: 4,
        nombre: "Sobre y Etiqueta en Papel Semilla",
        imagen: "images/14.jpg",
        descripcion: "¡100% plantable! Papel con semillas germinables para sembrar tu planta.",
        precio: "+$1.500 COP"
    }
];

/**
 * Listado oficial de Manualidades y Recuerdos (15 al 24)
 */
const productosManualidades = [
    {
        id: 1,
        nombre: "Cuadro Retablo de Caballo",
        imagen: "images/15.jpg",
        descripcion: "Lienzo artístico montado en bastidor de madera rústica.",
        precio: "$35.000 COP"
    },
    {
        id: 2,
        nombre: "Muñeco de Nieve en Pompones",
        imagen: "images/16.jpg",
        descripcion: "Manualidad en relieve con pompones de algodón y bufanda tejida.",
        precio: "$18.000 COP"
    },
    {
        id: 3,
        nombre: "Pulseras en Cuero y Mostacillas",
        imagen: "images/17.jpg",
        descripcion: "Accesorios tejidos a mano con cuero genuino y detalles étnicos.",
        precio: "$15.000 COP"
    },
    {
        id: 4,
        nombre: "Set de Imanes Souvenir Colombia",
        imagen: "images/18.jpg",
        descripcion: "Imanes decorativos resinados para nevera con motivos típicos.",
        precio: "$16.000 COP"
    },
    {
        id: 5,
        nombre: "Portalápices Multicompartimento",
        imagen: "images/19.jpg",
        descripcion: "Organizador de escritorio artesanal con base de madera y lunares.",
        precio: "$22.000 COP"
    },
    {
        id: 6,
        nombre: "Mugs Típicos Souvenir Colombia",
        imagen: "images/20.jpg",
        descripcion: "Mugs de cerámica con coloridas ilustraciones típicas de ciudades.",
        precio: "$25.000 COP"
    },
    {
        id: 7,
        nombre: "Cuadro Mandala en Puntillismo",
        imagen: "images/21.jpg",
        descripcion: "Lienzo decorativo brillante con técnica de diamantes y pedrería.",
        precio: "$38.000 COP"
    },
    {
        id: 8,
        nombre: "Tortuguitas Tejidas en Crochet",
        imagen: "images/22.jpg",
        descripcion: "Set de amigurumis tejidos a mano con hilos suaves y ojos móviles.",
        precio: "$24.000 COP"
    },
    {
        id: 9,
        nombre: "Cuadro Stitch en Flores de Papel",
        imagen: "images/23.jpg",
        descripcion: "Arte tridimensional en rosas de papel espiral hechas a mano.",
        precio: "$28.000 COP"
    },
    {
        id: 10,
        nombre: "Piedras Pintadas a Mano",
        imagen: "images/24.jpg",
        descripcion: "Piedras de río decoradas con personajes, monstruos y números.",
        precio: "$14.000 COP"
    }
];

/**
 * Amplía una imagen en un modal SweetAlert2 interactivo.
 */
function verImagenAmpliada(src, title) {
    Swal.fire({
        title: title,
        imageUrl: src,
        imageAlt: title,
        imageWidth: 420,
        imageHeight: 'auto',
        showCloseButton: true,
        confirmButtonText: 'Cerrar vista 🔍',
        confirmButtonColor: '#e85d04'
    });
}

/**
 * Redirige a WhatsApp para solicitar un producto específico.
 */
function solicitarProductoWhatsApp(categoria, nombre, precio) {
    let textoWhatsapp = `¡Hola Alma de Colores! 🎨 Me interesa el siguiente producto de *${categoria}*:%0A` +
        `- *Producto:* ${nombre}%0A` +
        `- *Precio:* ${precio}%0A` +
        `¿Me podrían dar más detalles sobre disponibilidad y envío?`;
    let url = `https://wa.me/57321584727?text=${textoWhatsapp}`;
    window.open(url, '_blank');
}

/**
 * Genera el HTML de las tarjetas para los catálogos modales.
 */
function generarHtmlCatalogo(items, categoria) {
    return items.map(item => `
        <div class="card-catalogo-item">
            <span class="num-item">#${item.id}</span>
            <div class="card-img-container" onclick="verImagenAmpliada('${item.imagen}', '${item.nombre}')" title="Clic para ampliar imagen">
                <img src="${item.imagen}" alt="${item.nombre}" class="producto-img-thumb" loading="lazy">
                <span class="zoom-badge"><i class="ph-bold ph-magnifying-glass-plus"></i> Ampliar</span>
            </div>
            <div class="card-catalogo-info">
                <strong>${item.nombre}</strong>
                <small class="desc-text">${item.descripcion}</small>
                <div class="card-action-bar">
                    <b class="precio-destacado">${item.precio}</b>
                    <button type="button" class="btn-pedir-directo" onclick="solicitarProductoWhatsApp('${categoria}', '${item.nombre}', '${item.precio}')">
                        <i class="ph-fill ph-whatsapp-logo"></i> Pedir
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Despliega el catálogo interactivo de empaques ecológicos (Imágenes 11 a 14).
 */
function abrirModalEmpaques() {
    Swal.fire({
        title: '🌱 Empaques Ecofriendly (4 Opciones)',
        icon: 'success',
        iconColor: '#2b9348',
        html: `
            <p style="margin-bottom: 12px; color: #555; font-size: 0.95rem;">
                Empaques 100% amigables con el medio ambiente hechos de papel kraft y materiales reciclados ♻️:
            </p>
            <div class="catalogo-grid-modal">
                ${generarHtmlCatalogo(productosEmpaques, 'Empaques Ecológicos')}
            </div>
        `,
        width: '850px',
        confirmButtonText: '💚 Entendido',
        confirmButtonColor: '#2b9348',
        customClass: {
            popup: 'swal2-poppins-popup modal-ancho-catalogo'
        }
    });
}

/**
 * Despliega el catálogo modal de creación artesanal (Imágenes 1 a 10).
 */
function abrirModalCreacion() {
    Swal.fire({
        title: '✨ Catálogo de Creaciones Artesanales (10 Piezas)',
        icon: 'info',
        iconColor: '#e85d04',
        html: `
            <p style="margin-bottom: 12px; color: #555; font-size: 0.95rem;">
                Cerámicas sin pintar, escoge la tuya y te la hacemos a tu gusto ✨. Toca cualquier imagen para verla en tamaño completo:
            </p>
            <div class="catalogo-grid-modal">
                ${generarHtmlCatalogo(productosCreacion, 'Creación')}
            </div>
        `,
        width: '900px',
        confirmButtonText: '🎨 Cerrar catálogo',
        confirmButtonColor: '#e85d04',
        customClass: {
            popup: 'swal2-poppins-popup modal-ancho-catalogo'
        }
    });
}

/**
 * Listado oficial de Regalos Especiales (26 al 35)
 */
const productosRegalos = [
    {
        id: 1,
        nombre: "Box Pareja Amor",
        imagen: "images/26.png",
        descripcion: "2 tazas personalizadas con fecha, caja kraft y tarjeta dedicatoria.",
        precio: "$55.000 COP"
    },
    {
        id: 2,
        nombre: "Matera Madre Especial",
        imagen: "images/27.png",
        descripcion: "Matera en cerámica con planta natural, caja kraft y tarjeta con mensaje.",
        precio: "$36.000 COP"
    },
    {
        id: 3,
        nombre: "Recuerdo de Graduación",
        imagen: "images/28.png",
        descripcion: "Figura artesanal de graduando con birrete, toga y diploma.",
        precio: "$30.000 COP"
    },
    {
        id: 4,
        nombre: "Kit Hinchas del Fútbol",
        imagen: "images/29.jpg",
        descripcion: "Jarro cervecero grabado con escudo de tu equipo + llavero de camiseta.",
        precio: "$31.000 COP"
    },
    {
        id: 5,
        nombre: "Detalle Navideño Edición",
        imagen: "images/30.jpg",
        descripcion: "Adorno navideño colgante personalizado en cerámica con malvaviscos.",
        precio: "$20.000 COP"
    },
    {
        id: 6,
        nombre: "Caja Sorpresa Cumpleaños",
        imagen: "images/31.jpg",
        descripcion: "Caja temática decorada con globo, dulces, snacks y sorpresa.",
        precio: "$35.000 COP"
    },
    {
        id: 7,
        nombre: "Kit Mi Primera Planta",
        imagen: "images/32.jpg",
        descripcion: "Matera biodegradable, semillas germinables, sustrato y bolsa ecológica.",
        precio: "$28.000 COP"
    },
    {
        id: 8,
        nombre: "Set Pintura en Pareja",
        imagen: "images/33.jpg",
        descripcion: "Kit romántico con 2 lienzos prediseñados, pinturas y set de pinceles.",
        precio: "$40.000 COP"
    },
    {
        id: 9,
        nombre: "Kit Regalo Premium Alma",
        imagen: "images/34.jpg",
        descripcion: "Caja rígida con cinta de lazo, termo y productos aromáticos de spa.",
        precio: "$68.000 COP"
    },
    {
        id: 10,
        nombre: "Placa Motivacional Colgante",
        imagen: "images/35.jpg",
        descripcion: "Letrero de madera con cuerdas y frases inspiradoras para pared o repisa.",
        precio: "$27.000 COP"
    }
];

/**
 * Despliega el catálogo modal de regalos especiales (Imágenes 26 a 35).
 */
function abrirModalRegalos() {
    Swal.fire({
        title: '🎁 Detalles Únicos y Especiales (10 Opciones)',
        icon: 'info',
        iconColor: '#e85d04',
        html: `
            <p style="margin-bottom: 12px; color: #555; font-size: 0.95rem;">
                Kits y detalles listos para regalar en ocasiones especiales 🎉:
            </p>
            <div class="catalogo-grid-modal">
                ${generarHtmlCatalogo(productosRegalos, 'Regalos')}
            </div>
        `,
        width: '920px',
        confirmButtonText: '🎁 Cerrar catálogo',
        confirmButtonColor: '#e85d04',
        customClass: {
            popup: 'swal2-poppins-popup modal-ancho-catalogo'
        }
    });
}

/**
 * Despliega el catálogo modal de manualidades y recuerdos (Imágenes 15 a 24).
 */
function abrirModalManualidades() {
    Swal.fire({
        title: '🖼️ Manualidades y Recuerdos (10 Piezas)',
        icon: 'info',
        iconColor: '#e85d04',
        html: `
            <p style="margin-bottom: 12px; color: #555; font-size: 0.95rem;">
                Gran variedad de figuras, cuadros, tejidos y recuerdos hechos a mano ✨:
            </p>
            <div class="catalogo-grid-modal">
                ${generarHtmlCatalogo(productosManualidades, 'Manualidades')}
            </div>
        `,
        width: '920px',
        confirmButtonText: '🖼️ Cerrar catálogo',
        confirmButtonColor: '#e85d04',
        customClass: {
            popup: 'swal2-poppins-popup modal-ancho-catalogo'
        }
    });
}

/* ==========================================
   4. ASISTENTE Y ENVÍO DE PEDIDO
   ========================================== */

/**
 * Procesa la consulta del asistente según la ocasión elegida.
 */
function consultarAsistente() {
    let opcion = document.getElementById("opcionAsistente").value;
    let mensajeRespuesta = "";
    let iconoRespuesta = "question";

    if (opcion === "mamá") {
        mensajeRespuesta = "Te sugerimos una 🪴 <b>Matera personalizada</b> con diseño de Flores y la frase: <i>'Te quiero Mamá'</i> ❤️.";
        iconoRespuesta = "success";
    } else if (opcion === "cumple") {
        mensajeRespuesta = "Te recomendamos una ☕ <b>Taza personalizada</b> con su diseño favorito (Fútbol ⚽ o Mascotas 🐶) y su nombre 🎉.";
        iconoRespuesta = "success";
    } else if (opcion === "pareja") {
        mensajeRespuesta = "Un 🍽️ <b>Plato decorativo o Cuadro</b> con el diseño de Amor ❤️ y la fecha especial de ambos.";
        iconoRespuesta = "success";
    } else if (opcion === "oficina") {
        mensajeRespuesta = "Una ☕ <b>Taza o Matera pequeña</b> 🌵 para darle vida, color y estilo a tu escritorio.";
        iconoRespuesta = "info";
    }

    Swal.fire({
        title: '💡 Recomendación del Asistente',
        html: `<p style="font-size: 1.05rem; color: #333; margin-top: 10px;">${mensajeRespuesta}</p>`,
        icon: iconoRespuesta,
        confirmButtonText: '¡Excelente idea! ✨',
        confirmButtonColor: '#e85d04'
    });
}

/**
 * Solicita confirmación y redirige a WhatsApp con los datos formateados.
 */
function enviarPedidoWhatsApp() {
    const selectCat = document.getElementById("categoriaProducto");
    const nombreCat = selectCat ? selectCat.options[selectCat.selectedIndex].text : "Cerámica";

    const selectPieza = document.getElementById("tipoPieza");
    const nombrePieza = selectPieza && selectPieza.selectedIndex >= 0 ? selectPieza.options[selectPieza.selectedIndex].text : "Pieza";

    const mensaje = document.getElementById("nombreText").value.trim() || "Sin mensaje";
    const precio = document.getElementById("precioTotal").innerText;

    Swal.fire({
        title: '🚀 ¿Confirmar pedido por WhatsApp?',
        html: `
            <p style="color: #555; font-size: 0.95rem; margin-bottom: 12px;">
                Se abrirá WhatsApp con el resumen detallado de tu diseño:
            </p>
            <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 12px; text-align: left; font-size: 0.9rem; line-height: 1.6;">
                <b>Categoría:</b> ${nombreCat}<br>
                <b>Pieza:</b> ${nombrePieza}<br>
                <b>Diseño:</b> ${disenoSeleccionado}<br>
                <b>Mensaje:</b> "${mensaje}"<br>
                <b>Total:</b> <span style="color: #2b9348; font-weight: bold;">${precio}</span>
            </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#25D366',
        cancelButtonColor: '#d33',
        confirmButtonText: '<i class="ph-fill ph-whatsapp-logo"></i> Sí, ir a WhatsApp',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let textoWhatsapp = `¡Hola Alma de Colores! 🎨 Quiero realizar un pedido personalizado:%0A` +
                `- *Categoría:* ${nombreCat}%0A` +
                `- *Pieza:* ${nombrePieza}%0A` +
                `- *Diseño:* ${disenoSeleccionado}%0A` +
                `- *Texto personalizado:* ${mensaje}%0A` +
                `- *Precio estimado:* ${precio}`;

            let url = `https://wa.me/57321584727?text=${textoWhatsapp}`;
            window.open(url, '_blank');
        }
    });
}

/* Inicialización de categorías y vista previa al cargar */
document.addEventListener("DOMContentLoaded", () => {
    cambiarCategoria();
}); 