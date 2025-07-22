export const SELECTOR_ITEMS = [
  {
    name: 'Сначала дорогие',
    value: 'price',
    order: 'desc',
  },
  {
    name: 'Сначала недорогие',
    value: 'price',
    order: 'asc',
  },
  {
    name: 'Сначала популярные',
    value: 'popularity',
    order: 'desc',
  },
  {
    name: 'Сначала новые',
    value: 'createdAt',
    order: 'desc',
  },
];

export const SLIDER_ITEMS = [
  { src: "../assets/img/colors.webp", alt: "Изображение вазы" },
  { src: "../assets/img/colors.webp", alt: "Изображение вазы" },
  { src: "../assets/img/colors.webp", alt: "Изображение вазы" },
  { src: "../assets/img/colors.webp", alt: "Изображение вазы" },
  { src: "../assets/img/colors.webp", alt: "Изображение вазы" },
  { src: "../assets/img/colors.webp", alt: "Изображение вазы" },
];

export const TOGGLE_ITEMS = [
  {
    text: "Новинки",
    value: "new",
  },
  {
    text: "Есть в наличии",
    value: "available",
  },
  {
    text: "Контрактные",
    value: "contract",
  },
  {
    text: "Эксклюзивные",
    value: "exclusive",
  },
  {
    text: "Распродажа",
    value: "sale",
  }
];

export const HEADER_OPTIONS = {
  number: "+7 (495) 221-77-69",
  phoneText: "Заказать звонок",
  menuItems: [
    {
      title: "Продукты",
      link: "/mock-address/change-me",
    },
    {
      title: "Цвета",
      link: "/mock-address/change-me",
    },
    {
      title: "Вдохновение",
      link: "/mock-address/change-me",
    },
    {
      title: "Советы",
      link: "/mock-address/change-me",
    },
    {
      title: "Найти магазин",
      link: "/mock-address/change-me",
    },
  ],
  icons: [
    {
      link: "/mock-address/change-me",
      src: "../assets/icons/search.svg",
      text: "Поиск",
    },
    {
      link: "/mock-address/change-me",
      src: "../assets/icons/profile.svg",
      text: "Профиль",
    },
    {
      link: "/mock-address/change-me",
      src: "../assets/icons/heart.svg",
      text: "Избранное",
    },
  ],
};