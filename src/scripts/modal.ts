import {lenis} from './lenisScroll'
const openModalBtn = document.querySelector("[data-open-modal-btn]");
const modalEl = document.querySelector("[data-modal]");
const overlayEl = document.querySelector("[data-overlay]");
const modalCloseBtn = modalEl?.querySelector("[data-modal-close]");
const bodyEl = document.body;
const lenisEl = document.querySelector('.lenis')

let modalOpen = false;

openModalBtn?.addEventListener("click", (e) => {
  lenis.stop()
  e.preventDefault();
  modalEl?.classList.add("modal-active");
  overlayEl?.classList.add("overlay-active");
  lenisEl?.classList.add("body--fixed");
});

overlayEl?.addEventListener("click", () => {
    lenis.start()
  modalEl?.classList.remove("modal-active");
  overlayEl?.classList.remove("overlay-active");
  lenisEl?.classList.remove("body--fixed");
});

modalCloseBtn?.addEventListener("click", (e) => {
    lenis.start()
  e.preventDefault();
  modalEl?.classList.remove("modal-active");
  overlayEl?.classList.remove("overlay-active");
  lenisEl?.classList.remove("body--fixed");
});