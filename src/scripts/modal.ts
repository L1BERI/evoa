import { log } from 'node_modules/astro/dist/core/logger/core';
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

import { formValidation } from "@scripts/FormValidate.js";


const modalForm = document.querySelector("[data-modal-form]") as HTMLFormElement | null;

const modalNameInput = modalForm?.querySelector("[data-name-input]") as HTMLInputElement | null;
const modalNameLabel = modalForm?.querySelector("[data-name-label]") as HTMLLabelElement | null;

modalNameInput?.addEventListener("input", () => {
  if (modalNameInput) {
    modalNameInput.value = modalNameInput.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
  }
});

modalNameInput?.addEventListener("focus", () => {
  if (modalNameLabel) {
    modalNameLabel.textContent = "Приятно познакомиться!";
  }
});

modalNameInput?.addEventListener("blur", () => {
  if (modalNameInput && modalNameLabel) {
    modalNameLabel.textContent =
      modalNameInput.value === "" ? "Ваше имя" : "Приятно познакомиться!";
  }
});

const contactInput = document.querySelector("[data-contact-input]") as HTMLInputElement;
const contactLabel = document.querySelector("[data-contact-label]") as HTMLLabelElement | null;
const buttons = document.querySelectorAll("[data-contact-btn]") as NodeListOf<HTMLButtonElement>;

let activeType = "tg";

// Маска телефона
function handlePhoneInput() {
  let value = contactInput.value.replace(/\D/g, "");
  if (value.startsWith("7")) {
    value = value.slice(1);
  }

  let formatted = "+7";
  if (value.length > 0) formatted += " (" + value.substring(0, 3);
  if (value.length >= 4) formatted += ") " + value.substring(3, 6);
  if (value.length >= 7) formatted += "-" + value.substring(6, 8);
  if (value.length >= 9) formatted += "-" + value.substring(8, 10);

  contactInput.value = formatted;
}

function applyPhoneMask() {
  contactInput.addEventListener("input", handlePhoneInput);
}

function removePhoneMask() {
  contactInput.removeEventListener("input", handlePhoneInput);
}

function preventAtDeletion(e: KeyboardEvent) {
  if (
    contactInput.selectionStart &&
    contactInput.selectionStart <= 1 &&
    (e.key === "Backspace" || e.key === "Delete")
  ) {
    e.preventDefault();
  }
}

function restoreAtPrefix() {
  if (!contactInput.value.startsWith("@")) {
    contactInput.value = "@" + contactInput.value.replace(/@/g, "");
  }
}

function enableTgProtection() {
  contactInput.addEventListener("keydown", preventAtDeletion);
  contactInput.addEventListener("input", restoreAtPrefix);
}

function disableTgProtection() {
  contactInput.removeEventListener("keydown", preventAtDeletion);
  contactInput.removeEventListener("input", restoreAtPrefix);
}

function updateContactInput(type: string) {
  activeType = type;

  removePhoneMask();
  disableTgProtection();
  contactInput.value = "";
  contactInput.placeholder = "";

  contactInput.classList.remove("tg-focused", "phone-focused");
  contactLabel?.classList.remove("mail-active", "phone-active");

  if (type === "tg" && contactLabel) {
    contactInput.value = "@";
    contactLabel.textContent = "login";
    enableTgProtection();
    contactInput.classList.add("tg-focused");
  } else if (type === "mail" && contactLabel) {
    contactLabel.textContent = "Введите почту";
    contactLabel.classList.add("mail-active");
  } else if (type === "phone" && contactLabel) {
    contactInput.value = "+7";
    contactInput.classList.add("phone-focused");
    contactLabel.textContent = "(000) 000 00-00";
    contactLabel.classList.add("phone-active");
    applyPhoneMask();
  }
}

contactInput.addEventListener("focus", () => {
  if (contactLabel) {
    contactLabel.textContent = "Мы с вами свяжемся!";
  }
});

contactInput.addEventListener("blur", () => {
  if (
    contactInput.value === "" ||
    contactInput.value === "@" ||
    contactInput.value === "+7"
  ) {
    updateContactInput("phone");
  }
});

function setupDotMovement(wrapperSelector: string) {
  const wrapper = document.querySelector(wrapperSelector) as HTMLElement | null;
  const buttons = wrapper?.querySelectorAll(".modal__row-btn") as NodeListOf<HTMLElement> | undefined;
  const dot = wrapper?.querySelector(".modal__active-dot") as HTMLElement | null;

  function updateActiveDot(target: HTMLElement) {
    const offset =
      target.offsetTop + target.offsetHeight / 2 - (dot?.offsetHeight || 0) / 2;
    if (dot) dot.style.top = `${offset}px`;
  }

  buttons?.forEach((btn) => {
    btn.addEventListener("click", () => {
      wrapper?.querySelector(".btn-active")?.classList.remove("btn-active");
      btn.classList.add("btn-active");
      updateActiveDot(btn);
    });
  });

  const initialActive = wrapper?.querySelector(".btn-active") as HTMLElement | null;
  if (initialActive) updateActiveDot(initialActive);
}

