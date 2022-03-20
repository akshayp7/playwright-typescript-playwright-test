import { testConfig } from '../../testConfig';
import { DBActions } from '@lib/DBActions';
import { test } from '@playwright/test'

test('Connect to Postgres DB', async () => {
    const dbConnection = new DBActions();
    await dbConnection.connectDB(testConfig.dbUsername, testConfig.dbPassword, testConfig.dbServerName,
        testConfig.dbPort, testConfig.dbName);
    await dbConnection.query(`SELECT * FROM TABLE`);
});