# Redis Installation on Linux

This guide provides step-by-step instructions for installing Redis on Linux systems (Ubuntu/Debian, Red Hat/Rocky, and using Snap).

---

## Purpose

Redis is used inside the product multiple times for caching, providing fast in-memory data storage to improve application performance, reduce database load, and enable efficient session management and data retrieval.

---

## Installation Steps

### Option 1: Install on Ubuntu/Debian

Add the repository to the APT index, update it, and install Redis:

```bash
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis
```

Redis will start automatically, and it should restart at boot time. If Redis doesn't start across reboots, you may need to manually enable it:

```bash
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

---

### Option 2: Install on Red Hat/Rocky

```bash
sudo yum install redis
sudo systemctl enable redis
sudo systemctl start redis
```

Redis will restart at boot time.

---

## Starting and Stopping Redis

### Using systemctl (Ubuntu/Debian with apt, or Red Hat/Rocky with yum)

Start the Redis server:

```bash
sudo systemctl start redis-server  # or 'redis' for Red Hat/Rocky
```

Stop the server:

```bash
sudo systemctl stop redis-server  # or 'redis' for Red Hat/Rocky
```

---

## Connect to Redis

Once Redis is running, you can test it by running `redis-cli`:

```bash
redis-cli
```

Test the connection with the `ping` command:

```bash
127.0.0.1:6379> ping
PONG
```
