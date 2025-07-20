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

export const pluralize = (number, words) => {
  if (!words || words.length !== 3) {
    throw new Error('Необходимо передать 3 формы слова');
  }

  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return words[2];
  if (n1 > 1 && n1 < 5) return words[1];
  if (n1 === 1) return words[0];
  return words[2];
}