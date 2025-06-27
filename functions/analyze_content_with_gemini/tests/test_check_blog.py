import pytest
from bs4 import BeautifulSoup

from functions.analyze_content_with_gemini.utils.check_blog import (
    _remove_chars,
    get_content,
)


@pytest.fixture
def sample_article_html():
    return """
    <article>
        <aside>Side content</aside>
        <section class="ArticleComments_comments__y4Azs">Comments</section>
        <p>Main content</p>
        <pre class="code lang-python">print("Hello")</pre>
        <ul class="table-of-contents"><li>Item</li></ul>
    </article>
    """


def test_get_content_returns_structure(monkeypatch):
    def mock_get_bs_article(url):
        html = "<article><p>Example content</p></article>"
        return BeautifulSoup(html, "html.parser")

    monkeypatch.setattr("check_blog._get_bs_article", mock_get_bs_article)
    result = get_content("https://zenn.dev/example")

    assert "text" in result
    assert "length" in result
    assert "orig_length" in result
    assert "blog_type" in result
    assert result["blog_type"] == "zenn"


def test_remove_chars_cleanup(sample_article_html):
    soup = BeautifulSoup(sample_article_html, "html.parser")
    cleaned = _remove_chars(soup, blog_type="zenn")
    assert "Side content" not in cleaned
    assert "Comments" not in cleaned
    assert "print" not in cleaned
    assert "Item" not in cleaned
    assert "Main content" in cleaned
