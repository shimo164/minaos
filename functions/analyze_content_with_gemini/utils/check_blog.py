import requests
from bs4 import BeautifulSoup

from .errors import NotFoundError


def _get_blog_type(url: str) -> str:
    """
    Determine the type of blog based on the URL.
    """
    if "zenn.dev" in url:
        return "zenn"
    elif "qiita.com" in url:  # TODO: Not Used
        return "qiita"
    elif "note.com" in url:  # TODO: Not Used
        return "note"
    elif "hatena.ne.jp" in url:  # TODO: Not Used
        return "hatena"
    else:
        return "other"


def _get_bs_article(url: str) -> BeautifulSoup:
    """Fetch the content of a blog post from the given URL and return the article element."""
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            raise NotFoundError(f"Not Found for url: {url}")
        raise
    except requests.exceptions.RequestException as e:
        print(e)
        raise ValueError(e)
        # return None
    article = soup.find("article")
    return article


def _remove_chars(article: BeautifulSoup, blog_type: str) -> str:
    """Remove unwanted characters and elements from the article element."""
    # remove aside elements
    for aside in article.find_all("aside"):
        aside.decompose()

    # remove common
    _remove_elements_by_all(article, tag="ul", class_name="table-of-contents")

    target_classes = ["code", "lang-python"]
    _remove_elements_by_any(article, tag="pre", class_names=target_classes)

    if blog_type == "zenn":
        # remove comments section
        target_class = "ArticleComments_comments__y4Azs"
        _remove_elements_by_all(article, tag="section", class_name=target_class)

    separator = " " if blog_type == "zenn" else "\n"
    text = article.get_text(separator=separator, strip=True)
    return text


def _remove_elements_by_all(soup: BeautifulSoup, tag: str, class_name: str):
    """
    Remove all elements of a given tag and class from the BeautifulSoup object.

    Parameters:
    soup (BeautifulSoup): Parsed HTML document.
    tag (str): HTML tag to search for (e.g., 'div', 'ul').
    class_name (str): Space-separated class names to match.
    """
    for element in soup.find_all(tag, class_=class_name):
        element.decompose()


def _remove_elements_by_any(soup, tag, class_names: list[str]):
    """
    Remove all elements of a given tag that have any of the specified class names.

    Parameters:
    soup (BeautifulSoup): Parsed HTML document.
    tag (str): HTML tag to search for.
    class_names (list[str]): List of class names to match (OR condition).
    """
    for element in soup.find_all(
        tag, class_=lambda x: x and set(class_names).intersection(x.split())
    ):
        element.decompose()


def _extract_content(article: BeautifulSoup, blog_type: str) -> dict:
    """
    Extract the content from the article element and return a dictionary with text, length, original length, and blog type.
    """
    if not article:
        return {
            "text": "",
            "length": 0,
            "orig_length": 0,
            "blog_type": blog_type,
        }

    text_orig = article.get_text(separator="\n", strip=True)
    text = _remove_chars(article, blog_type)
    return {
        "text": text,
        "length": len(text),
        "orig_length": len(text_orig),
        "blog_type": blog_type,
    }


def get_content(url):
    """Return the content of a blog post.

    Args:
        url (str): The URL of the blog post.
    Returns:
        dict: A dictionary containing the extracted text, its length, original length, and blog type.

    If fails to fetch the article, returns an empty content with blog type.

    return {
        "text": "",
        "length": 0,
        "orig_length": 0,
        "blog_type": blog_type,
    }
    """
    article = _get_bs_article(url)
    blog_type = _get_blog_type(url)
    return _extract_content(article, blog_type)
