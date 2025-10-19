import { expect, test } from "@playwright/test"

test("navigate to dashboard route", async ({ page }) => {
	await page.goto("http://localhost:4281/_dashboard")
	await expect(page).toHaveURL(/\/_dashboard/)
	await expect(page.getByText("Your Dashboard")).toBeVisible()
})
