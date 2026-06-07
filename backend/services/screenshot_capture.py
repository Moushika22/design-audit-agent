from playwright.sync_api import sync_playwright


def capture_page(url, output_file):

    with sync_playwright() as p:

        browser = p.chromium.launch(
            headless=True
        )

        page = browser.new_page(
            viewport={
                "width": 1440,
                "height": 900
            }
        )

        page.goto(
            url,
            wait_until="networkidle"
        )

        page.screenshot(
            path=output_file,
            full_page=True
        )

        browser.close()