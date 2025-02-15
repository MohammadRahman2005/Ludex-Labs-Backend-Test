import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";
import { formatInTimeZone } from "date-fns-tz";

export const Query: IQuery<Context> = {
  hello: () => "world",
  todos: async (_, __, { prisma }) => {
    const todos = await prisma.todo.findMany(); 
    return todos.map(todo => ({
      ...todo,
      createdAt: formatInTimeZone(todo.createdAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
      updatedAt: formatInTimeZone(todo.updatedAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
    }));
  },
  incompleteTodos: async (_, __, { prisma }) => {
    const todos = await prisma.todo.findMany({ where: {completed: false}});
    return todos.map(todo => ({
      ...todo,
      createdAt: formatInTimeZone(todo.createdAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
      updatedAt: formatInTimeZone(todo.updatedAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
    }))
  },
  completedTodos: async (_, __, { prisma }) => {
    const todos = await prisma.todo.findMany({ where: {completed: true}});
    return todos.map(todo => ({
      ...todo,
      createdAt: formatInTimeZone(todo.createdAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
      updatedAt: formatInTimeZone(todo.updatedAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
    }))
  },
  todo: async(_, { id }, { prisma }) => {
    const todo = await prisma.todo.findUnique({ where: { id }});
    if (!todo)  throw new Error("Todo not found");
    return {
      ...todo,
      createdAt: formatInTimeZone(todo.createdAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
      updatedAt: formatInTimeZone(todo.updatedAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
    }
  },
};
