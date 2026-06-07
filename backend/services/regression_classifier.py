def classify_changes(differences):

    findings = []

    if len(differences) == 0:

        findings.append({

            "category":
            "Layout",

            "classification":
            "Neutral",

            "location":
            "Global Interface",

            "reason":
            "No meaningful visual differences detected.",

            "impact":
            "User experience is expected to remain unchanged.",

            "confidence":
            92
        })

        return findings

    for diff in differences:

        area = diff.get(
            "difference_area",
            ""
        )

        findings.append({

            "category":
            "Visual Change",

            "classification":
            "Improvement",

            "location":
            area,

            "reason":
            "Visual differences detected between baseline and candidate design.",

            "impact":
            "Users may notice changes in layout, spacing, or hierarchy.",

            "confidence":
            88
        })

    if len(differences) >= 3:

        findings.append({

            "category":
            "Regression Risk",

            "classification":
            "Regression",

            "location":
            "Multiple Regions",

            "reason":
            "A large number of visual changes were detected.",

            "impact":
            "Some changes may introduce unintended usability issues.",

            "confidence":
            84
        })

    return findings