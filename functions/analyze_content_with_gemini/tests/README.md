## Pytest

cd $(git rev-parse --show-toplevel)/functions/analyze_content_with_gemini

source venv/bin/activate

cd tests

pytest .
