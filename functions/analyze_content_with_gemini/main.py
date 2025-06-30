import json
import logging
import os

import google.cloud.logging
from firebase_admin import initialize_app
from firebase_functions import https_fn
from utils.errors import NotFoundError
from utils.gemini_client import generate_gemini_result
from utils.header import auth_header, get_cors_headers
from utils.helper import create_res, generate_prompt, set_config
from utils.validate import get_request_content

# Set up Google Cloud Logging
logging_client = google.cloud.logging.Client()
logging_client.setup_logging()


initialize_app()

REGION = os.getenv("FUNCTION_REGION", "asia-east1")


@https_fn.on_request(region=REGION)
def analyze_content_with_gemini(req: https_fn.Request) -> https_fn.Response:
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
            # TODO: env is not used
            task_file = os.environ.get("TASK_FILE", "task03.txt")
            prompt = generate_prompt(url, task_file)

            logging.info(f"Generated prompt: {prompt}")
            config = set_config(model)
            logging.info(f"Configuration set for model: {model}")

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

            # TODO: "Code 999 No ..." is returned by Gemini as a special case
            # Check this condition and handle it accordingly
            generated_text = gemini_result.get("generated_text", "")
            if "Code 999" in generated_text:
                return create_res({"gemini_result": gemini_result}, 200, cors_headers)

            return create_res({"gemini_result": gemini_result}, 200, cors_headers)

        except ValueError as e:
            return create_res({"error": str(e)}, 400, cors_headers)

        except NotFoundError as e:
            return create_res({"error": str(e)}, 404, cors_headers)

        except Exception as e:
            return create_res({"error": f"Failed request: {str(e)}"}, 500, cors_headers)

    return create_res({"error": "Method not allowed."}, 405, cors_headers)
