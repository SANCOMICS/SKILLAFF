import { Request, Response } from "express";
import { FapshiService } from "./service";

export const handleFapshiWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      transId,
      status,
      medium,
      serviceName,
      amount,
      revenue,
      payerName,
      email,
      redirectUrl,
      externalId,
      userId,
      webhook,
      financialTransId,
      dateInitiated,
      dateConfirmed,
    } = req.body;

    if (!transId || !status) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    await FapshiService.getInstance().handleWebhook({
      transId,
      status,
      medium,
      serviceName,
      amount,
      revenue,
      payerName,
      email,
      redirectUrl,
      externalId,
      userId,
      webhook,
      financialTransId,
      dateInitiated,
      dateConfirmed,
    });

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
};
