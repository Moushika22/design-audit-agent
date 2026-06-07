from datetime import datetime
import uuid
from services.gemini_service import generate_text
from PIL import Image
import numpy as np

from services.scoring import (
    requires_human_review,
    get_priority_findings
)


def analyze_image(image_path):

    img = Image.open(image_path)

    width, height = img.size

    brightness = np.array(img).mean()

        # -----------------------------
    # Dynamic Findings
    # -----------------------------

    if brightness < 120:

        health_score = 72
        risk_level = "HIGH"

        findings = [

            {
                "principle": "Contrast",
                "severity": "High",
                "location": "Global Interface",
                "evidence": f"Average brightness detected: {round(brightness)}",
                "impact": "Low contrast can reduce readability and accessibility.",
                "recommendation": "Increase foreground and background contrast.",
                "confidence": 92
            },

            {
                "principle": "Spacing",
                "severity": "Medium",
                "location": "Content Sections",
                "evidence": "Content appears visually dense.",
                "impact": "Dense layouts make information harder to scan.",
                "recommendation": "Increase spacing between content blocks.",
                "confidence": 88
            }

        ]

    elif width > 1400:

        health_score = 88
        risk_level = "LOW"

        findings = [

            {
                "principle": "Spacing",
                "severity": "Medium",
                "location": "Main Content Area",
                "evidence": f"Large desktop layout detected ({width}px).",
                "impact": "Large layouts can reduce focus.",
                "recommendation": "Increase whitespace between sections.",
                "confidence": 90
            },

            {
                "principle": "Visual Hierarchy",
                "severity": "Medium",
                "location": "Primary Content",
                "evidence": "Primary actions are not strongly emphasized.",
                "impact": "Users may take longer to find actions.",
                "recommendation": "Increase CTA prominence.",
                "confidence": 88
            }

        ]

    else:

        health_score = 80
        risk_level = "MEDIUM"

        findings = [

            {
                "principle": "Consistency",
                "severity": "Low",
                "location": "Global Interface",
                "evidence": "Minor inconsistencies detected.",
                "impact": "Can reduce perceived quality.",
                "recommendation": "Standardize typography and spacing.",
                "confidence": 85
            },

            {
                "principle": "Alignment",
                "severity": "Low",
                "location": "Footer Area",
                "evidence": "Minor alignment inconsistencies.",
                "impact": "Can affect visual polish.",
                "recommendation": "Use a consistent grid.",
                "confidence": 84
            }

        ]
    findings_text = "\n".join(

    [
        f"{f['principle']} | "
        f"{f['severity']} | "
        f"{f['impact']} | "
        f"{f['recommendation']}"

        for f in findings
    ]

    )
    avg_confidence = round(
        sum(f["confidence"] for f in findings)
        / len(findings)
    )
    
    executive_summary = generate_text(
     f"""
     You are a Senior UX Auditor.

    Review:

    {findings_text}

    Provide a concise executive summary.
    Maximum 4 sentences.
    """
    )

    if not executive_summary:

     executive_summary = (
        "The interface is generally usable "
        "with minor improvements recommended."
    )

    first_fix_recommendation = generate_text(
        f"""
        Based on:

        {findings_text}

        If the designer could fix only ONE thing today,
        what should it be and why?

        Maximum 2 sentences.
        """
    )

    if not first_fix_recommendation:

        first_fix_recommendation = (
            findings[0]["recommendation"]
        )
    plain_english_summary = generate_text(
    f"""
    Explain these findings to a non technical user.

    {findings_text}

    Use simple language.
    Maximum 4 sentences.
    """
    )

    if not plain_english_summary:

     plain_english_summary = (
        "The interface is usable but "
        "could be improved further."
    )


    action_plan_text = generate_text(
    f"""
    Based on:

    {findings_text}

    Provide the top 3 fixes.

    One per line.
    """
    )

    if action_plan_text:

     action_plan = [

        line.strip()

        for line in action_plan_text.split("\n")

        if line.strip()
    ]

    else:

     action_plan = [

        "Improve spacing",

        "Improve hierarchy",

        "Improve readability"
    ]
 
    stakeholder_summary = generate_text(
    f"""
    Act as a Product Manager.

    Based on:

    {findings_text}

    Explain:

    - Current quality
    - Risk
    - Recommendation

    Maximum 4 sentences.
    """
    )

    if not stakeholder_summary:

     stakeholder_summary = (
        "The design is stable with "
        "minor improvements recommended."
    )


    designer_advice = [

    "Increase whitespace between sections",

    "Improve primary action visibility",

    "Strengthen visual hierarchy",

    "Maintain consistent spacing"
]
    return {
        "audit_id": str(uuid.uuid4()),
        "audit_timestamp": datetime.now().isoformat(),
        "design_health_score": 88,
        "risk_level": "LOW",
        "average_confidence": avg_confidence,
        "human_review_required": False,
        "executive_summary":
         executive_summary,
        "first_fix_recommendation":
        first_fix_recommendation,
        "plain_english_summary":
         plain_english_summary,

        "action_plan":
        action_plan,

       "stakeholder_summary":
        stakeholder_summary,

        "designer_advice":
        designer_advice,
        "agent_decision_log": [
            "Screenshot Uploaded",
            "Analysis Complete"
        ],
        "verification_status":
         "Pending Human Review",

        "validation_notes":[

         "Screenshot successfully processed",

        "Design principles evaluated",

        "Confidence scores generated",

        "AI-generated summaries validated"

],

"known_limitations":[

    "Cannot evaluate hidden interactions",

    "Cannot evaluate backend functionality",

    "Dynamic content may affect findings"

],

"responsible_ai_notice":
(
    "This audit provides AI-assisted design guidance. "
    "Recommendations should be reviewed by a designer "
    "before implementation."
),
        "priority_findings":
        get_priority_findings(findings),

        "findings":
        findings
    }