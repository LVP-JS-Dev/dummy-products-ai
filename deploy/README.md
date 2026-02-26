# Docker + Dokploy Deployment

This setup is designed for:

- CI builds in GitHub Actions
- Push images to Docker Hub
- Deploy to VPS via Dokploy with docker-compose

---

## Quick Start for New Developers

### Как работает CI/CD

```
┌─────────────────┐     ┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│   Git Push      │────▶│ GitHub      │────▶│   Docker Hub    │────▶│  Dokploy    │
│   (develop/     │     │ Actions     │     │   Registry      │     │  (VPS)      │
│    master/tag)  │     │ (build)     │     │                 │     │             │
└─────────────────┘     └─────────────┘     └─────────────────┘     └─────────────┘
```

**Что происходит при пуше:**

1. **Push в `develop`** → GitHub Actions собирает Docker-образы → пушит в Docker Hub с тегом `:stage`
2. **Push в `master`** → то же самое, но с тегом `:prod`
3. **Тег `vX.Y.Z`** → собирает `:latest` + публикует npm-пакет `burlaki`

Dokploy на VPS подтягивает образы из Docker Hub и запускает их через docker-compose.

### Типичный workflow разработки

```bash
# 1. Работаете в ветке
git checkout -b feature/my-feature

# 2. Делаете изменения, коммитите
git add . && git commit -m "feat: add my feature"

# 3. Создаёте PR в develop
gh pr create --base develop

# 4. После merge в develop — CI автоматически соберёт и запушит образы
#    Docker Hub: your-username/dummy-products-web:stage
#    Docker Hub: your-username/dummy-products-docs:stage

# 5. Dokploy автоматически деплоит staging (если настроен webhook)
#    или деплой вручную через UI Dokploy
```

### Релиз в production

```bash
# 1. Merge develop в master
git checkout master
git merge develop
git push origin master

# 2. CI собирает :prod теги
#    Docker Hub: your-username/dummy-products-web:prod
#    Docker Hub: your-username/dummy-products-docs:prod

# 3. Деплой через Dokploy

# ИЛИ для версии с npm-пакетом:
git tag v1.2.3
git push origin v1.2.3
# CI соберёт :v1.2.3 и :latest, опубликует burlaki в npm
```

### Ручной деплой (если CI недоступен)

```bash
# Логин в Docker Hub
docker login

GIT_SHA=$(git rev-parse --short HEAD)

# Собрать и запушить web
docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/web.Dockerfile \
  -t your-username/dummy-products-web:stage-$GIT_SHA \
  -t your-username/dummy-products-web:stage \
  --push .

# Собрать и запушить docs
docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/docs.Dockerfile \
  -t your-username/dummy-products-docs:stage-$GIT_SHA \
  -t your-username/dummy-products-docs:stage \
  --push .

# Затем в Dokploy: Deploy → Pull latest images
```

---

## Configuration

### Required GitHub Secrets

Настройте в **Settings → Secrets and variables → Actions**:

| Secret | Required | Description |
|--------|----------|-------------|
| `DOCKER_USERNAME` | ✅ | Docker Hub username |
| `DOCKER_TOKEN` | ✅ | Docker Hub access token (read/write/delete) |
| `NPM_TOKEN` | ⚪ | npm token для публикации burlaki (только для релизов) |

> **Note:** `DOCKER_USERNAME` можно указать как Variable вместо Secret, если не требует скрытности.
> См. `.github/.env.example` для примера конфигурации.

### Как создать Docker Hub токен

1. Откройте https://hub.docker.com/settings/security
2. Нажмите **New Access Token**
3. Выберите permissions: **Read, Write, Delete**
4. Скопируйте токен (показывается только один раз!)

### Как создать npm токен

1. Откройте https://www.npmjs.com/settings/tokens
2. Нажмите **Generate New Token** → **Classic Token**
3. Выберите тип **Automation**
4. Скопируйте токен

---

## Files

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | CI/CD pipeline (build + push) |
| `.github/.env.example` | Secrets/variables template |
| `deploy/docker/web.Dockerfile` | Multistage build для `apps/web` (Vite → nginx) |
| `deploy/docker/docs.Dockerfile` | Multistage build для `apps/fumadocs` (Next standalone) |
| `deploy/docker-compose.stage.yml` | Staging compose config |
| `deploy/docker-compose.prod.yml` | Production compose config |
| `deploy/.env.stage.example` | Stage environment template |
| `deploy/.env.prod.example` | Production environment template |

---

## Image Tags

| Trigger | Web Image | Docs Image | Latest Alias |
|---------|-----------|------------|--------------|
| `develop` push | `:stage-abc1234` | `:stage-abc1234` | `:stage` |
| `master` push | `:prod-abc1234` | `:prod-abc1234` | `:prod` |
| `v1.2.3` tag | `:v1.2.3` | `:v1.2.3` | `:latest` |

---

## Dokploy Setup

### 1. Add Docker Hub Registry

Dokploy → Settings → Registries → Add Docker Hub:
- Username: ваш Docker Hub username
- Password: ваш Docker Hub access token

### 2. Create Projects

| Project | Compose File | Purpose |
|---------|--------------|---------|
| `dummy-products-stage` | `docker-compose.stage.yml` | Staging environment |
| `dummy-products-prod` | `docker-compose.prod.yml` | Production environment |

### 3. Environment Variables

**Stage:**
```env
WEB_IMAGE=your-username/dummy-products-web:stage
DOCS_IMAGE=your-username/dummy-products-docs:stage
```

**Production:**
```env
WEB_IMAGE=your-username/dummy-products-web:prod
DOCS_IMAGE=your-username/dummy-products-docs:prod
```

### 4. Domains

| Service | Port | Domain Example |
|---------|------|----------------|
| `web` | 80 | `stage.example.com`, `example.com` |
| `docs` | 3000 | `docs-stage.example.com`, `docs.example.com` |

### 5. Auto-Deploy (Optional)

В Dokploy можно настроить webhook для автоматического деплоя при появлении новых образов в Docker Hub.

---

## Troubleshooting

### CI падает с ошибкой авторизации

```
Error: DOCKER_USERNAME not set
```

**Решение:** Добавьте `DOCKER_USERNAME` и `DOCKER_TOKEN` в GitHub Secrets.

### Образ не подтягивается на VPS

**Решение:**
1. Проверьте что Dokploy имеет доступ к Docker Hub registry
2. Убедитесь что тег образа совпадает с `WEB_IMAGE`/`DOCS_IMAGE` в env
3. Нажмите "Deploy" в Dokploy UI

### npm publish падает

```
Error: NPM_TOKEN not set
```

**Решение:** Добавьте `NPM_TOKEN` в GitHub Secrets (нужен только для релизов с тегами `v*`).

---

## Architecture

```
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
│   your-username/dummy-products-web:stage-abc1234                        │
│   your-username/dummy-products-web:stage                                │
│   your-username/dummy-products-docs:stage-abc1234                       │
│   your-username/dummy-products-docs:stage                               │
│                                                                          │
└──────────────────────────────┬───────────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         DOKPLOY (VPS)                                     │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                    docker-compose.stage.yml                       │   │
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
