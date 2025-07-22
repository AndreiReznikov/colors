import { Sheet } from '~components/sheet';

const initializeSheet = () => {
  const sheetElements = document.querySelectorAll('[data-element="toggleSheet"]');

  sheetElements.forEach((element) => {
    new Sheet(element);
  });
};

document.addEventListener('DOMContentLoaded', initializeSheet);