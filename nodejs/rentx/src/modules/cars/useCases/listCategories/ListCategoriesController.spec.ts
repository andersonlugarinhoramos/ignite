import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app.";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection("localhost", "rentx_test");

    await connection.runMigrations();

    const id = uuidV4();

    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, "isAdmin", "createdAt", "updatedAt", "driverLicense")
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'now()', 'XXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to list all category ", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refreshToken } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category",
        description: "Category Supertest Description",
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
  });
});
