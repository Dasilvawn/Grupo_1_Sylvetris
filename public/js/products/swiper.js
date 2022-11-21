const myCustomSlider = document.querySelectorAll('.swiper');
console.log(myCustomSlider)
for( i=0; i< myCustomSlider.length; i++ ) {
  
  myCustomSlider[i].classList.add('swiper-' + i);
  
  if(myCustomSlider[i].id === "swiper_product_datail"){
    // product detail
    const swiper = new Swiper(".swiper-" + i, {
      speed: 400,
      spaceBetween: 100,
      effect: "fade",
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
      autoplay: {
        delay: 5000,
      },
      fadeEffect: {
        crossFade: true,
      },
    });
  }
  if(myCustomSlider[i].id === "swiper_carrousel"){
    // carrousel
    const swiper = new Swiper(".swiper-" + i, {
      speed: 400,
      slidesPerView: 4,
      spaceBetween: 30,
      effect: "slide",
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        },
     
    });
  }
  

}


