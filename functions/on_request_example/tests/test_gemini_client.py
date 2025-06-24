from unittest.mock import MagicMock, patch

import pytest

from gemini_client import generate_gemini_result


@patch("gemini_client._client")
def test_generate_gemini_result_success(mock_client_factory):

    mock_generate_content = MagicMock()
    mock_response = MagicMock()

    mock_response.text = "Generated response"
    mock_response.usage_metadata.total_token_count = 100
    mock_response.usage_metadata.prompt_token_count = 30
    mock_response.usage_metadata.thoughts_token_count = 20
    mock_response.usage_metadata.candidates_token_count = 50
    mock_response.candidates = [
        MagicMock(content=MagicMock(parts=[MagicMock(text="Thoughts")]))
    ]
    mock_generate_content.return_value = mock_response

    mock_model = MagicMock()
    mock_model.generate_content = mock_generate_content

    mock_client = MagicMock()
    mock_client.models = mock_model
    mock_client_factory.return_value = mock_client

    gemini_result = generate_gemini_result(
        "Sample prompt", "test-model", {"thinking_config": {"include_thoughts": True}}
    )

    assert gemini_result["generated_text"] == "Generated response"
    assert gemini_result["tokens_count"]["total"] == 100
    assert gemini_result["thoughts"] == "Thoughts"
    assert "elapsed_time" in gemini_result
