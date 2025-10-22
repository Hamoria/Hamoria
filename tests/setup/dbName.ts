// import { v7 } from "uuid"

import * as math from "mathjs"

// biome-ignore lint: We need to check env vars
process.env.DB_NAME = `eri_test_${math.floor(Math.random() * 10000)}`
