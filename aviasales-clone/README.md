# Aviasales Clone (MVP)

Простой клон Aviasales на Next.js (App Router) + TypeScript + Tailwind. 

## Запуск

1. Установите зависимости:

```bash
npm install
```

2. Запустите dev-сервер:

```bash
npm run dev
```

Откройте `http://localhost:3000`.

## Структура

- `src/app` — страницы и API маршруты (App Router)
- `src/components` — UI компоненты
- `src/lib/providers` — провайдеры поиска (сейчас мок)

## API

POST `/api/search` — принимает параметры поиска и возвращает список перелётов.