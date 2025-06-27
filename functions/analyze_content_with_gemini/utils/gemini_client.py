import logging
import os
import time

from dotenv import load_dotenv
from google import genai


def _client() -> genai.Client:
    """Initialize and return the GenAI client."""
    logging.info("Initializing GenAI client...")
    load_dotenv()
    gemini_api_key = os.getenv("GEMINI_API_KEY")

    return genai.Client(api_key=gemini_api_key)


def _generate_response(model: str, prompt: str, config: dict) -> str:
    """Generate a response using the Gemini model."""
    logging.info(f"Generating response using model: {model}")
    client = _client()
    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=config,
    )
    return response


def generate_gemini_result(
    prompt: str,
    model: str,
    config: dict = {},
) -> dict[str]:
    """Generate a response from the Gemini model and return the result."""
    logging.info("Starting response generation...")
    start_time = time.time()

    try:
        response = _generate_response(model, prompt, config)
    except Exception as e:
        logging.error(f"Error generating response: {e}")
        raise ValueError("Failed to generate response from Gemini model.") from e

    logging.info("Response generated successfully.")

    tokens_count = {
        "total": response.usage_metadata.total_token_count,
        "prompt": response.usage_metadata.prompt_token_count,
        "thoughts": response.usage_metadata.thoughts_token_count,
        "candidates": response.usage_metadata.candidates_token_count,
    }

    end_time = time.time()
    elapsed_time = round(end_time - start_time, 1)

    if config.get("thinking_config"):
        thoughts = response.candidates[0].content.parts[0].text
    else:
        thoughts = None

    gemini_result = {
        "generated_text": response.text,
        "tokens_count": tokens_count,
        "elapsed_time": elapsed_time,
        "thoughts": thoughts,
    }

    return gemini_result
