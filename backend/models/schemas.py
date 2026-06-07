from pydantic import BaseModel
from typing import List


class Finding(BaseModel):
    principle: str
    severity: str
    location: str
    impact: str
    recommendation: str
    confidence: int


class AuditReport(BaseModel):
    design_health_score: int
    executive_summary: str
    findings: List[Finding]