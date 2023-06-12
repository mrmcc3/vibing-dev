<script>
  import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from "web-vitals";
  import { onMount } from "svelte";

  export let dsn;
  export let page;

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
      id: metric.id,
      page,
      href: location.href,
      event_name: metric.name,
      value: metric.value.toString(),
      speed: getConnectionSpeed(),
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
    onFID(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onLCP(sendToAnalytics);
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics);
  });
</script>
