// import { PrimaryKey } from "@mikro-orm/mongodb"
// import { v7 as uuidV7 } from "uuid"

import type { ObjectId } from "@mikro-orm/mongodb"
import { Entity, PrimaryKey, SerializedPrimaryKey } from "@mikro-orm/mongodb"

@Entity()
export abstract class Node {
	@PrimaryKey()
	_id!: ObjectId

	@SerializedPrimaryKey()
	id!: string // a string representation, virtual in the entity
}

// export abstract class Node {
// 	@PrimaryKey({ type: "uuid" })
// 	readonly id: string = uuidV7()
// }
