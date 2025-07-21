import { toggleScroll } from "~utils/utils";

import Selector from './Selector';

const initializeSelector = () => {
  const selectorElements = document.querySelectorAll('.selector');

  selectorElements.forEach((element) => {
    const options = {
      onAction: () => toggleScroll(),
      onClick: () => toggleScroll(),
      onClose: () => toggleScroll(),
    };

    new Selector(element, options);
  });
};

document.addEventListener('DOMContentLoaded', initializeSelector);