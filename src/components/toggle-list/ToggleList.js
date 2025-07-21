const BLOCK_CLASS = 'toggle-list';

class ToggleList {
  constructor(element, options = {}) {
    this.rootElement = element;
    this.options = options;
    this._findElements();
    this._changeToggleStatus();
  }

  _changeToggleStatus() {
    this.toggleListElement
      .querySelectorAll('[data-element="toggle"]').forEach((toggle) => {
        toggle.addEventListener('click', (event) => {
          event.preventDefault();
          const toggleInput = event.currentTarget.querySelector('[data-element="toggleInput"');
          toggleInput.checked = !toggleInput.checked;
          this.options.onToggle?.(toggleInput.value);
        });
      })
  }

  _findElements() {
    this.toggleListElement = this.rootElement.querySelector(`.${BLOCK_CLASS}__list`);
  }
}

export default ToggleList;