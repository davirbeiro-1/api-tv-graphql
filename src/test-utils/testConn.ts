import { Sequelize } from "sequelize-typescript";
import { models } from "../utils/models";
export async function testConnect() {
    const testConnection = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });
    testConnection.addModels(models)
    await testConnection.sync()
    return testConnection
}