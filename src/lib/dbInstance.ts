import mongoose from 'mongoose';
import type {globalThis} from '../../globals'
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as unknown as globalThis).mongoose

if (!cached) {
    cached = (global as unknown as globalThis).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise && MONGODB_URI) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default dbConnect