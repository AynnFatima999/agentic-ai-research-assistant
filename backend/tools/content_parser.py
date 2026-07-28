import requests
from bs4 import BeautifulSoup


class ContentParser:

    def extract_content(self, url: str) -> str:
        """
        Extract readable text content from webpage URL.
        """

        try:
            response = requests.get(
                url,
                timeout=10,
                headers={
                    "User-Agent": "Mozilla/5.0"
                }
            )

            response.raise_for_status()

            soup = BeautifulSoup(
                response.text,
                "html.parser"
            )

            # Remove unnecessary elements
            for tag in soup(
                ["script", "style", "nav", "footer"]
            ):
                tag.decompose()

            text = soup.get_text(
                separator=" ",
                strip=True
            )

            return text[:5000]

        except Exception as e:
            print("Parser Error:", e)
            return ""