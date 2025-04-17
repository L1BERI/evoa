import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {lenis} from './lenisScroll'



gsap.registerPlugin(ScrollTrigger)


lenis.on('scroll', ScrollTrigger.update);


gsap.ticker.add((time) => {
  lenis.raf(time * 1000); 
});


gsap.ticker.lagSmoothing(0);

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
      start: '40% center',
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

const optionsTl = gsap.timeline({
  scrollTrigger:{
    trigger: '.options',
    start: 'top center'
  }
})

optionsTl.fromTo('.options__subtitle', {
  opacity: 0,
  x: -50,
},{
  opacity: 1,
  x: 0,
  duration: 0.7
})

optionsTl.fromTo('.options__title', {
  x: -30,
  opacity: 0,
},{
  x: 0,
  opacity: 1,
  duration: 0.7,
})

const path = document.querySelector(".word-stroke path") as SVGPathElement
const pathLength = path?.getTotalLength();

// Устанавливаем начальные стили
path.style.strokeDasharray = `${pathLength}`;
path.style.strokeDashoffset = `${pathLength}`;

// Анимация рисования
optionsTl.to(path, {
  strokeDashoffset: 0,
  duration: 2,
  ease: "power2.inOut"
}, '<');

optionsTl.fromTo('.options__item-name', {
  x: -50,
  opacity: 0
},{
  x: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 0.5
})
optionsTl.fromTo('.options__item-services', {
  x: -50,
  opacity: 0
},{
  x: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 0.5
}, '<0.5')

const casesTl = gsap.timeline({
  scrollTrigger:{
    trigger:'.cases',
    start: 'top center'
  }
})

casesTl.fromTo('.cases__title', {
  y: -30,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 0.5
})
casesTl.fromTo('.cases__item', {
  y: -30,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 0.5
})

casesTl.fromTo('.cases__img', {
  scale: 0.7,
  opacity: 0
}, {
  scale: 1,
  opacity: 1,
  stagger: 0.2,
  duration: 0.5
})

const footerTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.footer',
    start: 'top center'
  }
})


footerTl.fromTo('.footer__title', {
  x: -50,
  opacity: 0
}, {
  x: 0,
  opacity: 1,
  duration: 1
})
footerTl.fromTo('.footer__img', {
  x: -50,
  opacity: 0
}, {
  x: 0,
  opacity: 1,
  duration: 1
}, '<0.5')
footerTl.fromTo('.footer__content-upper', {
  x: -50,
  opacity: 0
}, {
  x: 0,
  opacity: 1,
  duration: 1
}, '<0.5')
footerTl.fromTo('.footer__content-bottom-text', {
  y: -20,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 1
}, '<0.5')
footerTl.fromTo('.footer__content-bottom-link', {
  y: -20,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 1
}, '<0.5')


