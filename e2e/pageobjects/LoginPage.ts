import type { Locator, Page } from "@playwright/test"

export class LoginPage {
	constructor(private page: Page) {}
	private usernameInput = this.page.locator("#username")
	private passwordInput = this.page.locator("#password")
	private loginButton = this.page.locator('button[type="submit"]')
	async login(username: string, password: string) {
		await this.usernameInput.fill(username)
		await this.passwordInput.fill(password)
		await this.loginButton.click()
	}
}

export class Login {
	readonly page: Page
	readonly username: Locator
	readonly password: Locator
	readonly signIn: Locator

	constructor(page: Page) {
		this.page = page
		this.username = page.locator('(//input[@id="outlined-name"])[1]')
		this.password = page.locator('(//input[@id="outlined-name"])[2]')
		this.signIn = page.locator('(//span[normalize-space()="SIGN IN"])[1]')
	}

	async goto() {
		await this.page.goto("https://charlyautomatiza.github.io/task-management-frontend")
	}

	async sigIn(username: string, password: string) {
		await this.username.fill(username)
		await this.password.fill(password)
		await this.signIn.click()
	}
}
