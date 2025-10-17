# Каталог товаров

## Демо-версия проекта:

[GitHub Pages](https://andreireznikov.github.io/colors)

## Реализованные функции

- **Фильтрация** по типам товаров
- **Сортировка** по цене/дате/популярности (↑/↓)
- **Корзина**:
  - Добавление/удаление товаров
  - Изменение количества
  - Расчет стоимости
- **Адаптивные модальные окна** (корзина, фильтры, мобильное меню)
- **Загрузка данных** с MockAPI

## Технологии

- **Основные**:
  ![Pug](https://img.shields.io/badge/Pug-3.0.0-%23a86454)
  ![SCSS](https://img.shields.io/badge/SCSS-1.29.0-%23c6538c)
  ![ES6+](https://img.shields.io/badge/JavaScript-ES6+-%23f7df1e)

- **Библиотеки**:
  ![Glide.js](https://img.shields.io/badge/Glide.js-3.7.1-%2300d1b2)
  ![Axios](https://img.shields.io/badge/Axios-1.6.2-%235a29e4)

- **Сборка**:
  ![Webpack](https://img.shields.io/badge/Webpack-5.89.0-%238dd6f9)

## Запуск проекта

### Требования

- Node.js >= 18.x
- npm >= 9.x

### Установка

1. Клонируйте репозиторий:

```bash
  git clone https://github.com/AndreiReznikov/colors
  cd colors
```

2. Установите зависимости:

```bash
  npm install
```

3. Настройте MockAPI:

- Создайте файл .env в корне проекта
- Добавьте ваш API-ключ:

```env
  MOCK_API_SECRET=your_api_key_here
```

4. Команды

- npm run start — запуск dev-сервера
- npm run build — сборка для продакшена

