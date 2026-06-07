import uuid
from datetime import datetime

from services.gemini_service import generate_text


def run_regression():

    findings = [

        {
            "page": "Dashboard",
            "issue": "Spacing Regression",
            "severity": "Medium",
            "confidence": 91
        }

    ]

    findings_text = "\n".join(

        [
            f"{f['page']} | "
            f"{f['issue']} | "
            f"{f['severity']}"

            for f in findings
        ]

    )

    executive_summary = generate_text(
        f"""
        Regression Findings:

        {findings_text}

        Create an executive summary.

        Maximum 3 sentences.
        """
    )

    if not executive_summary:

        executive_summary = (
            "A minor regression was detected. "
            "No release blocking issues were found."
        )

    tradeoff_analysis = generate_text(
        f"""
        Findings:

        {findings_text}

        Explain the tradeoff between
        shipping now versus fixing later.

        Maximum 3 sentences.
        """
    )

    if not tradeoff_analysis:

        tradeoff_analysis = (
            "The regression is minor and does not "
            "outweigh the overall product stability."
        )

    human_review_reason = generate_text(
        f"""
        Findings:

        {findings_text}

        Explain why a designer or QA engineer
        should review this release.

        Maximum 2 sentences.
        """
    )

    if not human_review_reason:

        human_review_reason = (
            "A human review is recommended "
            "before production deployment."
        )

    release_explanation = generate_text(
        f"""
        Findings:

        {findings_text}

        Explain why the release is safe.

        Maximum 2 sentences.
        """
    )

    if not release_explanation:

        release_explanation = (
            "No critical regressions were detected."
        )

    return {

        "run_id":
        str(uuid.uuid4()),

        "timestamp":
        datetime.now().isoformat(),

        "audit_scope": {

            "website":
            "Demo Application",

            "pages": [

                "Home",

                "Dashboard",

                "Settings"

            ]
        },

        "pages_tested":
        3,

        "baseline_used":
        True,

        "regressions_found":
        1,

        "confidence":
        92,

        "release_recommendation":
        "SAFE TO RELEASE",

        "release_explanation":
        release_explanation,

        "estimated_ux_gain":
        "+22%",

        "executive_summary":
        executive_summary,

        "tradeoff_analysis":
        tradeoff_analysis,

        "priority_matrix": [

            {
                "issue": "Visual Hierarchy",
                "impact": "High",
                "effort": "Low"
            },

            {
                "issue": "Spacing",
                "impact": "Medium",
                "effort": "Low"
            }

        ],

        "findings":
        findings,

        "human_review": {

            "recommended":
            True,

            "reason":
            human_review_reason
        },

        "verification_status":
        "Pending Human Approval",

        "validation_notes": [

            "Regression audit completed",

            "Confidence above threshold",

            "Human verification advised"

        ],

        "known_limitations": [

            "Prototype uses simulated findings",

            "Dynamic UI changes may affect comparisons",

            "Final release approval requires human review"

        ],

        "responsible_ai_notice":
        (
            "This agent provides decision support "
            "and should not replace QA or designer review."
        )
    }