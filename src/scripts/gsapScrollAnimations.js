import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import 'lenis/dist/lenis.css';

// Инициализация Lenis (включаем autoRaf false для контроля)
const lenis = new Lenis({
  autoRaf: false
});

// Функция обновления Lenis и ScrollTrigger вручную
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update(); // Обновляем ScrollTrigger вручную
  requestAnimationFrame(raf); // Постоянно обновляем
}
requestAnimationFrame(raf);

// Регистрация ScrollTrigger
gsap.registerPlugin(ScrollTrigger);



// Обработчик события для скролла Lenis и обновления ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// on load

const loadTl = gsap.timeline()

loadTl.fromTo('.hero__title', {
    y: -40,
    opacity: 0,
},{
    y:0, 
    opacity: 1,
    stagger: 0.2,
    duration: 1,
    onComplete: () => {
        gsap.set('.hero__title',{
            clearProps: 'all'
        })
    }
})
loadTl.fromTo('.hero__title>span', {
    x: -40,
    opacity: 0,
},{
    x:0, 
    opacity: 1,
    stagger: 0.2,
    duration: 1,
    onComplete: () => {
        gsap.set('.hero__title>span',{
            clearProps: 'all'
        })
    }
}, '<')

loadTl.fromTo('#canvas', {
    opacity: 0,
},{
    opacity: 1,
    duration: 1,
    onComplete: () => {
        gsap.set('#canvas',{
            clearProps: 'all'
        })
    }
})

loadTl.fromTo('header', {
    opacity: 0
}, {
    opacity: 1,
    duration: 0.5,
    ease: 'none',
    onComplete: () => {
        gsap.set('header',{
            clearProps: 'all'
        })
    }
})

gsap.fromTo('.about__title', {
    opacity: 0,
    y: -40,
},{
    opacity: 1,
    y: 0,
    scrollTrigger: {
        trigger: '.about__title',
        start: '40% bottom'
    },
    onComplete: () => {
        gsap.set('.about__title',{
            clearProps: 'all'
        })
    }
})
const aboutText = document.querySelectorAll('.about__text');

aboutText.forEach((text, index) => {
  gsap.fromTo(text, {
    opacity: 0,
    y: -40,
  }, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    scrollTrigger: {
      trigger: text,
      start: '40% bottom',
      toggleActions: 'play none none none', // только вперед
    },
    onComplete: () => {
      gsap.set(text, { clearProps: 'all' });
    }
  });

  // Добавим ScrollTrigger для управления активным классом
  ScrollTrigger.create({
    trigger: text,
    start: 'center center',
    end: 'center center',
    onEnter: () => {
      aboutText.forEach(el => el.classList.remove('text-active'));
      text.classList.add('text-active');
      
   
     
    },
    onEnterBack: () => {
      aboutText.forEach(el => el.classList.remove('text-active'));
      text.classList.add('text-active');
    }
  });
});

const stepsTl = gsap.timeline({
  scrollTrigger:{
  trigger: '.steps',
  start: 'top center'
  }
})

stepsTl.fromTo('.steps__top', {
    opacity: 0,
}, {
    opacity: 1,
})
stepsTl.fromTo('.steps__title', {
    opacity: 0,
    x: -40,
}, {
    x: 0, 
    opacity: 1,
})
stepsTl.fromTo('.steps__text', {
    opacity: 0,
    x: 40,
}, {
    x: 0, 
    opacity: 1,
})

const stepsItems = document.querySelectorAll('.steps__item')


stepsItems.forEach(item => {
  stepsTl.fromTo(item, {
    opacity: 0,
    y: -40
  }, {
    y: 0,
    opacity: 1,
    duration: 0.5,
    ease: 'power1.in',
  })
})


gsap.fromTo('.options__subtitle', {
  opacity: 0,
  x: -40,
},{
  opacity: 1,
  x: 0,
  duration: 0.7,
  scrollTrigger: {
    trigger: '.options',
    start: 'top center'
  }
})

gsap.fromTo('.options__title', {
  opacity: 0,
},{
  opacity: 1,
  duration: 0.7,
  scrollTrigger: {
    trigger: '.options',
    start: 'top center'
  },
  delay: 0.5,
})


