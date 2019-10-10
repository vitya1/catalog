# Сatalog ☄

Каталог товаров нового поколения, построенный на Bootstrap 4 и VueJs 

## Описание

Приложение состоит из 3-х компонентов:
- components/Catalog.vue- Листинг товаров
- components/Cart.vue - Корзина
- components/CurrencyManager.vue - Контрол для изменения курса доллара

Курс валюты и состояние корзины хранятся в Vuex (корзина еще и в localstorage).

### names.js
Исходил из того что файлы задания нельзя менять, поэтому чтобы использовать `names.js` приходилось выбирать из плохих решений (было выбрано плохое решение - програмно добавить < script scr="names.js">).

### Подсвечивание цен товаров
Цены на товары подвечиваются исходя из предыдущих цен, при циклической загрузке данных. При изменении курса цены не подсвечиваются. Курс валют можно изменять в специальном контроле вручную

## Запуск
Для запуска приложения достаточно использовать команду 
```
yarn serve

#или собрать c помощью и потом запустить
yarn build
```

Приложение переадресует запросы к api на 3000 порт (см. vue.config.js)

Для тестового backend сервера (который отдает data.json) можно использовать:
```
http-server ./data -p 3000

#Если http-server не установлен, сначала выполнить команду
npm install http-server -g
```

