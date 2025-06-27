import json
import logging
import os

from firebase_functions import https_fn

from .check_blog import get_content


def create_res(message: dict, status: int, headers: dict) -> https_fn.Response:
    """Helper function to create error responses."""
    logging.debug(f"Creating response with status {status} and message: {message}")
    return https_fn.Response(
        response=json.dumps(
            message,
            ensure_ascii=False,
        ),
        status=status,
        headers=headers,
    )


def set_config(model: str) -> dict:
    """Set configuration based on the model."""
    if "thinking" in model:
        logging.debug("Using thinking model")
        config = {"thinking_config": {"include_thoughts": True}}
    else:
        config = {}

    return config


def generate_prompt(url: str, task_file: str) -> str:

    with open(f"tasks/{task_file}", "r") as file:
        task = file.read()

    content = get_content(url)
    print("content length:", content["length"])
    logging.debug(f"Content fetched: {content}")
    if content["length"] > int(os.environ.get("MAX_CONTENT_LENGTH", 10000)):
        raise ValueError("本文が長すぎます")

    prompt = f"""
    task: {task}
    target content: {content}
    """

    return prompt
