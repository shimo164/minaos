from typing import Optional


def get_request_content(req: dict) -> tuple[Optional[str], Optional[str]]:
    """Validate the request body."""

    body = req.get_json(silent=True)

    def _validate_param(param_name: str, param_value: Optional[str]) -> None:
        if not param_value:
            raise ValueError(f"No '{param_name}' in request.")

    if not isinstance(body, dict):
        raise ValueError("Invalid request body: expected a JSON object.")

    url = body.get("url")
    _validate_param("url", url)

    model = body.get("model")
    _validate_param("model", model)

    return url, model
