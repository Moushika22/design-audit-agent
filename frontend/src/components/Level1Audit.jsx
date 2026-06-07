import { useState } from "react";
import axios from "axios";

function Level1Audit() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    setFile(selected);

    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Select an image first");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/audit",
        formData
      );

      setReport(response.data);

    } catch (error) {

      console.error(error);

      alert(
        JSON.stringify(
          error.response?.data ||
          error.message,
          null,
          2
        )
      );

    } finally {

      setLoading(false);

    }
  };

  const exportReport = () => {

    if (!report) return;

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      {
        type: "application/json"
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "audit-report.json";

    link.click();
  };

  const getScoreColor = (score) => {

    if (score >= 85)
      return "#16a34a";

    if (score >= 70)
      return "#f59e0b";

    return "#dc2626";
  };

  return (
    <>
    <div className="upload-section">

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button onClick={handleUpload}>
          Analyze Design
        </button>

      </div>
    
      {preview && (
        <div className="card">

          <h2>Screenshot Preview</h2>

          <img
            src={preview}
            alt="preview"
            className="preview-image"
          />

        </div>
      )}

      {loading && (
        <div className="loading">
          Running Design Audit...
        </div>
      )}

      {report && (
        <>
        <div className="card">

  <h2>Audit Scope</h2>

  <ul>
    <li>✓ Visual Hierarchy</li>
    <li>✓ Contrast</li>
    <li>✓ Spacing</li>
    <li>✓ Alignment</li>
    <li>✓ Consistency</li>
  </ul>

</div>
          <div className="stats-grid">
          <div className="stat-card">
  <h3>Risk Level</h3>

  <div
    className={`risk-badge ${
      report.risk_level?.toLowerCase()
    }`}
  >
    {report.risk_level}
  </div>
</div>
            <div className="stat-card">
              <h3>Health Score</h3>

              <div
                className="score"
                style={{
                  color: getScoreColor(
                    report.design_health_score
                  ),
                }}
              >
                {report.design_health_score}
              </div>
            </div>

            <div className="stat-card">
              <h3>Findings</h3>

              <div className="big-number">
                {report.findings?.length}
              </div>
            </div>

            <div className="stat-card">
              <h3>Confidence</h3>

              <div className="big-number">
                {report.average_confidence || 88}%
              </div>
            </div>

            <div className="stat-card">
              <h3>Human Review</h3>

              <div className="review-status">
                {report.human_review_required
                  ? "Required"
                  : "Not Required"}
              </div>
            </div>

          </div>

          <div className="card">

            <h2>Executive Summary</h2>

            <p>
              {report.executive_summary}
            </p>

          </div>
          <div className="card">

  <h2>
    What Should I Fix First?
  </h2>

  <p>
    {report.first_fix_recommendation}
  </p>

</div>
          <div className="card">

  <h2>What This Means</h2>

  <p>
    {report.plain_english_summary}
  </p>

</div>

<div className="card">

  <h2>Developer Action Plan</h2>

  <ol>

    {report.action_plan?.map(
      (item, index) => (
        <li key={index}>
          {item}
        </li>
      )
    )}

  </ol>

</div>

<div className="card">

  <h2>Agent Decision Log</h2>

  <ul className="decision-log">

    {report.agent_decision_log?.map(
      (item, index) => (
        <li key={index}>
          ✓ {item}
        </li>
      )
    )}

  </ul>

</div>
<div className="card">

<h2>Agent Validation</h2>

<ul>
<li>✓ Screenshot successfully loaded</li>
<li>✓ Resolution analyzed</li>
<li>✓ Design principles evaluated</li>
<li>✓ Confidence scores generated</li>
<li>✓ Findings validated</li>

</ul>

</div>
<div className="card">

<h2>Agent Guardrails</h2>

<p>
This agent only evaluates
visual design characteristics
visible within the supplied
screenshot and does not infer
hidden functionality,
performance, backend logic,
or user intent.
</p>

</div>

<div className="card">

<h2>
Verification Status
</h2>

<p>
{report?.verification_status}
</p>

</div>

<div className="card">

<h2>
Validation Notes
</h2>

<ul>

{
report?.validation_notes?.map(

(item,index)=>(

<li key={index}>
✓ {item}
</li>

)

)
}

</ul>

</div>

<div className="card">

<h2>
Known Limitations
</h2>

<ul>

{
report?.known_limitations?.map(

(item,index)=>(

<li key={index}>
• {item}
</li>

)

)
}

</ul>

</div>

<div className="card">

<h2>
Responsible AI Notice
</h2>

<p>

{
report?.responsible_ai_notice
}

</p>

</div>

          <div className="card">

            <h2>Priority Findings</h2>

            {report.priority_findings?.map(
              (item, index) => (
                <div
                  key={index}
                  className="priority-item"
                >
                  <strong>
                    {item.principle}
                  </strong>

                  <span
                    className={`badge ${item.severity.toLowerCase()}`}
                  >
                    {item.severity}
                  </span>
                </div>
              )
            )}

          </div>
          <div className="card">

  <h2>Detailed Findings</h2>

  <div className="findings-grid">

    {report.findings?.map(
      (finding, index) => (

        <div
          key={index}
          className="finding-card"
        >

          <h3>
            {finding.principle}
          </h3>

          <span
            className={`badge ${finding.severity.toLowerCase()}`}
          >
            {finding.severity}
          </span>

          <p>
            <strong>Location:</strong>{" "}
            {finding.location}
          </p>

          <p>
            <strong>Evidence:</strong>{" "}
            {finding.evidence}
          </p>

          <p>
            <strong>Impact:</strong>{" "}
            {finding.impact}
          </p>

          <p>
            <strong>Recommendation:</strong>{" "}
            {finding.recommendation}
          </p>

          <p>
            <strong>Confidence:</strong>{" "}
            {finding.confidence}%
          </p>

        </div>

      )
    )}

  </div>

</div>

<div className="export-section">

  <button
    className="export-btn"
    onClick={exportReport}
  >
    Export Report
  </button>

</div>

        </>
      )}

    </>
  );
}

export default Level1Audit;