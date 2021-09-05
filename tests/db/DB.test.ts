import fs from 'fs';
import { DBActions } from '../../lib/DBActions';
import { test } from '@playwright/test'

const dbCredentials = JSON.parse(fs.readFileSync(`./testData.json`, `utf-8`));

test('Connect to Postgres DB', async () => {
    const dbConnection = new DBActions();
    await dbConnection.connectDB(dbCredentials.dbUsername, dbCredentials.dbPassword, dbCredentials.dbServerName,
        dbCredentials.dbPort, dbCredentials.dbName);
    const query = await dbConnection.query(`SELECT * FROM TABLE`);
});