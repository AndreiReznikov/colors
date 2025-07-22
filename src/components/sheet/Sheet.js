import { VISIBLE_MODIFIER } from "~constants/constants";

const BLOCK_CLASS = 'sheet';

class Sheet {
  constructor(element, options = {}) {
    this.rootElement = element;
    this.options = options;
    this._findElements();
    this._addEventListeners();
  }

  _findElements() {
    this.sheetElement = this.rootElement.querySelector(`.${BLOCK_CLASS}`);
    this.sheetWrapperElement = this.rootElement.querySelector(`.${BLOCK_CLASS}__wrapper`);
    this.scrimElement = this.rootElement.querySelector(`.${BLOCK_CLASS}__scrim`);
  }

  _handleCloseSheet() {
    const classes = Array.from(this.rootElement.classList);
    const visibleClass = classes.find(className => className.includes(VISIBLE_MODIFIER));

    if (visibleClass) {
      this.rootElement.classList.remove(visibleClass);
    }

    this.options.onClose?.();
  }

  _clickOutsideSheet(event) {
    const clickInside = this.sheetWrapperElement.contains(event.target);

    if (!clickInside) {
      this._handleCloseSheet();
    }
  }

  _addEventListeners() {
    this.scrimElement.addEventListener('click',
      (event) => this._clickOutsideSheet(event),
    );
  }
}

export default Sheet;