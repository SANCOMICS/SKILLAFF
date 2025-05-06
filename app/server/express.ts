import express from "express";
import { handleFapshiWebhook } from "@/core/payment/fapshi/webhook";

export const setupExpress = (app: express.Application) => {
  // ... existing code ...

  // Fapshi webhook endpoint
  app.post("/api/webhooks/fapshi", express.json(), handleFapshiWebhook);

  // ... rest of the code ...
};
