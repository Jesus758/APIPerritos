const btnSelector = document.getElementsByClassName('.opcionesMascotas');
const bloqueSelector = document.querySelector('#seleccion');
const fotoRazas = document.querySelector('#fotoRazas');
let nombreRaza;


// Teste de aprendizaje. Este trecho de código no va a la versión final

//const btnAdicional = document.querySelector('#opcionesMascotasUno');


//btnAdicional.addEventListener('change', e => {
   // e.preventDefault();
    //console.log(e.target.value);
    //console.log('Hola Mundo');
//});//

window.onload = () => {

    //console.log('hola, estoy aqui');
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(respuesta => respuesta.json())
        .then(resultado => {
            const datos = Object.entries(resultado);
            const datos2 = Object.keys(datos[0][1]);
            console.log(datos2);
            crearSelector(datos2);

} )};

//btnSelector.addEventListener('click', () => {
    //console.log('hola, estoy aqui');
    //fetch('https://dog.ceo/api/breeds/list/all')
      //  .then(respuesta => respuesta.json())
       // .then(resultado => {
         //   const datos = Object.entries(resultado);
           // const datos2 = Object.keys(datos[0][1]);
           // console.log(datos2);
           // crearSelector(datos2);
        //})});//


function crearSelector(datos2) {

        console.log('hola de nuevo');
        const selectordos = document.createElement('select');
        const optionDis = document.createElement('option');
        optionDis.innerText += 'Escoge una raza';
        optionDis.setAttribute('type', 'disabled');
        selectordos.appendChild(optionDis);
       
        datos2.forEach( option => {

            selectordos.innerHTML += `
            <option id="razas" value="${option}">${option}</option>                
            `
        }
        )

        bloqueSelector.appendChild(selectordos);
        selectordos.classList.add('opcionesMascotas');
        selectordos.setAttribute('placeholder', 'Escoge raza de perrito');
        selectordos.addEventListener('change', e => {
                        e.preventDefault();
                        //console.log(e.target.value);
                        const razaNombre = e.target.value;
                        console.log(razaNombre);
                        //console.log('Hola Mundo');
                        consultaImagen(razaNombre);
        });

}
 

function cambioNombre(e) {
    console.log('hola');
    e.preventDefault();
    const razaNombre = e.target.value;
    console.log(razaNombre);

}


function consultaImagen(nombre) {
    console.log('hola, estoy aqui');
    fetch(`https://dog.ceo/api/breed/${nombre}/images/random`)
        .then(respuesta => respuesta.json())
        .then(resultado => {
                    console.log(resultado);
                    const imagen = Object.values(resultado)[0];
                    console.log(imagen);
                    limpiarHTML();
                    mostrarImagen(imagen,nombre);
        }
        )}


function mostrarImagen(imagen, nombre) {
        console.log('hola mundo')
        
        const blocoImagen = document.createElement('div');
        blocoImagen.classList.add('perritos');

        blocoImagen.innerHTML += `
            <img src="${imagen}" alt="imagen aleatoria de perritos">
            <h2>Nombre de la Raza:</h2>
            <h1>${nombre}</h1>
        
        `

        fotoRazas.appendChild(blocoImagen);       
}


function limpiarHTML() {

    if (fotoRazas.firstChild) {
        fotoRazas.removeChild(fotoRazas.firstChild);
    }

}
