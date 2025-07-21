import ToggleList from './ToggleList';

const initializeToggleList = () => {
  const toggleList = new ToggleList();
  toggleList.init();
};

document.addEventListener('DOMContentLoaded', initializeToggleList);