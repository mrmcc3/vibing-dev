<script>
  import { onCLS, onFCP, onFID, onLCP, onTTFB } from "web-vitals";
  import { onMount } from "svelte";

  export let dsn;

  const vitalsUrl = "https://vitals.vercel-analytics.com/v1/vitals";

  function getConnectionSpeed() {
    return "connection" in navigator &&
      navigator["connection"] &&
      "effectiveType" in navigator["connection"]
      ? navigator["connection"]["effectiveType"]
      : "";
  }
  function sendToAnalytics(metric) {
    const body = {
      dsn,
      id: metric.id, // v2-1653884975443-1839479248192
      href: location.href, // https://my-app.vercel.app/blog/my-test
      event_name: metric.name, // TTFB
      value: metric.value.toString(), // 60.20000000298023
      speed: getConnectionSpeed(), // 4g
    };
    const blob = new Blob([new URLSearchParams(body).toString()], {
      type: "application/x-www-form-urlencoded",
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(vitalsUrl, blob);
    } else {
      fetch(vitalsUrl, {
        body: blob,
        method: "POST",
        credentials: "omit",
        keepalive: true,
      });
    }
  }

  onMount(() => {
    try {
      onFID(sendToAnalytics);
      onTTFB(sendToAnalytics);
      onLCP(sendToAnalytics);
      onCLS(sendToAnalytics);
      onFCP(sendToAnalytics);
    } catch (err) {
      console.error("[Analytics]", err);
    }
  });
</script>
