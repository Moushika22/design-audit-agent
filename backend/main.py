from pathlib import Path

from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File

from fastapi.middleware.cors import CORSMiddleware

from services.image_analyzer import analyze_image
from fastapi import UploadFile
from fastapi import File

from PIL import Image
from PIL import ImageChops
from services.regression_agent import run_regression

from services.comparison_engine import (
    compare_images
)

from services.regression_classifier import (
    classify_changes
)

from services.report_generator import (
    generate_level2_report
)

app = FastAPI(
    title="Design Audit Agent"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/")
def root():
    return {
        "message": "Design Audit Agent Running"
    }


@app.post("/audit")
async def audit_image(
    file: UploadFile = File(...)
):

    try:

        file_path = UPLOAD_DIR / file.filename

        with open(file_path, "wb") as buffer:
            buffer.write(
                await file.read()
            )

        report = analyze_image(
            str(file_path)
        )

        return report

    except Exception as e:

        return {
            "error": str(e)
        }

@app.post("/compare")
async def compare_designs(

    before: UploadFile = File(...),
    after: UploadFile = File(...)

):

    before_path = f"uploads/{before.filename}"
    after_path = f"uploads/{after.filename}"

    with open(before_path, "wb") as f:

        f.write(
            await before.read()
        )

    with open(after_path, "wb") as f:

        f.write(
            await after.read()
        )

    differences = compare_images(

        before_path,
        after_path

    )

    findings = classify_changes(
        differences
    )

    report = generate_level2_report(
        findings
    )

    return report

@app.post("/compare")
async def compare_designs(

    before: UploadFile = File(...),
    after: UploadFile = File(...)

):

    before_path = (
        f"uploads/{before.filename}"
    )

    after_path = (
        f"uploads/{after.filename}"
    )

    with open(before_path, "wb") as f:

        f.write(
            await before.read()
        )

    with open(after_path, "wb") as f:

        f.write(
            await after.read()
        )

    differences = compare_images(

        before_path,
        after_path

    )

    findings = classify_changes(
        differences
    )

    report = generate_level2_report(
        findings
    )

    return report
@app.post("/level3")

async def level3():

    return run_regression()