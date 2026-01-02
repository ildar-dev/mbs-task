# mbs-task – тестовая задача по [требованиям](https://maxbitsolution.com/frontend/technical_task/)

## Скрипты

- `npm run dev` — локальная разработка
- `npm run build` — сборка продакшен
- `npm run preview` — предпросмотр сборки
- `npm run backend:install` — установка зависимостей бэкенда (сабмодуль)
- `npm run backend:start` — запуск Cinema Backend API на `http://localhost:3022`

## Запуск

```bash
npm install
npm run dev
```

## Backend (сабмодуль)

Бэкенд для кино — подключён как сабмодуль: `cinema-backend-api`  
[maxbit-solution/frontend_technical_task](https://github.com/maxbit-solution/frontend_technical_task)

Запуск (из корня проекта):
```bash
npm run backend:install
npm run backend:start
```

## Переменные окружения

Приложение читает переменные из файлов `.env*`. Для доступа в клиентском коде используйте префикс `VITE_`.

- URL бэкенда (по умолчанию `http://localhost:3022`):
  - переменная: `VITE_BACKEND_URL`
  - в коде доступно через `import.meta.env.VITE_BACKEND_URL` или `src/config.ts` (`backendUrl`)
