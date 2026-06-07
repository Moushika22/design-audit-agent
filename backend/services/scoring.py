def calculate_health_score(findings):

    score = 100

    penalties = {
        "Critical": 25,
        "High": 15,
        "Medium": 8,
        "Low": 3,
        "Info": 0
    }

    for finding in findings:

        severity = finding.get(
            "severity",
            "Info"
        )

        score -= penalties.get(
            severity,
            0
        )

    return max(score, 0)


def requires_human_review(findings):

    for finding in findings:

        if finding["severity"] == "Critical":
            return True

    return False


def get_priority_findings(findings):

    priority_order = {
        "Critical": 5,
        "High": 4,
        "Medium": 3,
        "Low": 2,
        "Info": 1
    }

    return sorted(
        findings,
        key=lambda x:
        priority_order.get(
            x["severity"],
            0
        ),
        reverse=True
    )[:3]