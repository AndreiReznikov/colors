import { store } from "~store";
import { setSortType } from "~reducers/sort";
import { toggleScroll } from "~utils/utils";

import Selector from './Selector';

const initializeSelector = () => {
  const selectorElements = document.querySelectorAll('.selector');

  selectorElements.forEach((element) => {
    const options = {
      onOpen: () => toggleScroll(),
      onClose: () => toggleScroll(),
      onSelect: ({ order, value }) => {
        store.dispatch(setSortType({
          sortBy: value,
          order,
        }))
      },
    };

    new Selector(element, options);
  });
};

document.addEventListener('DOMContentLoaded', initializeSelector);