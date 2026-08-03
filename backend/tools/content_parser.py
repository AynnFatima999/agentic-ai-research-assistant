import requests
from bs4 import BeautifulSoup
import logging


logger = logging.getLogger(__name__)


class ContentParser:

    def extract_content(self, url: str) -> str:
        """
        Extract readable text content from webpage URL.
        """

        if not url or not url.strip():
            logger.warning("Empty URL received for parsing.")
            return ""

        try:
            response = requests.get(
                url.strip(),
                timeout=10,
                headers={
                    "User-Agent": (
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                        "AppleWebKit/537.36 Chrome/120 Safari/537.36"
                    )
                }
            )

            if response.status_code in [403, 401]:
                logger.warning(
                    f"Access blocked for URL: {url}"
                )
                return ""

            response.raise_for_status()

            soup = BeautifulSoup(
                response.text,
                "html.parser"
            )

            for tag in soup(
                ["script", "style", "nav", "footer"]
            ):
                tag.decompose()

            text = soup.get_text(
                separator=" ",
                strip=True
            )

            if not text:
                logger.warning(
                    f"No readable content found: {url}"
                )
                return ""

            return text[:5000]

        except requests.exceptions.Timeout:
            logger.error(
                f"Timeout while fetching URL: {url}"
            )
            return ""

        except requests.exceptions.RequestException as e:
            logger.error(
                f"Request failed for {url}: {e}"
            )
            return ""

        except Exception as e:
            logger.exception(
                f"Content parsing failed: {e}"
            )
            return ""