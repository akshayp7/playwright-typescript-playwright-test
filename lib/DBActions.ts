import type { Client } from 'pg';

let pgClient: Client;

export class DBActions {

    async connectDB(dbUsername: string, dbPassword: string, dbServerName: string, dbPort: string, dbName: string) {
        const connectionString = `postgres://${dbUsername}:${dbPassword}@${dbServerName}:${dbPort}/${dbName}`;
        pgClient = await new pgClient(connectionString);
        await pgClient.connect();
    }

    async query(queryString: string): Promise<void> {
        return pgClient.query(queryString);
    }
}