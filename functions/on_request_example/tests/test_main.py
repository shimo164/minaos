import json
from unittest.mock import MagicMock, mock_open, patch

import pytest

from main import on_request_example


@pytest.fixture
def mock_request():
    """Fixture to create a mock request object."""
    mock = MagicMock()
    mock.method = "POST"
    mock.get_json = MagicMock(
        return_value={"url": "http://example.com", "model": "test-model"}
    )
    return mock


@patch("main.get_content", return_value="Sample content")
@patch("main.generate_gemini_result", return_value={"output": "Generated result"})
@patch("builtins.open", new_callable=mock_open, read_data="Task content")
def test_on_request_example_success(
    mock_open, mock_generate, mock_get_content, mock_request
):
    """Test successful execution of the function."""
    response = on_request_example(mock_request)
    assert response.status == "200 OK"
    assert json.loads(response.response[0])["result"] == {"output": "Generated result"}


def test_on_request_example_missing_url(mock_request):
    """Test missing 'url' parameter."""
    mock_request.get_json.return_value = {"model": "test-model"}
    response = on_request_example(mock_request)
    assert response.status == "400 BAD REQUEST"
    assert "No 'url' in request" in json.loads(response.response[0])["error"]


def test_on_request_example_invalid_method():
    """Test invalid HTTP method."""
    mock_request = MagicMock()
    mock_request.method = "GET"
    response = on_request_example(mock_request)
    assert response.status == "405 METHOD NOT ALLOWED"
    assert "Method not allowed" in json.loads(response.response[0])["error"]


def test_on_request_example_missing_model(mock_request):
    """Test missing 'model' parameter."""
    mock_request.get_json.return_value = {"url": "http://example.com"}
    response = on_request_example(mock_request)
    assert response.status == "400 BAD REQUEST"
    assert "No 'model' in request" in json.loads(response.response[0])["error"]


def test_on_request_example_invalid_body_type(mock_request):
    """Test invalid body type (not a dict)."""
    mock_request.get_json.return_value = ["not", "a", "dict"]
    response = on_request_example(mock_request)
    assert response.status == "400 BAD REQUEST"
    assert "expected a JSON object" in json.loads(response.response[0])["error"]


@patch("main.get_content", return_value="Sample content")
@patch("main.generate_gemini_result", side_effect=Exception("Generation failed"))
@patch("builtins.open", new_callable=mock_open, read_data="Task content")
def test_on_request_example_internal_error(
    mock_open, mock_generate, mock_get_content, mock_request
):
    """Test internal server error during processing."""
    response = on_request_example(mock_request)
    assert response.status == "500 INTERNAL SERVER ERROR"
    assert "Failed request" in json.loads(response.response[0])["error"]


def test_on_request_example_invalid_json(mock_request):
    """Test .get_json() returns None (invalid JSON)."""
    mock_request.get_json.return_value = None
    response = on_request_example(mock_request)
    assert response.status == "400 BAD REQUEST"
    assert "expected a JSON object" in json.loads(response.response[0])["error"]
