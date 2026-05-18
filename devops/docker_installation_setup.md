# Docker Installation Guide for Ubuntu/Linux

This guide provides step-by-step instructions to install Docker and Docker Compose on Ubuntu Linux systems.

---

## Purpose

Docker is used to containerize and run multiple services of an application inside isolated Docker containers, enabling efficient resource management, scalability, and consistent deployment across different environments.

---

## Prerequisites

- Ubuntu or Debian-based Linux system
- `sudo` privileges
- Internet connectivity
- Terminal access

---

## Installation Steps

### Step 1: Update System Packages

Update the package index to ensure you have the latest package lists:

```bash
sudo apt update
sudo apt install ca-certificates curl
```

**What this does:**
- `apt update`: Refreshes the package cache
- `ca-certificates`: Installs SSL/TLS certificates for secure connections
- `curl`: Installs the curl utility for downloading files

---

### Step 2: Create APT Keyrings Directory

Create the directory for storing GPG keys:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

**What this does:**
- Creates `/etc/apt/keyrings` directory with permissions `0755`
- This directory will store Docker's GPG key for secure package verification

---

### Step 3: Download Docker's GPG Key

Download and install Docker's official GPG key:

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

**What this does:**
- Downloads Docker's GPG key from the official repository
- Saves it to `/etc/apt/keyrings/docker.asc`
- Sets read permissions for all users

---

### Step 4: Add Docker Repository

Add the official Docker repository to your APT sources:

```bash
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

**What this does:**
- Creates a new repository configuration file
- Automatically detects your Ubuntu version using `/etc/os-release`
- Adds Docker's stable channel as a trusted source

---

### Step 5: Update Package Index Again

Refresh the package cache to include Docker packages:

```bash
sudo apt update
```

---

### Step 6: Install Docker and Related Packages

Install Docker Engine and additional components:

```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

**What this installs:**
- `docker-ce`: Docker Community Edition (the main Docker engine)
- `docker-ce-cli`: Docker command-line interface
- `containerd.io`: Container runtime required by Docker
- `docker-buildx-plugin`: BuildKit support for advanced build features
- `docker-compose-plugin`: Docker Compose for multi-container applications

---

## Post-Installation Configuration

### Verify Installation

Check that Docker is installed correctly:

```bash
docker --version
docker run hello-world
```

---
