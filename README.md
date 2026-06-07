# Design Audit Agent
### From Screenshots to Release Decisions — An AI-Assisted UX Review System

<p align="center">

Design teams spend hours reviewing screenshots, debating design changes, and validating releases.

What if an AI agent could perform the first pass?

</p>

---

## The Problem

Modern products evolve rapidly.

Every UI change introduces questions:

- Is the design becoming easier to use?
- Did this redesign improve the experience?
- What changed between versions?
- Are we introducing regressions?
- Is this release safe enough to ship?

Traditional review processes are often:

- Manual
- Subjective
- Time-consuming
- Difficult to scale

Design Audit Agent was built to explore how AI can assist—not replace—human design review.

---

# What This Project Does

Design Audit Agent is a three-level AI-assisted UX evaluation system that progressively moves from simple design analysis to autonomous release reasoning.

Instead of treating AI as the source of truth, the system combines deterministic evaluation with AI-generated explanations.

The result is a workflow that remains transparent, explainable, and reviewable.

---

# Architecture Overview

```text
Screenshot
     │
     ▼
Level 1
Design Audit
     │
     ▼
Level 2
Design Comparison
     │
     ▼
Level 3
Release Recommendation
```

Each level answers a different question.

---

# Level 1 — Design Audit

### Question

> "How good is this design?"

Upload a screenshot.

The agent evaluates visible design characteristics and generates:

- Design Health Score
- Risk Assessment
- Priority Findings
- Executive Summary
- Human-Friendly Recommendations

### Example Outputs

- Visual Hierarchy Issues
- Spacing Problems
- Consistency Findings
- Contrast Recommendations

### AI Contribution

Gemini generates:

- Executive Summaries
- Stakeholder-Friendly Explanations
- Plain Language Recommendations

### Human Validation

The system explicitly communicates:

- What it knows
- What it does not know
- Why human review may still be required

---

# Level 2 — Design Comparison

### Question

> "Did this redesign actually improve the experience?"

Upload:

- Before Screenshot
- After Screenshot

The agent:

- Detects visual changes
- Classifies improvements
- Identifies regressions
- Generates tradeoff analysis

### Outputs

- Executive Verdict
- UX Gain Estimate
- Priority Fix Matrix
- Stakeholder Summary
- Tradeoff Analysis

### Why This Matters

Many systems can identify differences.

Very few explain whether those differences are worth shipping.

Level 2 focuses on reasoning rather than merely detecting change.

---

# Level 3 — Autonomous Regression Agent

### Question

> "Is this release safe enough to ship?"

Level 3 simulates an autonomous design-review workflow.

The agent:

- Reviews audited pages
- Evaluates regression findings
- Prioritizes risks
- Produces release guidance

### Outputs

- Release Recommendation
- Audit Scope
- Tradeoff Analysis
- Human Review Recommendation
- Responsible AI Validation

### Example Decision

```text
SAFE TO RELEASE

Reason:
No critical regressions detected.
Minor spacing inconsistencies identified.
Human verification recommended.
```

---

# Responsible AI by Design

One of the most important decisions in this project was deciding where AI should NOT make decisions.

The system deliberately separates:

## Deterministic Logic

Used for:

- Findings
- Confidence Scores
- Risk Assessment
- Priority Ranking

## Gemini

Used for:

- Executive Summaries
- Tradeoff Explanations
- Stakeholder Communication
- Human-Friendly Recommendations

This prevents the system from treating LLM output as ground truth.

---

# Engineering Tradeoffs

This project intentionally favors explainability over automation.

### Chosen

✅ Transparent decision-making

✅ Human review checkpoints

✅ Deterministic scoring

✅ Responsible AI guardrails

### Deferred

⏳ Playwright website crawling

⏳ Automated screenshot capture

⏳ Live production auditing

These enhancements are identified as future work.

---

# Technology Stack

## Frontend

- React
- Vite

## Backend

- FastAPI
- Python

## AI

- Google Gemini 2.5 Flash

## Image Processing

- Pillow
- NumPy

---

# Project Structure

```text
design-audit-agent/

├── frontend/
│   ├── Level1Audit.jsx
│   ├── Level2Comparison.jsx
│   ├── Level3Regression.jsx
│
├── backend/
│   ├── image_analyzer.py
│   ├── comparison_engine.py
│   ├── report_generator.py
│   ├── regression_classifier.py
│   ├── regression_agent.py
│   └── gemini_service.py
│
├── README.md
└── requirements.txt
```

---

# Running Locally

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Future Roadmap

### Phase 1

- Real browser automation using Playwright
- Live website crawling
- Automated screenshot generation

### Phase 2

- Accessibility scoring
- WCAG compliance checks
- Color contrast validation

### Phase 3

- CI/CD integration
- Automated release gates
- Team collaboration workflows

---

# Key Takeaway

This project is not about replacing designers.

It is about reducing review effort, improving consistency, and helping teams make better release decisions.

The goal is simple:

> Turn screenshots into actionable design intelligence.

---

## Author

**Moushika Anandakrishnan**

AI • Data Science • Product Thinking • Human-Centered Design
