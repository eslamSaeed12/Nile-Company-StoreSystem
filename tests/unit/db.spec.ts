import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm'

let con: Awaited<Connection>;


beforeAll(async () => {
    con = await createConnection();
})

test('Trying connect DB', () => {
    expect(con.isConnected).toBeTruthy()
})



afterAll(async () => {
    await con.close();
})