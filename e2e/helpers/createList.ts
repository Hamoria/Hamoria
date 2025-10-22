import { expect, type Page, test } from "@playwright/test"

export async function createList(page: Page, listName: string, listDescription: string) {
	await test.step("create a new list", async () => {
		await page.getByLabel("User Profile").click()
		await page.getByRole("link", { name: "Create New List" }).click()
		await page.getByLabel("Name").fill(listName)
		await page.getByLabel("Description").fill(listDescription)
		await page.getByRole("button", { name: "Continue" }).click()
	})
}

export async function openLists(page: Page, name = "My Lists") {
	//...
}

/**
 * use fixture instead of beforeEach
 */
// import { test, expect } from "@playwright/test"
// import { addMovie, createList, openLists } from "../helpers/list-utilities"

// // Before each test, navigate to the base URL, create a list, and open the lists page
// test.beforeEach(async ({ page }) => {
// 	await page.goto("")
// 	await createList(page, "my favorite movies", "here is a list of my favorite movies")
// 	await openLists(page)
// })

// test("should edit an existing list", async ({ page }) => {
// 	await page.getByRole("link", { name: "my favorite movies" }).click()
// 	await page.getByRole("link", { name: "Edit" }).click()
// 	// ...
// })

// test("should add and delete movies from a list", async ({ page }) => {
// 	await page.getByRole("link", { name: "my favorite movies" }).click()
// 	await page.getByRole("button", { name: "Add/Remove Movies" }).click()
// 	//...
// })
