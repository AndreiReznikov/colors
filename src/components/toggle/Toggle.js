const BLOCK_CLASS = 'toggle';

class Toggle {
  init(options = {}) {
    this._findElements();
    this._addEventListeners(options);
  }

  _findElements() {
    this.toggleInputElementCollection = document.querySelectorAll(`.${BLOCK_CLASS}__input`);
  }

  _addEventListeners(options) {
    this.toggleInputElementCollection.forEach((toggleElement) => {
      toggleElement.addEventListener('change',
        (event) => options.onChange?.(event),
      );
    });
  }
}

export default Toggle;