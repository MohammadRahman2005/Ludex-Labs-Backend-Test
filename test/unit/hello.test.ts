import { expect } from "chai"
import { Query } from "../../src/graphql/query"

describe("Unit Tests: hello Query", () => {
    it("should return 'world'", async () => {
        expect(Query.hello).to.be.a("function");
        
        // Type assertion to ensure TypeScript doesn't throw an error
        const result = await (Query.hello as Function)();  // Assert hello is a function and call it
        expect(result).to.equal("world");
    });
});
