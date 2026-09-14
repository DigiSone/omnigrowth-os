import { onRequestPost as __api_lead_engine_js_onRequestPost } from "/content/omnigrowth-os/functions/api/lead-engine.js"

export const routes = [
    {
      routePath: "/api/lead-engine",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_lead_engine_js_onRequestPost],
    },
  ]