import { store } from "~store";
import { setFilters } from "~reducers/filters";

const BLOCK_CLASS = 'toggle-list';

class ToggleList {
  init() {
    this._findElements();
    this._setToggleState();
  }

  _findElements() {
    this.toggleListElement = document.querySelector(`.${BLOCK_CLASS}__list`);
  }

  _setToggleState() {
    this.toggleListElement
      .querySelectorAll('[data-element="toggle"]').forEach((toggle) => {
        toggle.addEventListener('click', (event) => {
          event.preventDefault();
          const toggleInput = event.currentTarget.querySelector('[data-element="toggleInput"');
          toggleInput.checked = !toggleInput.checked;
          store.dispatch(setFilters({ value: toggleInput.value }));
        });
      })
  }
}

export default ToggleList;