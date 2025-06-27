import logging
import os

from dotenv import load_dotenv
from firebase_admin import auth
from firebase_functions import https_fn
from utils.helper import create_res

load_dotenv()

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "").split(",")

logging.debug(f"Allowed origins: {ALLOWED_ORIGINS}")


def get_cors_headers(origin: str) -> dict:
    if origin in ALLOWED_ORIGINS:
        return {
            "Access-Control-Allow-Origin": origin,
            "Vary": "Origin",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
    return {"Vary": "Origin"}


def auth_header(req: https_fn.Request, cors_headers) -> https_fn.Response:
    auth_header = req.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        logging.error("Unauthorized request: Missing or invalid Authorization header.")
        return create_res({"error": "Unauthorized"}, 401, cors_headers)

    id_token = auth_header.split("Bearer ")[-1]
    try:
        user = auth.verify_id_token(id_token)
        logging.info(f"Authenticated user: {user}")
    except Exception as e:
        logging.error(f"Authentication failed: {str(e)}")
        return create_res({"error": "Unauthorized"}, 401, cors_headers)
    return None  # No error, proceed with the request
