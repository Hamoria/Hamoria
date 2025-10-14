const checkDependencies = () => {
	const requiredDeps = ["@mikro-orm/core", "@mikro-orm/migrations", "typescript"]

	const pkg = import("./package.json")
	const missing = requiredDeps.filter(
		(dep) => !((pkg.dependencies && pkg.dependencies[dep]) || (pkg.devDependencies && pkg.devDependencies[dep]))
	)

	if (missing.length > 0) {
		throw new Error(`Missing dependencies: ${missing.join(", ")}`)
	}
	// console.log("All required dependencies are present!")
}
checkDependencies()
