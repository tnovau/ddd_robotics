import { MongoClient } from 'mongodb';

/**
 * @param {string} mongoUri
 */
export const createClient = (mongoUri) => new MongoClient(mongoUri);