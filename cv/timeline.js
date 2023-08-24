document.addEventListener("DOMContentLoaded", function () {
    const projectSections = document.querySelectorAll(".project-section");
    const timelineDots = document.querySelectorAll(".timeline-dot");
  
    projectSections.forEach((section, index) => {
      section.querySelector(".project-content").classList.add("animate__animated"); // Añadimos la clase para la animación
      section.querySelector(".project-content").style.opacity = "0"; // Ocultamos el contenido
  
      if (index === 0) {
        section.querySelector(".project-content").style.opacity = "1"; // Mostramos el contenido del primer proyecto
      }
    });
  
    let animationFinished = Array(projectSections.length).fill(false);
  
    window.addEventListener("scroll", function () {
      let fromTop = window.scrollY + (window.innerHeight / 2);
  
      projectSections.forEach((section, index) => {
        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
          timelineDots.forEach((dot) => dot.classList.remove("active-dot"));
          timelineDots[index].classList.add("active-dot");
          section.classList.add("active-dot"); // Agregamos clase a la sección
  
          // Mostrar contenido de la sección al llegar a ella (excepto para el primer proyecto)
          if (!animationFinished[index] && index !== 0) {
            section.querySelector(".project-content").classList.add("animate__fadeInUp");
            section.querySelector(".project-content").style.opacity = "1";
            animationFinished[index] = true;
          }
        } else {
          section.classList.remove("active-dot"); // Removemos la clase si no está en vista
  
          // Mantener el contenido visible del primer proyecto si está en vista
          if (index === 0) {
            section.querySelector(".project-content").style.opacity = "1";
          } else {
            // Ocultar contenido de la sección si no está en vista
            section.querySelector(".project-content").style.opacity = "0";
            animationFinished[index] = false;
          }
        }
      });
    });
  });
  

