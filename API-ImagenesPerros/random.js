//Controladores de funcionalidades principales
const btnRandom = document.querySelector('#btnRandom');
const nombreMascota = document.querySelector('#Contenedor-mascotas');
var btnRaza = document.querySelector('#bloqueMascotas');
const ContenedorMascota = document.querySelector('#Contenedor-mascotas');

//Controladores para la ventana Emergente
const ventanaEmergente = document.querySelector('#popup');
const ventanaOverlay = document.querySelector('#overlay');
const btnCierre = document.querySelector('#btn-cerrar-popup');


//Variables y controladores para la paginación
let pageNumber = 1; //page_number
const registrosPorPagina = 20; //page_size
let totalPaginas;
let iterador;
const paginacionDiv = document.querySelector('#Paginacion');

//Test de conectividad del HTML con JS
console.log('hola');



//Consulta del API con el boton principal
    btnRandom.addEventListener('click', ()=> {
        console.log('hola, aqui estoy');
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(respuesta => respuesta.json())
            .then(resultado => { 
                const datos = Object.entries(resultado);
                const datos2 = Object.keys(datos[0][1]);
                console.log(datos2);
                totalPaginas = parseInt( Math.ceil(datos2.length/registrosPorPagina));
                console.log(totalPaginas);
                const datos3 = Object.values(datos[0][1]);
                console.log(datos3);
                mostrarRazas(datos2);
                })
        
    });
    


// Funcion para mostrar las razas desde el API. Muestra en forma de botones los resultados de la consulto y además conecta con otra consulta de las imagenes + Paginador al final
function mostrarRazas(Razas) {       
    while(nombreMascota.firstChild) {
        nombreMascota.removeChild(nombreMascota.firstChild);
    }
    let Razasperros = mostrarPagina(Razas, registrosPorPagina, pageNumber);
    Razasperros.forEach( Raza => {
        //Aqui en el nuevo bloque se coloca una nueva funcion de nuevaConsultas(Raza) para las imagenes;
       
       nombreMascota.innerHTML += `
        <div>
            <button id="bloqueMascotas" onclick="nuevaConsultas('${Raza}');" value="${Raza}">
               <h3 id="razadeMascota">${Raza}</h3>
            </button>
        </div>
            `
           });
   while(paginacionDiv.firstChild) {
       paginacionDiv.removeChild(paginacionDiv.firstChild);
   }        
   imprimirPaginador(Razas);
} 

//Funcion para hacer la consulta de las imagenes con una nueva URL de la API.
function nuevaConsultas(Raza) {
   
    const url = `https://dog.ceo/api/breed/${Raza}/images/random`;
       
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => ventanaNueva(resultado.message)
        )
        //Se va a abrir una funcion con el resultado que reciba y la foto, va abrir una card.)
}

//Creación del paginador
function *crearPaginador (total) {
    for (i = 1; i<= total; i++) {
        yield i;
    }
}

function imprimirPaginador(Razas) {
    iterador = crearPaginador(totalPaginas);
        while (true) {
        const {done, value } = iterador.next();
        
        if (done) {
            return;
        }

        //crear boton HTML para la paginacion

        const boton = document.createElement('a');
                boton.href = '#';
                boton.dataset.pagina = value;
                boton.textContent = value;
                boton.setAttribute("style"," background-color: white; height: 10px; padding: 8px; margin: 7px; border: 1px solid black; border-radius: 25%;" );

                boton.onclick = () => {
                    
                    pageNumber = value;
                    console.log(pageNumber);
                    mostrarRazas(Razas);
                    
                }

        paginacionDiv.appendChild(boton);
    }

}

//Para el control de la cantidad de elementos. Se corta los elementos segón las cantidades deseadas de elementos que se desee mostrar

function mostrarPagina(array, page_size, page_number) {
//el array ue filtra la cantidad de datos es datos2, pero esta dentro de un condicionante.
    console.log(array.slice((page_number - 1) * page_size, page_number * page_size));
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}    


//A partir de aqui es la función de Pop-up o Ventana Emergente
function ventanaNueva(dato, nombrePerro) {

    const popUp = document.createElement('div');
    popUp.innerHTML = `
                    <div>
                    <img class="responsive" src="${dato}" alt="imagen de perritos de marca">
                    </div>
                    <h1>Hola Mundo</h1>
    `;

    while(ventanaEmergente.firstChild) {
        ventanaEmergente.removeChild(ventanaEmergente.firstChild);
    }     

    ventanaEmergente.appendChild(popUp);
    ventanaOverlay.classList.add('active');
    
}


//Boton de cierre de la ventana Emergente.
btnCierre.addEventListener('click', e => {
    e.preventDefault();
	overlay.classList.remove('active');
	
})

