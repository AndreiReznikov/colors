import { toggleScroll } from "~utils/utils";

import Header from './Header';

const initializeHeader = () => {
  const header = new Header();
  header.init({ toggleScroll });
};

document.addEventListener('DOMContentLoaded', initializeHeader);