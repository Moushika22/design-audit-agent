
import os
import shutil


BASELINE_FOLDER = "baselines"


def save_baseline(
    source,
    page_name
):

    os.makedirs(
        BASELINE_FOLDER,
        exist_ok=True
    )

    shutil.copy(

        source,

        f"{BASELINE_FOLDER}/{page_name}.png"

    )


def get_baseline(
    page_name
):

    return f"{BASELINE_FOLDER}/{page_name}.png"