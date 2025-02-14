export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
  }

  input CreateTodoInput {
    title: String!
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    completed: Boolean
  }

  type Something {
    id: ID!
    name: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput): Todo!
    deleteTodo(id: ID!): Boolean!
  }

  type Query {
    hello: String
    todos: [Todo!]!
    incompleteTodos: [Todo!]!
    completedTodos: [Todo!]!
    todo(id: ID!): Todo
  }
`;
