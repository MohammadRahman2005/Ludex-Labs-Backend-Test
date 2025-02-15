import { expect } from "chai";
import { Mutation } from "../../src/graphql/mutation"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

// Another alternative would be to mock the db
describe("Unit Tests: Mutation", () => {
    it("should create a new todo and then delete it afterwards", async () => {
        const input = { title: "Testing Todo", dueDate: "2025-02-15T00:00:00Z" };
        const result = await (Mutation.createTodo as Function)(null, { input }, { prisma });

        expect(result).to.have.property("id");
        expect(result.title).to.equal(input.title);
        expect(result.dueDate).to.equal("2025-02-14 19:00::00");

        // Clean up
        const id = result.id 
        await (Mutation.deleteTodo as Function)(null, { id }, {prisma});
    }); 
});