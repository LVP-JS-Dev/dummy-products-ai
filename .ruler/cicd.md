# CI/CD Pipeline

## Обзор

Проект использует автоматический CI/CD для сборки и деплоя:

```text
Git Push → GitHub Actions → Docker Hub → Dokploy (VPS)
```

---

## Как работает CI/CD

### Pipeline Flow

1. **Push в `develop`** → GitHub Actions собирает образы → пушит в Docker Hub с тегом `:stage`
2. **Push в `master`** → то же самое, но с тегом `:prod`
3. **Тег `vX.Y.Z`** → собирает `:latest` + публикует npm-пакет `burlaki`

### Image Tags

| Trigger | Web Image | Docs Image | Latest Alias |
|---------|-----------|------------|--------------|
| `develop` push | `:stage-abc1234` | `:stage-abc1234` | `:stage` |
| `master` push | `:prod-abc1234` | `:prod-abc1234` | `:prod` |
| `v1.2.3` tag | `:v1.2.3` | `:v1.2.3` | `:latest` |

---

## Конфигурация

### GitHub Secrets (обязательно)

Настроить в **Settings → Secrets and variables → Actions**:

| Secret | Required | Description |
|--------|----------|-------------|
| `DOCKER_USERNAME` | ✅ | Docker Hub username |
| `DOCKER_TOKEN` | ✅ | Docker Hub access token (read/write/delete) |
| `NPM_TOKEN` | ⚪ | npm token для публикации burlaki |

### Fallback на Variables

`DOCKER_USERNAME` можно указать как Variable вместо Secret:

- Priority: `secrets.DOCKER_USERNAME` > `vars.DOCKER_USERNAME`
- Полезно если username не требует скрытности

### Пример конфигурации

См. `.github/.env.example` для шаблона.

---

## Типичный Workflow

### Разработка фичи

```bash
# 1. Создать ветку от develop
git checkout develop
git pull
git checkout -b feature/my-feature

# 2. Работать, коммитить
pnpm gen && pnpm test && pnpm check
git add . && git commit -m "feat: add my feature"

# 3. Создать PR в develop
gh pr create --base develop

# 4. После merge — CI автоматически соберёт :stage
```

### Релиз в production

```bash
# Вариант 1: Merge в master
git checkout master
git merge develop
git push origin master
# → CI соберёт :prod

# Вариант 2: Тег для версии
git tag v1.2.3
git push origin v1.2.3
# → CI соберёт :v1.2.3 и :latest, опубликует npm
```

### Ручной деплой (fallback)

Если CI недоступен:

```bash
docker login

GIT_SHA=$(git rev-parse --short HEAD)

# Web
docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/web.Dockerfile \
  -t your-username/dummy-products-web:stage-$GIT_SHA \
  -t your-username/dummy-products-web:stage \
  --push .

# Docs
docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/docs.Dockerfile \
  -t your-username/dummy-products-docs:stage-$GIT_SHA \
  -t your-username/dummy-products-docs:stage \
  --push .
```

---

## Файлы

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | CI/CD pipeline |
| `.github/.env.example` | Secrets/variables template |
| `deploy/docker/web.Dockerfile` | Web app build |
| `deploy/docker/docs.Dockerfile` | Docs app build |
| `deploy/docker-compose.stage.yml` | Staging compose |
| `deploy/docker-compose.prod.yml` | Production compose |
| `deploy/README.md` | Полная документация |

---

## Troubleshooting

### CI падает с "DOCKER_USERNAME not set"

Добавьте `DOCKER_USERNAME` и `DOCKER_TOKEN` в GitHub Secrets.

### Образ не подтягивается на VPS

1. Проверьте доступ Dokploy к Docker Hub
2. Убедитесь что тег совпадает с env переменными
3. Нажмите "Deploy" в Dokploy UI

### npm publish падает

`NPM_TOKEN` нужен только для релизов с тегами `v*`.

---

## Для новых разработчиков

### Первичная настройка

1. Получите доступ к GitHub репозиторию
2. Клонируйте и установите зависимости:
   ```bash
   git clone <repo>
   cd dummy-products
   pnpm install
   ```
3. Запустите dev: `pnpm dev`

### Как ваши изменения попадают на staging

1. Создаёте PR в `develop`
2. После approve и merge — CI автоматически собирает образы
3. Образы пушатся в Docker Hub с тегом `:stage`
4. Dokploy на VPS подтягивает и запускает

### Как попасть в production

1. Merge `develop` в `master` → автоматический деплой с тегом `:prod`
2. Или создайте тег `vX.Y.Z` для версии + npm publish

---

## Полная документация

См. `deploy/README.md` для детальной информации о:
- Dokploy setup
- Domain configuration
- Auto-deploy webhooks
- Architecture diagrams
