# EmailEngine Installation with Docker

This guide provides step-by-step instructions for setting up EmailEngine using Docker and Docker Compose.

---

## Purpose

EmailEngine is used for sending mass cold emailing campaigns which is utilized by product customers, providing a robust email infrastructure for managing bulk email delivery, SMTP/IMAP proxy, and email account management at scale.

---

## Overview

EmailEngine provides official Docker images for easy deployment:

- Pre-built images: Available on Docker Hub and GitHub Container Registry
- Multi-architecture: Supports AMD64 and ARM64 (Apple Silicon compatible)
- Self-contained: Includes all dependencies except Redis
- Production-ready: Suitable for containerized deployments

---

## Docker Compose Setup (Recommended)

### Quick Start with Official docker-compose.yml

Download and run the official configuration:

```bash
# Download official docker-compose.yml
curl -LO https://go.emailengine.app/docker-compose.yml

# Generate a secure encryption secret
echo "EENGINE_SECRET=$(openssl rand -hex 32)" > .env

# Start EmailEngine
docker-compose up -d
```

### What's Included

The official configuration includes:

- EmailEngine with API, SMTP, and IMAP proxy ports
- Redis with production settings and persistence
- Health checks and automatic restarts
- Environment variable configuration via `.env` file
- Logging with rotation and compression

### Access Points

After starting:

- Web UI & API: `http://localhost:3000`
- SMTP Server: `localhost:2525` (for message submission)
- IMAP Proxy: `localhost:9993` (optional IMAP access)

---

## Environment Configuration

Customize settings in `.env` file:

```env
# Required: Encryption secret (generate with: openssl rand -hex 32)
EENGINE_SECRET=your-generated-secret-here

# Recommended: Redis password for security
REDIS_PASSWORD=your-redis-password

# Optional: Version pinning (default: latest)
EMAILENGINE_VERSION=latest

# Optional: Custom port bindings (default: 127.0.0.1)
EMAILENGINE_API_BIND=0.0.0.0
EMAILENGINE_API_PORT=3000
EMAILENGINE_SMTP_BIND=0.0.0.0
EMAILENGINE_SMTP_PORT=2525
EMAILENGINE_IMAP_BIND=0.0.0.0
EMAILENGINE_IMAP_PORT=9993

# Optional: Performance tuning
EENGINE_WORKERS=4
EENGINE_LOG_LEVEL=info

# Optional: Restart policy
RESTART_POLICY=unless-stopped
```

---

## Production Deployment

### Production Environment Configuration

Create a production-ready `.env` file:

```env
# Required: Encryption secret (generate with: openssl rand -hex 32)
EENGINE_SECRET=your-generated-secret-here

# Recommended: Redis password for security
REDIS_PASSWORD=your-secure-redis-password

# Version pinning for stability
EMAILENGINE_VERSION=v2.57.0

# Bind to all interfaces (if behind reverse proxy)
EMAILENGINE_API_BIND=0.0.0.0
EMAILENGINE_SMTP_BIND=0.0.0.0
EMAILENGINE_IMAP_BIND=0.0.0.0

# Performance tuning (adjust based on server resources)
EENGINE_WORKERS=8
EENGINE_LOG_LEVEL=warn

# Automatic restart policy
RESTART_POLICY=unless-stopped
```

### Security Recommendations

1. **Use Redis password**: Set `REDIS_PASSWORD` for production
2. **Pin versions**: Specify exact versions (e.g., `EMAILENGINE_VERSION=v2.57.0`)
3. **Bind to localhost**: If using reverse proxy, keep default `127.0.0.1` binding
4. **Restrict access**: Use firewall rules to limit port access
5. **Enable TLS**: Use reverse proxy (Nginx/Caddy) with HTTPS

---

## Docker Images

### Available Tags

EmailEngine offers various tag types:

1. `latest`: Latest commit from the master branch (development builds)
2. `v2`: Latest tagged release (recommended for production)
3. `v2.x.x`: Specific version (e.g., `v2.55.4`) - pin to a specific release for maximum stability

### Image Sources

Docker Hub (primary):

```bash
docker pull postalsys/emailengine:v2
docker pull postalsys/emailengine:v2.55.4
```

GitHub Container Registry (alternative):

```bash
docker pull ghcr.io/postalsys/emailengine:v2
```

---

## Docker Commands

### Container Management

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# Start container
docker start emailengine

# Stop container
docker stop emailengine

# Restart container
docker restart emailengine

# Remove container
docker rm emailengine

# View logs
docker logs emailengine
docker logs -f emailengine  # Follow logs

# Last 100 lines
docker logs --tail 100 emailengine
```

### Image Management

```bash
# List images
docker images

# Pull latest tagged release
docker pull postalsys/emailengine:v2

# Pull specific version
docker pull postalsys/emailengine:v2.55.4

# Remove image
docker rmi postalsys/emailengine:v2

# Remove unused images
docker image prune
```

### Inspect Container

```bash
# View container details
docker inspect emailengine

# View environment variables
docker exec emailengine env

# Access container shell
docker exec -it emailengine sh

# Test health endpoint from inside container
docker exec emailengine curl -f http://localhost:3000/health
```

---

## Environment Variables

### Required Variables

```env
EENGINE_REDIS=redis://redis:6379
EENGINE_SECRET=your-secret-key-at-least-32-chars
```

### Optional Variables

```env
# Performance
EENGINE_WORKERS=4              # Number of worker processes

# API settings
EENGINE_PORT=3000              # HTTP port
EENGINE_HOST=0.0.0.0           # Bind address

# Logging
EENGINE_LOG_LEVEL=info         # trace, debug, info, warn, error, fatal, silent
EENGINE_LOG_RAW=false          # Log raw IMAP/SMTP traffic

# Max attachment size (default: 5MB)
EENGINE_MAX_SIZE=5M
```

---

## Volume Management

### Persistent Data

Redis data is stored in Docker volumes to persist across container restarts.

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect emailengine_redis-data

# Backup volume
docker run --rm -v emailengine_redis-data:/data -v $(pwd):/backup alpine tar czf /backup/redis-backup.tar.gz /data

# Restore volume
docker run --rm -v emailengine_redis-data:/data -v $(pwd):/backup alpine tar xzf /backup/redis-backup.tar.gz -C /
```
