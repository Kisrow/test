# Aiti Guru — Test Task (React)

Приложение с авторизацией и экраном товаров (таблица + поиск + сортировка + добавление).

## Стек

- React 18 + TypeScript  
- Vite  
- Mantine (+ Notifications)  
- React Router  
- TanStack Query  
- React Hook Form + Zod  
- Tabler Icons  

---

## Функционал

### Авторизация
- Валидация формы (RHF + Zod)
- Отображение ошибки API
- Remember me:
  - включён → токен сохраняется в `localStorage`
  - выключен → токен сохраняется в `sessionStorage`

### Товары
- Загрузка данных из DummyJSON
- Таблица: название / вендор / артикул / рейтинг / цена / количество
- Сортировка по колонкам
- Поиск через API
- Рейтинг < 3 подсвечивается красным

### Добавление товара
- Открытие формы по кнопке
- Имитация сохранения (без реального POST-запроса)
- Toast-уведомление об успехе

---

## Установка и запуск

### Установка
```bash
npm install
```

### Запуск в dev-режиме
```bash
npm run dev
```

### Сборка
```bash
npm run build
```

### Preview сборки
```bash
npm run preview
```
