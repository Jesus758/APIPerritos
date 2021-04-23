const menuBurger = document.querySelector('#menuHambur');
const Contenedor = document.querySelector('.container-header');
const menuPrincipal = document.querySelector('#navbar');


menuBurger.addEventListener('click', () => {
      
    if (Contenedor.classList.contains('open')) {
            Contenedor.classList.remove('open');

        } else {
            Contenedor.classList.add('open');
            
        }
     
})