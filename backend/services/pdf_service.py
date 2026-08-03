from io import BytesIO

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)


class PDFService:
    """
    Service for generating research reports as PDF.
    """

    @staticmethod
    def generate_pdf(
        topic: str,
        summary: str,
        key_points: list,
        references: list,
    ) -> bytes:

        buffer = BytesIO()

        document = SimpleDocTemplate(buffer)

        styles = getSampleStyleSheet()

        elements = []

        # Title
        elements.append(
            Paragraph(
                f"<b>Research Report</b>",
                styles["Title"]
            )
        )

        elements.append(Spacer(1, 20))

        # Topic
        elements.append(
            Paragraph(
                f"<b>Topic:</b> {topic}",
                styles["Heading2"]
            )
        )

        elements.append(Spacer(1, 12))

        # Summary
        elements.append(
            Paragraph(
                "<b>Summary</b>",
                styles["Heading2"]
            )
        )

        elements.append(
            Paragraph(
                summary,
                styles["BodyText"]
            )
        )

        elements.append(Spacer(1, 12))

        # Key Points
        elements.append(
            Paragraph(
                "<b>Key Points</b>",
                styles["Heading2"]
            )
        )

        for point in key_points:
            elements.append(
                Paragraph(
                    f"• {point}",
                    styles["BodyText"]
                )
            )

        elements.append(Spacer(1, 12))

        # References
        elements.append(
            Paragraph(
                "<b>References</b>",
                styles["Heading2"]
            )
        )

        for ref in references:

            title = ref.get("title", "")
            url = ref.get("url", "")

            elements.append(
                Paragraph(
                    f"{title}<br/>{url}",
                    styles["BodyText"]
                )
            )

        document.build(elements)

        pdf = buffer.getvalue()

        buffer.close()

        return pdf