import json
from unittest.mock import MagicMock, mock_open, patch

import pytest
from main import analyze_content_with_gemini


@pytest.fixture
def mock_request():
    mock = MagicMock()
    mock.method = "POST"
    mock.get_json = MagicMock(
        return_value={"url": "http://example.com", "model": "test-model"}
    )
    mock.headers = MagicMock()
    mock.headers.get = MagicMock(return_value="Bearer valid-token")
    return mock


@pytest.fixture
def mock_authenticated_request(mock_request):
    return mock_request


@patch("main.auth_header", return_value=None)
@patch("main.get_request_content", return_value=("http://example.com", "test-model"))
@patch("main.generate_gemini_result", return_value={"output": "Generated result"})
@patch("builtins.open", new_callable=mock_open, read_data="Task content")
@patch("main.generate_prompt", return_value="Task content")
def test_analyze_content_with_gemini_success(
    mock_generate_prompt,
    mock_open,
    mock_generate,
    mock_get_request_content,
    mock_auth_header,
    mock_authenticated_request,
):
    response = analyze_content_with_gemini(mock_authenticated_request)
    assert response.status == "200 OK"
    assert json.loads(response.response[0])["gemini_result"] == {
        "output": "Generated result"
    }


@patch("main.auth_header", return_value=None)
def test_analyze_content_with_gemini_missing_url(
    mock_auth_header, mock_authenticated_request
):
    mock_authenticated_request.get_json.return_value = {"model": "test-model"}
    response = analyze_content_with_gemini(mock_authenticated_request)
    assert response.status == "400 BAD REQUEST"
    assert "No 'url' in request" in json.loads(response.response[0])["error"]


@patch("main.auth_header", return_value=None)
def test_analyze_content_with_gemini_invalid_method(
    mock_auth_header, mock_authenticated_request
):
    mock_authenticated_request.method = "GET"
    response = analyze_content_with_gemini(mock_authenticated_request)
    assert response.status == "405 METHOD NOT ALLOWED"
    assert "Method not allowed" in json.loads(response.response[0])["error"]


@patch("main.auth_header", return_value=None)
def test_analyze_content_with_gemini_missing_model(
    mock_auth_header, mock_authenticated_request
):
    mock_authenticated_request.get_json.return_value = {"url": "http://example.com"}
    response = analyze_content_with_gemini(mock_authenticated_request)
    assert response.status == "400 BAD REQUEST"
    assert "No 'model' in request" in json.loads(response.response[0])["error"]


@patch("main.auth_header", return_value=None)
def test_analyze_content_with_gemini_invalid_body_type(
    mock_auth_header, mock_authenticated_request
):
    mock_authenticated_request.get_json.return_value = ["not", "a", "dict"]
    response = analyze_content_with_gemini(mock_authenticated_request)
    assert response.status == "400 BAD REQUEST"
    assert "expected a JSON object" in json.loads(response.response[0])["error"]


@patch("main.auth_header", return_value=None)
@patch("main.get_request_content", return_value=("http://example.com", "test-model"))
@patch("main.generate_gemini_result", side_effect=Exception("Generation failed"))
@patch("main.generate_prompt", return_value="Task content")
def test_analyze_content_with_gemini_internal_error(
    mock_generate_prompt,
    mock_generate,
    mock_get_request_content,
    mock_auth_header,
    mock_authenticated_request,
):
    response = analyze_content_with_gemini(mock_authenticated_request)
    assert response.status == "500 INTERNAL SERVER ERROR"
    assert "Failed request" in json.loads(response.response[0])["error"]


@patch("main.auth_header", return_value=None)
def test_analyze_content_with_gemini_invalid_json(
    mock_auth_header, mock_authenticated_request
):
    mock_authenticated_request.get_json.return_value = None
    response = analyze_content_with_gemini(mock_authenticated_request)
    assert response.status == "400 BAD REQUEST"
    assert "expected a JSON object" in json.loads(response.response[0])["error"]
