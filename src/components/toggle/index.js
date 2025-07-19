import Toggle from './Toggle';

const initializeToggle = () => {
  const toggle = new Toggle();
  toggle.init();
};

document.addEventListener('DOMContentLoaded', initializeToggle);