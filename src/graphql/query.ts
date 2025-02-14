import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
  todos: async (_, __, { prisma }) => {
    const todos = await prisma.todo.findMany(); 
    return todos.map(todo => ({
      ...todo,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.createdAt.toISOString(),

    }));
  },
  incompleteTodos: async (_, __, { prisma }) => {
    const todos = prisma.todo.findMany({ where: {completed: false}});
    return (await todos).map(todo => ({
      ...todo,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.createdAt.toISOString(),
    }))
  },
};
