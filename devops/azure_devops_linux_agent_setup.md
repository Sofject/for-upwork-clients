# Azure DevOps Self-Hosted Linux Agent Setup for Ubuntu

## Overview
This guide provides step-by-step instructions for setting up a self-hosted Linux agent on Ubuntu and connecting it to Azure DevOps for deployment.

---

## Purpose

Azure DevOps with self-hosted agents is used for CI/CD deployment automation of production and staging environments, enabling controlled and streamlined application deployments across different infrastructure environments.

---

## Prerequisites for Ubuntu

### Supported Ubuntu Versions
- Ubuntu 24.04, 22.04, 20.04 (x64)
- Ubuntu 24.04, 22.04, 20.04 (ARM64)

### Required Software

1. **Git** - Version 2.9.0 or higher (latest version recommended)
   ```bash
   sudo apt-get update
   sudo apt-get install git
   ```

2. **.NET 8** - The agent software runs on .NET 8 and installs its own version, so no .NET prerequisite is needed

3. **Additional Dependencies** - Install using the provided script after downloading the agent:
   ```bash
   ./bin/installdependencies.sh
   ```

### Optional Software
- **Subversion** - If building from Subversion repos
- **Java JDK 1.6+** - If using TFVC repos

---

## Prepare Permissions

### User Requirements
- The user configuring the agent needs **pool admin permissions**
- The user running the agent does **not** need admin permissions
- Create a dedicated user for running the agent (different from the configuration user)

### Check Your Permissions

1. Sign in to your Azure DevOps organization: `https://dev.azure.com/{yourorganization}`
2. Go to **Azure DevOps** > **Organization settings** > **Agent pools**
3. Select the pool and click **Security**
4. Verify your user account is listed as an agent pool administrator
5. If not listed, ask an organization owner or administrator to add you

---

## Download and Configure the Agent

### Step 1: Access Agent Download Page

1. Sign in to Azure Pipelines: `https://dev.azure.com/{yourorganization}`
2. Navigate to **Azure DevOps** > **Organization settings** > **Agent pools**
3. Select the **Default** pool (or your preferred pool)
4. Go to the **Agents** tab and click **New agent**

### Step 2: Download the Agent

1. Select **Linux** from the OS options
2. Choose your architecture:
   - **x64** for 64-bit systems
   - **ARM** for ARM-based systems
3. Click **Download**

### Step 3: Prepare the Agent Directory

```bash
# Extract the agent to your desired location
mkdir -p ~/myagent
cd ~/myagent
tar zxvf ~/Downloads/vsts-agent-linux-x64-*.tar.gz
```

### Step 4: Configure the Agent

```bash
cd ~/myagent
./config.sh
```

During configuration, you'll be prompted for:

#### Server URL
```
https://dev.azure.com/{your-organization}
```

#### Authentication Type
Choose one of the following:

**Option 1: Personal Access Token (PAT)** - Recommended
- Generate a PAT in Azure DevOps with agent pool read/manage scope
- Enter your PAT when prompted

**Option 2: Device Code Flow**
- Follow the device code flow authentication process

**Option 3: Service Principal**
- Use Azure service principal credentials

#### Agent Configuration Details
- **Agent name** - Give your agent a descriptive name (e.g., `ubuntu-agent-01`)
- **Work directory** - Default is `_work` (recommended for most cases)
- **Pool** - Select Default or your preferred pool

---

## Running the Agent

### Option 1: Run Interactively (For Testing)

```bash
cd ~/myagent
./run.sh
```

To stop the agent, press `Ctrl+C`

### Option 2: Run as a Systemd Service (Recommended for Deployment)

#### Install the Service

```bash
cd ~/myagent
sudo ./svc.sh install [username]
```

Example:
```bash
sudo ./svc.sh install ubuntu
```

If username is not specified, it uses the `$SUDO_USER` environment variable.

#### Start the Service

```bash
sudo ./svc.sh start
```

#### Check Service Status

```bash
sudo ./svc.sh status
```

#### Stop the Service

```bash
sudo ./svc.sh stop
```

#### Uninstall the Service

```bash
sudo ./svc.sh uninstall
```

### Update Environment Variables

If you install new software after starting the service:

```bash
cd ~/myagent
./env.sh
sudo ./svc.sh stop
sudo ./svc.sh start
```

---

## Service Configuration

### Service File Location

The systemd service file is created at:
```
/etc/systemd/system/vsts.agent.{organization}.{agent-name}.service
```

Example:
```
/etc/systemd/system/vsts.agent.fabrikam.ubuntu-agent-01.service
```

### Custom Instructions Before Service Start

To run custom setup commands when the service starts:

1. Edit the `runsvc.sh` file:
   ```bash
   nano ~/myagent/runsvc.sh
   ```

2. Replace this section:
   ```bash
   # insert anything to setup env when running as a service
   ```

3. Add your custom commands (environment setup, script execution, etc.)

---

## Connecting to Azure DevOps for Deployment

### Verify Agent is Online

1. In Azure DevOps, go to **Agent pools**
2. Select your pool
3. Click the **Agents** tab
4. Verify your agent appears and shows as **Enabled** and online (green checkmark)

### Using the Agent in Pipelines

To use your self-hosted agent in a deployment pipeline, specify it in your YAML:

```yaml
trigger:
  - main

pool:
  name: Default
  demands:
  - agent.name -equals ubuntu-agent-01

jobs:
  - job: Deploy
    steps:
      - script: echo Hello from self-hosted agent
        displayName: 'Test Step'
```

Or use the pool directly:

```yaml
pool:
  name: Default

jobs:
  - job: DeployJob
    displayName: Deploy on Self-Hosted Agent
    steps:
      - task: CmdLine@2
        inputs:
          script: 'echo Deploying application'
```

### Agent Capabilities

The agent automatically detects and reports its capabilities:
- Installed software (Git, Node.js, Python, etc.)
- Environment variables
- System properties

To view agent capabilities:
1. Go to **Agent pools** > Select pool > **Agents** tab
2. Click the agent name
3. View the **Capabilities** tab

---

## Troubleshooting

### Run Diagnostics

```bash
cd ~/myagent
./run.sh --diagnostics
```

This helps identify connectivity and configuration issues.

---

## Uninstall and Remove Agent

### If Running as Service

```bash
cd ~/myagent
sudo ./svc.sh stop
sudo ./svc.sh uninstall
```

### Remove Agent Registration

```bash
cd ~/myagent
./config.sh remove
```

Enter your credentials when prompted.
