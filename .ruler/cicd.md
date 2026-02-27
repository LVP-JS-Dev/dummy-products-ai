# CI/CD Pipeline

## Обзор

```text
Git Push → GitHub Actions (build) → Docker Hub → Dokploy (deploy)
```

**Принцип:**
- **GitHub Actions** — собирает Docker-образы и пушит в Docker Hub
- **Dokploy** — pulls готовые образы с Docker Hub (без клонирования репозитория)

---

## Как работает CI/CD

### Pipeline Flow

| Trigger | Тег образов | Псевдоним |
|---------|-------------|-----------|
| Push в `develop` | `:stage-abc1234` | `:stage` |
| Push в `master` | `:prod-abc1234` | `:prod` |
| Тег `v1.2.3` | `:v1.2.3` | `:latest` |

---

## Конфигурация

### GitHub Secrets (обязательно)

Настроить в **Settings → Secrets and variables → Actions**:

| Secret | Required | Description |
|--------|----------|-------------|
| `DOCKER_USERNAME` | ✅ | Docker Hub username |
| `DOCKER_TOKEN` | ✅ | Docker Hub access token (read/write/delete) |
| `NPM_TOKEN` | ⚪ | npm token для публикации burlaki (только для v*-тегов) |

### Пример конфигурации

См. `.github/.env.example` для шаблона.

---

## Файлы

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | CI/CD pipeline (build + push) |
| `.github/.env.example` | Secrets template |
| `deploy/docker/web.Dockerfile` | Web app build (Vite → nginx) |
| `deploy/docker/docs.Dockerfile` | Docs app build (Next.js standalone) |
| `deploy/docker-compose.yml` | Единый compose для Dokploy |
| `deploy/README.md` | Полная документация для разработчиков |

---

## Типичный Workflow

### Разработка фичи

```bash
# 1. Создать ветку от develop
git checkout develop && git pull
git checkout -b feature/my-feature

# 2. Работать, проверить
pnpm gen && pnpm test && pnpm check
git add . && git commit -m "feat: add my feature"

# 3. Создать PR в develop
gh pr create --base develop

# 4. После merge — CI собирает :stage
# 5. В Dokploy: Redeploy → pulls свежий образ
```

### Релиз в production

```bash
# Merge в master
git checkout master
git merge develop
git push origin master

# CI собирает :prod
# В Dokploy: сменить тег на :prod и Redeploy
```

---

## Dokploy Setup

### 1. Создать Compose приложение

- **Name:** `dummy-products`
- **Source:** Manual (вставить compose)

### 2. Compose для вставки

> **Важно:** Хардкодите Docker Hub username в образах. Env-переменные не подставляются в Manual compose.

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

### 3. Обновление

После CI-билда: **Redeploy** в Dokploy → pulls свежий образ.

---

## Ручной деплой (fallback)

```bash
docker login
GIT_SHA=$(git rev-parse --short HEAD)

# Web
docker buildx build --platform linux/amd64 \
  -f deploy/docker/web.Dockerfile \
  -t <user>/dummy-products-web:stage-$GIT_SHA \
  -t <user>/dummy-products-web:stage \
  --push .

# Docs
docker buildx build --platform linux/amd64 \
  -f deploy/docker/docs.Dockerfile \
  -t <user>/dummy-products-docs:stage-$GIT_SHA \
  -t <user>/dummy-products-docs:stage \
  --push .
```

---

## Troubleshooting

| Проблема | Решение |
|----------|---------|
| `DOCKER_USERNAME not set` | Добавить в GitHub Secrets |
| Образ не pulls в Dokploy | Проверить тег, нажать Redeploy |
| npm publish падает | `NPM_TOKEN` нужен только для v*-тегов |

---

## Полная документация

См. `deploy/README.md` для:
- Детальной настройки Dokploy
- Domain configuration
- Architecture diagrams
