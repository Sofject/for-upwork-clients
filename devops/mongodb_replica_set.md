# MongoDB Replica Set Setup

This guide explains how to configure a MongoDB replica set with a **Primary** and **Secondary** node across two VMs. Because apparently one database server suffering alone wasn’t enough for humanity, so now we replicate the suffering across machines.

---

## Purpose

MongoDB Replica Set is used to migrate data from one database to another database on a different server while the primary database remains live and operational, enabling zero-downtime data migration without disrupting production operations.

---

## Prerequisites

* Two VMs with MongoDB installed
* Network connectivity between both VMs
* MongoDB service running on both servers
* Access to `sudo` privileges

---

# Step 1: Configure MongoDB for Replication

Edit the MongoDB configuration file on **both VMs**.

### File Location

```bash
/etc/mongod.conf
```

Add the following configuration:

```yaml
replication:
  replSetName: "rs0"
```

This enables replication and assigns the replica set name as `rs0`.

---

# Step 2: Restart MongoDB Service

Run the following command on **both VMs** to apply the configuration changes:

```bash
sudo systemctl restart mongod
```

You can also verify the service status:

```bash
sudo systemctl status mongod
```

Because nothing builds character like debugging a MongoDB service that silently refused to restart.

---

# Step 3: Initialize the Replica Set

Connect to the **primary MongoDB instance** using `mongosh`:

```bash
mongosh
```

Run the following command to initialize the replica set:

```javascript
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "PRIMARY_IP:27017" },
    { _id: 1, host: "SECONDARY_IP:27017", priority: 0 }
  ]
})
```

Replace:

* `PRIMARY_IP` → Primary VM IP address
* `SECONDARY_IP` → Secondary VM IP address

### Example

```javascript
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "192.168.1.10:27017" },
    { _id: 1, host: "192.168.1.11:27017", priority: 0 }
  ]
})
```

Setting `priority: 0` ensures the secondary node does not become primary during elections.

---

# Step 4: Verify Replica Set Status

Run the following command in the MongoDB shell:

```javascript
rs.status()
```

This displays:

* Replica set health
* Current primary node
* Secondary node status
* Replication state information

---

# Optional: Check Replica Set Configuration

To view the current replica set configuration:

```javascript
rs.conf()
```

---

# Expected Replica Set States

| Node Type | Expected State |
| --------- | -------------- |
| Primary   | `PRIMARY`      |
| Secondary | `SECONDARY`    |

---

# Useful Commands

### Check Current Replica Set Name

```javascript
db.adminCommand({ getCmdLineOpts: 1 })
```

### View Replication Info

```javascript
rs.printReplicationInfo()
```

### View Secondary Replication Info

```javascript
rs.printSecondaryReplicationInfo()
```

---

# Troubleshooting

## MongoDB Service Not Starting

Check logs:

```bash
sudo journalctl -u mongod
```

Or:

```bash
sudo tail -f /var/log/mongodb/mongod.log
```

---

## Replica Set Connection Issues

Ensure:

* Port `27017` is open between VMs
* MongoDB is listening on the correct IP
* Firewall rules allow access

You may need to update:

```yaml
bindIp: 0.0.0.0
```

Inside `/etc/mongod.conf` if external connections are required. Which is both useful and a fantastic way to accidentally expose your database to the internet if you skip firewall rules. Modern infrastructure: one typo away from disaster.

---
