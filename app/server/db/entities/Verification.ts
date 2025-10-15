import { Entity, Property } from "@mikro-orm/mongodb"

import { Record } from "./Record"

@Entity()
export class Verification extends Record {
	/**
	 * Unique identifier for each verification
	 */
	@Property<Verification>({ type: "string" })
	identifier!: string

	/**
	 * The value to be verified
	 */
	@Property<Verification>({ type: "string" })
	value!: string

	/**
	 * The time when the verification request expires
	 */
	@Property<Verification>({ type: "datetime" })
	expiresAt!: Date
}
