
# Prometheus + Grafana Setup (Quick)

## Purpose

Prometheus and Grafana are used to collect, monitor, and visualize server and application metrics so we can track system health, detect issues early, and make performance decisions from dashboards.

---

## 1. Install Prometheus and Node Exporter

Download:

- Prometheus: https://prometheus.io/download/#prometheus
- Node Exporter: https://prometheus.io/download/#node_exporter

Install and start Node Exporter on the host you want to monitor, then verify:

```bash
curl http://localhost:9100/metrics
```

## 2. Configure Prometheus

Extract and enter Prometheus directory:

```bash
tar xvfz prometheus-*.tar.gz
cd prometheus-*
```

Update `prometheus.yml` with Node Exporter target:

```yaml
scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
```

Start Prometheus:

```bash
./prometheus --config.file=./prometheus.yml
```

Verify Prometheus UI:

- http://localhost:9090

## 3. Connect Prometheus to Grafana

Install/run Grafana (local) or use Grafana Cloud.

In Grafana:

1. Go to `Connections` -> `Data sources`
2. Add `Prometheus`
3. URL:
- Local Prometheus: `http://localhost:9090`
4. Click `Save & test`

## 4. Validate Metrics in Grafana

Open `Explore` (or Metrics Drilldown), select the Prometheus data source, and run a test query such as:

```promql
up
```

If targets are healthy, you can start building dashboards.
