import CardList from './CardList';

const initializeCardList = () => {
  const cardList = new CardList();
  cardList.init();
};

document.addEventListener('DOMContentLoaded', initializeCardList);