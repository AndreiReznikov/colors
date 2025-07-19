import { NON_SCROLLABLE_MODIFIER } from "~constants/constants";

export const formatPhone = (number = '') => {
  if (typeof number !== 'string') return;

  const phoneNumber = number ?? '';
  return phoneNumber.replace(/[^\d+]/g, '');
};

export const toggleScroll = () => {
  const htmlElement = document.documentElement;

  if (!htmlElement) return;

  const nonScrollableClass = Array.from(htmlElement.classList).find(className =>
    className.endsWith(NON_SCROLLABLE_MODIFIER)
  );

  if (nonScrollableClass) {
    return htmlElement.classList.remove(nonScrollableClass);
  }

  if (htmlElement.classList.length > 0) {
    const firstClass = htmlElement.classList[0];
    htmlElement.classList.add(`${firstClass}${NON_SCROLLABLE_MODIFIER}`);
  }
};