from PIL import Image
from PIL import ImageChops


def compare_images(
    before_path,
    after_path
):

    before = Image.open(
        before_path
    )

    after = Image.open(
        after_path
    )

    before = before.resize(
        (1280, 720)
    )

    after = after.resize(
        (1280, 720)
    )

    diff = ImageChops.difference(
        before,
        after
    )

    bbox = diff.getbbox()

    differences = []

    if bbox:

        differences.append({

            "change_type":
            "Visual Change",

            "location":
            "Detected Region",

            "difference_area":
            str(bbox)

        })

    return differences