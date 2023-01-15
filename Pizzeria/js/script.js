let checkValues = [];
let radiosValues = [];
let form = document.getElementById('form');
let resultado = document.getElementById("resultado");
let boton = document.getElementById('boton');
let boton2 = document.getElementById('boton2');


//---------Funcion que me coje una palabra random para el texto del input-----------//
const words = ['aguacate', 'helado', 'maiz', 'ketchup', 'conejo', 'cerdo', 'membrillo',
    'mojo', 'zanahoria', 'cafe', 'mantequilla', 'pimiento', 'carrilleras', 'azafran'];

function getRandom(words) {
    const randomIndex = Math.floor(Math.random() * words.length);
    console.log(words[randomIndex]);
    return words[randomIndex];
}

boton.addEventListener("click", function () {
    let ingredienteRandom = getRandom(words);
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "ingredientes");
    input.setAttribute("value", ingredienteRandom);
    form.appendChild(input);
    var prueba = ingredienteRandom;
    input.insertAdjacentHTML('afterend', prueba + '<br>');
    console.log(input);
});

boton2.addEventListener("click", function () {
    let cuadros = document.querySelectorAll('input[type="checkbox"]');
    cuadros.forEach(checkbox => {
        if (checkbox.checked) {
            checkValues.push(checkbox.value);
        }
    });
    let radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        if (radio.checked) {
            radiosValues.push(radio.value);
        }
    });
    showAndHideButton();
    generar_tabla();
});

function showAndHideButton() {
    var button = document.getElementById("pdf");
    var rotulo = document.getElementById("rotulo");
    button.style.display = "block";
    rotulo.style.display = "block";
}

function generar_tabla() {
    var body = document.getElementsByTagName("body")[0];
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var fila1 = document.createElement("tr");
    var fila2 = document.createElement("tr");
    var titulo1= document.createElement("th");
    var titulo2= document.createElement("th");
    var celda1 = document.createElement("td");
    var celda2 = document.createElement("td");    
    var texto1th = document.createTextNode("INGREDIENTES");
    var texto2th = document.createTextNode("TIPO DE MASA");
    var textIngre = document.createTextNode(checkValues);
    var textMasa = document.createTextNode(radiosValues);
    celda1.appendChild(textIngre);
    celda2.appendChild(textMasa);
    fila1.appendChild(celda1);
    fila1.appendChild(celda2);
    titulo1.appendChild(texto1th);
    titulo2.appendChild(texto2th);
    fila2.appendChild(titulo1);
    fila2.appendChild(titulo2);
    tblBody.appendChild(fila2);
    tblBody.appendChild(fila1);
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    tabla.setAttribute("id", "tablaResultante");
    tabla.classList.add('table');
    tabla.classList.add('table-bordered');
    tabla.classList.add('table-success');
    tabla.classList.add('centrar');
    var div = document.getElementById("content");
    div.insertAdjacentElement("beforeend", tabla);
}

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#pdf");
    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.getElementById("imprimir");
        html2pdf()
            .set({
                filename: 'Pedido_Restaurante_Diego.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 1, 
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    //landscape o portrait
                    orientation: 'landscape'
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});

  














  