window.addEventListener("DOMContentLoaded", () => {
  setupDotMovement(".modal__contact-btns");
  setupDotMovement(".modal__price-btns");
});

buttons.forEach((button) => {
  button.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    const type = target.getAttribute("data-contact-btn") as string;

    buttons.forEach((btn) => btn.classList.remove("btn-active"));
    target.classList.add("btn-active");

    contactInput.value = "";
    contactInput.classList.remove("is-filled");
    updateContactInput(type);
  });
});

updateContactInput("tg");

const modalPriceInput = modalForm?.querySelector("[data-price-input]") as HTMLInputElement | null;
const modalPriceLabel = modalForm?.querySelector("[data-price-label]") as HTMLLabelElement | null;

function updateInputState(input: HTMLInputElement) {
  if (input.value.trim() !== "" && input.value !== "@" && input.value !== "+7") {
    input.classList.add("is-filled");
  } else {
    input.classList.remove("is-filled");
  }
}

function initInputStateHandlers(input: HTMLInputElement | null) {
  if (!input) return;

  input.addEventListener("focus", () => {
    input.classList.add("is-focused");
  });

  input.addEventListener("blur", () => {
    input.classList.remove("is-focused");
    updateInputState(input);
  });

  input.addEventListener("input", () => {
    updateInputState(input);
  });

  updateInputState(input);
}

initInputStateHandlers(modalNameInput);
initInputStateHandlers(contactInput);
initInputStateHandlers(modalPriceInput);

const modalPriceBtns = modalForm?.querySelectorAll("[data-price-btn]") as NodeListOf<HTMLButtonElement>;

modalPriceInput?.addEventListener("focus", () => {
  if (modalPriceLabel) {
    modalPriceLabel.textContent = "Отлично!";
  }
});

modalPriceInput?.addEventListener("blur", () => {
  if (modalPriceLabel) {
    modalPriceLabel.textContent =
      modalPriceInput?.value === "" ? "мин. стоимость  80.000" : "Отлично!";
  }
});

modalPriceBtns?.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (modalPriceInput && modalPriceLabel) {
      modalPriceInput.value = btn.dataset.priceBtn || "";
      modalPriceInput.classList.add("is-filled");
      formValidation.clearRow(e);
      modalPriceLabel.textContent = "Отлично!";
    }
    modalPriceBtns.forEach((item) => item.classList.remove("btn-active"));
    btn.classList.add("btn-active");
  });
});

const modal = document.querySelector("[data-modal]") as HTMLElement;

modal.addEventListener("scroll", () => {
  if (modal.scrollTop > 0 && modal.style.top !== "0px") {
    modal.style.top = "0px";
  } else if (modal.scrollTop === 0 && modal.style.top !== "100px") {
    modal.style.top = "100px";
  }
});

const sendBtn = document.querySelector("[data-modal-send]") as HTMLButtonElement | null;

modalForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const result = formValidation.validate(activeType);
  
  if (
    result?.name?.status &&
    result.contact?.status &&
    result.price?.status &&
    result.project?.status
  ) {
    sendData(formValidation.collectData(activeType))
   
    
  }
});
async function sendData(data: any) {
  const formBlock = document.querySelector(".modal__form") as HTMLElement;
  const successBlock = document.querySelector(".modal__succes") as HTMLElement;
  const heroModalTitle = modal.querySelector(".modal__hero-title") as HTMLElement;

  const scriptURL = "https://script.google.com/macros/s/AKfycbwKR6bpOgHc9fE1fR3N71UnUMF3bRDv-X0tkOlS6VD0WUshzbgJtFw51woKxEZt-HHd/exec";

  
  const payload = {
    secret: "evoasupersecretKey",
    name: data.name,
    activeType: data.activeType,
    contact: data.contact,
    project: data.project,
    price: data.price,
  };

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      modal.classList.add("succes");
      heroModalTitle.textContent =
        "Отлично! Мы внимательно ознакомимся с брифом и свяжемся с вами в ближайшее время.";

      formBlock.classList.add("fade-out");
      setTimeout(() => {
        formBlock.style.display = "none";
        successBlock.style.display = "flex";
        successBlock.classList.add("fade-in");
      }, 300);
    } else {
      throw new Error("Ошибка отправки");
    }
  } catch (error) {
    console.error(error);
    modal.classList.add("succes");
    heroModalTitle.textContent =
      "К сожалению, отправить заявку не получилось. Попробуйте связаться с нами через контакты.";

    formBlock.classList.add("fade-out");
    setTimeout(() => {
      formBlock.style.display = "none";
      successBlock.style.display = "flex";
      successBlock.classList.add("fade-in");
    }, 300);
  }
}