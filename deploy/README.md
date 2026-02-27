# Docker + Dokploy Deployment

## Обзор

```text
┌─────────────────┐     ┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│   Git Push      │────▶│ GitHub      │────▶│   Docker Hub    │────▶│  Dokploy    │
│   (develop/     │     │ Actions     │     │   Registry      │     │  (VPS)      │
│    master/tag)  │     │ (build)     │     │                 │     │             │
└─────────────────┘     └─────────────┘     └─────────────────┘     └─────────────┘
```

**Принцип:**
1. **GitHub Actions** — собирает Docker-образы и пушит в Docker Hub
2. **Dokploy** — pulls готовые образы с Docker Hub и запускает через docker-compose

---

## Quick Start для новых разработчиков

### Что происходит при пуше

| Trigger | Тег образов | Псевдоним |
|---------|-------------|-----------|
| Push в `develop` | `:stage-abc1234` | `:stage` |
| Push в `master` | `:prod-abc1234` | `:prod` |
| Тег `v1.2.3` | `:v1.2.3` | `:latest` |

### Типичный workflow

```bash
# 1. Работаете в feature-ветке
git checkout -b feature/my-feature

# 2. Делаете изменения
pnpm gen && pnpm test && pnpm check
git add . && git commit -m "feat: add my feature"

# 3. Создаёте PR в develop
gh pr create --base develop

# 4. После merge — CI автоматически соберёт и запушит образы
#    Docker Hub: <user>/dummy-products-web:stage
#    Docker Hub: <user>/dummy-products-docs:stage

# 5. В Dokploy нажимаете Redeploy → pulls свежие образы
```

### Релиз в production

```bash
# Merge develop в master
git checkout master
git merge develop
git push origin master

# CI соберёт :prod теги
# В Dokploy переключите IMAGE_TAG=prod и Redeploy
```

---

## GitHub Secrets (обязательно)

Настройте в **Settings → Secrets and variables → Actions**:

| Secret | Required | Description |
|--------|----------|-------------|
| `DOCKER_USERNAME` | ✅ | Docker Hub username |
| `DOCKER_TOKEN` | ✅ | Docker Hub access token (read/write/delete) |
| `NPM_TOKEN` | ⚪ | npm token для публикации burlaki (только для v*-тегов) |

### Как создать Docker Hub токен

1. https://hub.docker.com/settings/security
2. **New Access Token**
3. Permissions: **Read, Write, Delete**
4. Скопируйте токен (показывается один раз!)

---

## Файлы

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | CI/CD pipeline (build + push to Docker Hub) |
| `.github/.env.example` | Secrets template |
| `deploy/docker/web.Dockerfile` | Multistage build для `apps/web` (Vite → nginx) |
| `deploy/docker/docs.Dockerfile` | Multistage build для `apps/fumadocs` (Next.js standalone) |
| `deploy/docker-compose.yml` | Единый compose для Dokploy |

---

## Dokploy Setup

### 1. Создайте Compose приложение

| Field | Value |
|-------|-------|
| **Name** | `dummy-products` |
| **Source** | Manual (вставить compose) |

### 2. Вставьте compose

> **Важно:** В Dokploy при Manual compose нужно хардкодить Docker Hub username в образах. Env-переменные (`${DOCKER_USERNAME}`) не подставляются автоматически.

```yaml
name: dummy-products

services:
  web:
    image: lvpjsdev/dummy-products-web:stage
    restart: unless-stopped
    expose:
      - "80"
    networks:
      - app

  docs:
    image: lvpjsdev/dummy-products-docs:stage
    restart: unless-stopped
    environment:
      NODE_ENV: production
      HOSTNAME: 0.0.0.0
      PORT: "3000"
    expose:
      - "3000"
    networks:
      - app

networks:
  app:
    driver: bridge
```

Замените `lvpjsdev` на ваш Docker Hub username.

### 3. Deploy

Нажмите **Deploy** — Dokploy pulls образы с Docker Hub и запускает контейнеры.

