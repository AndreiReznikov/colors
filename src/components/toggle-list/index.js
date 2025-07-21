import { store } from '~store';
import { setFilters } from "~reducers/filters";

import ToggleList from './ToggleList';

const initializeToggleList = () => {
  const toggleListElementCollection = document
    .querySelectorAll('.toggle-list');

  toggleListElementCollection.forEach((element) => {
    const options = {
      onToggle: (value) => {
        store.dispatch(setFilters({ value }));
      },
    };

    new ToggleList(element, options);
  });
};

document.addEventListener('DOMContentLoaded', initializeToggleList);