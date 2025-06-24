import json
import logging
import os

import google.cloud.logging
from firebase_admin import initialize_app
from firebase_functions import https_fn
from gemini_client import generate_gemini_result

from utils.header import get_cors_headers, auth_header
from utils.helper import create_res, set_config, get_prompt
from utils.validate import get_request_content

# Set up Google Cloud Logging
logging_client = google.cloud.logging.Client()
logging_client.setup_logging()


initialize_app()

REGION = os.getenv("FUNCTION_REGION", "asia-east1")


@https_fn.on_request(region=REGION)
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    logging.debug(f"Received request: {req}")
    origin = req.headers.get("Origin", "")
    cors_headers = get_cors_headers(origin)

    if req.method == "OPTIONS":
        return https_fn.Response(status=204, headers=cors_headers)

    if response := auth_header(req, cors_headers):
        return response

    if req.method == "POST":
        try:
            url, model = get_request_content(req)
            task_file = os.environ.get("TASK_FILE", "task02.txt")
            prompt = get_prompt(url, task_file)
            config = set_config(model)
            gemini_result = generate_gemini_result(prompt, model, config)

            logging.info(
                json.dumps(
                    {
                        **{"url": url, "model": model, "task": task_file},
                        **gemini_result,
                    },
                    ensure_ascii=False,
                ),
            )
            return create_res({"gemini_result": gemini_result}, 200, cors_headers)

        except ValueError as e:
            return create_res({"error": str(e)}, 400, cors_headers)

        except Exception as e:
            return create_res({"error": f"Failed request: {str(e)}"}, 500, cors_headers)

    return create_res({"error": "Method not allowed."}, 405, cors_headers)