### 4. Настройте Domains

| Service | Port | Domain Example |
|---------|------|----------------|
| `web` | 80 | `app.example.com` |
| `docs` | 3000 | `docs.example.com` |

### 5. Обновление

После успешного CI-билда:
1. Откройте Dokploy
2. Нажмите **Redeploy**
3. Dokploy pulls свежий образ с тегом `:stage` или `:prod`

---

## Переключение между Stage и Prod

### Вариант 1: Два отдельных приложения (рекомендуется)

Создайте два приложения в Dokploy:

**Staging:**
```yaml
image: lvpjsdev/dummy-products-web:stage
image: lvpjsdev/dummy-products-docs:stage
```

**Production:**
```yaml
image: lvpjsdev/dummy-products-web:prod
image: lvpjsdev/dummy-products-docs:prod
```

### Вариант 2: Одно приложение с ручным переключением

Измените тег в compose и нажмите Redeploy:

```yaml
# Stage
image: lvpjsdev/dummy-products-web:stage

# Production  
image: lvpjsdev/dummy-products-web:prod
```

---

## Ручной деплой (fallback)

Если CI недоступен:

```bash
docker login

GIT_SHA=$(git rev-parse --short HEAD)

# Web
docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/web.Dockerfile \
  -t <user>/dummy-products-web:stage-$GIT_SHA \
  -t <user>/dummy-products-web:stage \
  --push .

# Docs
docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/docs.Dockerfile \
  -t <user>/dummy-products-docs:stage-$GIT_SHA \
  -t <user>/dummy-products-docs:stage \
  --push .
```

---

## Troubleshooting

### CI падает с "DOCKER_USERNAME not set"

Добавьте `DOCKER_USERNAME` и `DOCKER_TOKEN` в GitHub Secrets.

### Образ не подтягивается в Dokploy

1. Проверьте что образ существует в Docker Hub
2. Убедитесь что тег в compose совпадает с тегом в Docker Hub
3. Нажмите "Redeploy" в Dokploy

### npm publish падает

`NPM_TOKEN` нужен только для релизов с тегами `v*`.

---

## Architecture

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                              DEVELOPER                                    │
│                                                                          │
│   git push origin develop                                                │
│          │                                                               │
└──────────┼───────────────────────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                           GITHUB ACTIONS                                  │
│                                                                          │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                  │
│   │ Checkout    │───▶│ pnpm build  │───▶│ docker build│                  │
│   └─────────────┘    └─────────────┘    └──────┬──────┘                  │
│                                               │                          │
└───────────────────────────────────────────────┼──────────────────────────┘
                                                │
                                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                            DOCKER HUB                                     │
│                                                                          │
│   <user>/dummy-products-web:stage-abc1234                               │
│   <user>/dummy-products-web:stage                                       │
│   <user>/dummy-products-docs:stage-abc1234                              │
│   <user>/dummy-products-docs:stage                                      │
│                                                                          │
└──────────────────────────────┬───────────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         DOKPLOY (VPS)                                     │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                    docker-compose.yml                             │   │
│   │                                                                   │   │
│   │   ┌─────────────┐         ┌─────────────┐                        │   │
│   │   │    web      │         │    docs     │                        │   │
│   │   │   (nginx)   │         │  (Next.js)  │                        │   │
│   │   │   port: 80  │         │  port: 3000 │                        │   │
│   │   └──────┬──────┘         └──────┬──────┘                        │   │
│   │          │                       │                                │   │
│   │          └───────────┬───────────┘                                │   │
│   │                      │                                            │   │
│   │              ┌───────▼───────┐                                    │   │
│   │              │   Traefik     │                                    │   │
│   │              │  (reverse     │                                    │   │
│   │              │   proxy)      │                                    │   │
│   │              └───────┬───────┘                                    │   │
│   └──────────────────────┼────────────────────────────────────────────┘   │
│                          │                                                │
└──────────────────────────┼────────────────────────────────────────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Users     │
                    │ (Internet)  │
                    └─────────────┘
```
