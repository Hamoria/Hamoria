import type { Page } from "@playwright/test"
export async function selectDropdownValue(page: Page, selector: string, value: string) {
	await page.locator(selector).click()
	await page.locator(`text="${value}"`).click()
}
