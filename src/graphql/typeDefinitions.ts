export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
  }

  input CreateTodoInput {
    title: String!
    dueDate: String
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    completed: Boolean
    dueDate: String
  }

  input TodoFilter {
    completed: Boolean
    overdue: Boolean
    upcoming: Boolean
  }

  enum SortOrder {
    ASC
    DESC
  }

  input TodoSort {
    createdAt: SortOrder
    dueDate: SortOrder
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
    dueDate: String
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput): Todo!
    deleteTodo(id: ID!): Boolean!
  }

  type Query {
    hello: String
    todos(filter: TodoFilter, sort: TodoSort, limit: Int, offset: Int): [Todo!]!
    incompleteTodos(limit: Int, offset: Int): [Todo!]!
    completedTodos(limit: Int, offset: Int): [Todo!]!
    todo(id: ID!): Todo
  }
`;
