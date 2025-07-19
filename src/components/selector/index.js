import { toggleScroll } from "~utils/utils";

import Selector from './Selector';

const initializeSelector = () => {
  const selector = new Selector();
  selector.init({ toggleScroll });
};

document.addEventListener('DOMContentLoaded', initializeSelector);