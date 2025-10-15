import { Entity, ManyToOne, Property } from "@mikro-orm/mongodb"

import { Record } from "./Record"
import { User } from "./User"

@Entity()
export class Passkey extends Record {
	/**
	 * The name of the passkey
	 */
	@Property({ type: "string", nullable: true, default: null })
	name?: string

	/**
	 * The public key of the passkey
	 */
	@Property({ type: "string" })
	publicKey!: string

	/**
	 * The unique identifier of the registered credential
	 */
	@Property({ type: "string" })
	credentialID!: string

	/**
	 * The counter of the passkey
	 */
	@Property({ type: "integer", unsigned: true, default: 0 })
	counter!: number

	/**
	 * The type of device used to register the passkey
	 */
	@Property({ type: "string" })
	deviceType!: string

	/**
	 * Whether the passkey is backed up
	 */
	@Property({ type: "boolean" })
	backedUp!: boolean

	/**
	 * The transports used to register the passkey
	 */
	@Property({ type: "string" })
	transports!: string

	/**
	 * Authenticator's Attestation GUID indicating the type of the authenticator
	 */
	@Property({ type: "string", nullable: true })
	aaguid?: string

	/**
	 * The user associated with the passkey
	 */
	@ManyToOne(() => User, { eager: true })
	user!: string
}
