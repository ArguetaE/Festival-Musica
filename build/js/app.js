document.addEventListener('DOMContentLoaded', function () {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
})

//Navegacion Fija
function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival= document.querySelector('.sobre-festival');

    document.addEventListener('scroll', function() {
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        }else{
            header.classList.remove('fixed');
        }
    })
}

//Resaltar enlace
function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion_principal a')
 
        let actual = '';
        sections.forEach( section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3 ) ) {
                actual = section.id
            }
        })
 
        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}
//Scroll nav
function scrollNav(){
    const navLiks = document.querySelectorAll('.navegacion_principal a');

    navLiks.forEach(link => {
        link.addEventListener('click', e=>{
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'}) //salto lento
        })
    })
}

//creando una galeria con .Js
function crearGaleria() {
    const CantidadImagenes = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i<=CantidadImagenes; i++){
      const imagen = document.createElement('IMG');
      imagen.src =`src/img/gallery/full/${i}.jpg`;
      imagen.alt ='Imagen Galeria';

      //Event Handler
      imagen.onclick = function (){
        mostrarImagen(i);
      };

      galeria.appendChild(imagen);
    }
}

function mostrarImagen(i){
    
    const imagen = document.createElement('IMG');
    imagen.src =`src/img/gallery/full/${i}.jpg`;
    imagen.alt ='Imagen Galeria';

    //Generar el Modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    //Boton cerrar Modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);
   
    //Agregar el Html
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(() => {
        modal?.remove();

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);
}