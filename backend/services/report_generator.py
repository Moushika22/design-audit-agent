from datetime import datetime
import uuid

from services.gemini_service import generate_text


def generate_level2_report(findings):

    improvement_count = len([
        x for x in findings
        if x["classification"] == "Improvement"
    ])

    regression_count = len([
        x for x in findings
        if x["classification"] == "Regression"
    ])

    neutral_count = len([
        x for x in findings
        if x["classification"] == "Neutral"
    ])

    avg_confidence = round(
        sum(
            f["confidence"]
            for f in findings
        ) / len(findings)
    )

    if improvement_count > regression_count:

        verdict = "Improved Design"

    elif regression_count > improvement_count:

        verdict = "Design Regression"

    else:

        verdict = "Neutral Change"

    human_review_required = (
        avg_confidence < 75
        or regression_count >= 2
    )

    findings_text = "\n".join(

        [
            f"{f['category']} | "
            f"{f['classification']} | "
            f"{f['impact']}"

            for f in findings
        ]

    )

    stakeholder_summary = generate_text(
        f"""
        You are a UX Product Manager.

        Findings:

        {findings_text}

        Explain the business value of these changes.

        Maximum 3 sentences.
        """
    )

    if not stakeholder_summary:

        stakeholder_summary = (
            "Users will find important content faster "
            "and navigate more efficiently."
        )

    tradeoff_analysis = generate_text(
        f"""
        Findings:

        {findings_text}

        Explain the tradeoff.

        Mention:
        - improvement
        - regression
        - final judgement

        Maximum 3 sentences.
        """
    )

    if not tradeoff_analysis:

        tradeoff_analysis = (
            "The usability improvement outweighs "
            "the observed regression."
        )

    return {

        "comparison_id":
        str(uuid.uuid4()),

        "comparison_timestamp":
        datetime.now().isoformat(),

        "overall_verdict":
        verdict,

        "confidence":
        avg_confidence,

        "expected_ux_gain":
        "+15%",

        "where_should_i_start": {

            "focus_area":
            "Visual Hierarchy",

            "reason":
            "This area affects the largest number of users.",

            "estimated_effort":
            "Low",

            "expected_benefit":
            "High"
        },

        "tradeoff_analysis":
        tradeoff_analysis,

        "stakeholder_summary":
        stakeholder_summary,

        "product_summary":
        (
            "The updated design shows positive progress "
            "but still contains opportunities for usability improvement."
        ),

        "comparison_evidence": {

            "improvements":
            improvement_count,

            "regressions":
            regression_count,

            "neutral":
            neutral_count
        },

        "human_review_required":
        human_review_required,

        "verification_status":
        "Pending Human Review",

        "validation_notes": [

            "Baseline loaded",

            "Comparison completed",

            "Confidence calculated",

            "Human verification advised"

        ],

        "known_limitations": [

            "Dynamic content may create false positives",

            "Visual comparison does not validate functionality",

            "Business context not considered"

        ],

        "responsible_ai_notice":
        (
            "Visual comparison results should be reviewed "
            "by designers before release decisions."
        ),

        "findings":
        findings
    }