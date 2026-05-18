# Zabbix Server Installation on Ubuntu 24.04 (with MySQL Database)

## Purpose

Zabbix is used for monitoring the performance and changes on production servers, providing real-time visibility into infrastructure health and enabling proactive issue detection and resolution.

---

## 1. Download the Zabbix Server Package

Visit the Zabbix Download Page.

* Choose the correct version (e.g., Zabbix 7.0)
* Install the appropriate package for your system

---

## 2. Install Zabbix Agent 2

To install Zabbix Agent 2, follow the instructions in the Zabbix documentation.

---

## 3. Configure Zabbix Agent 2

Open the configuration file for editing:

```bash id="a1b2c3"
sudo nano /etc/zabbix/zabbix_agent2.conf
```

Modify the following settings:

```conf id="d4e5f6"
Server=<public-ip-of-zabbix-server>
ServerActive=<public-ip-of-zabbix-server>
Hostname=<hostname-of-the-agent-vm>
```

Save and close the file.

---

## 4. Restart and Check the Zabbix Agent 2 Status

Restart the agent:

```bash id="g7h8i9"
sudo systemctl restart zabbix-agent2
```

Check the agent status:

```bash id="j1k2l3"
sudo systemctl status zabbix-agent2
```

---

## 5. Add the Host in Zabbix Dashboard

1. Log in to the Zabbix Dashboard.
2. Go to **Monitoring > Hosts**.
3. Click the **Create Host** button.

Fill in the following fields:

* **Hostname**: Enter the name of the host
* **Visible Name**: Optional display name
* **Templates**:

  * `Template/Application Systemd by Agent 2`
  * `Template/OS Linux by Zabbix Agent Active`
* **Host Groups**:

  * `Linux Servers`
* **Interfaces**:

  * Click **Add**
  * Select **Agent**
  * Enter the public IP of the agent VM
* **Monitored by**:

  * Ensure the host is monitored by your Zabbix server

After completing the fields, click **Add** to create the host.
