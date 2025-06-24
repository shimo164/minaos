const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require("dotenv").config();


const REGION = process.env.FUNCTION_REGION || "asia-east1";
const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

exports.verifyRecaptcha = onRequest(
  { region: REGION },
  async (request, response) => {
    const token = request.body.token;
    if (!token) {
      logger.warn("No reCAPTCHA token provided");
      return response.status(400).send("❌ No reCAPTCHA token provided");
    }

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const params = new URLSearchParams();
    params.append('secret', SECRET_KEY);
    params.append('response', token);
    params.append('remoteip', request.ip);

    try {
      const result = await fetch(verifyUrl, {
        method: 'POST',
        body: params,
      });

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data = await result.json();

      if (data.success) {
        logger.info("reCAPTCHA passed");
        return response.send({ success: true });
      } else {
        logger.warn("reCAPTCHA failed", data);
        return response.status(403).send({ success: false });
      }
    } catch (error) {
      logger.error("Error verifying reCAPTCHA:", error);
      return response.status(400).send({ success: false, error: "No token" });    }
  }
);
