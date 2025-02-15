import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";
import { formatInTimeZone } from "date-fns-tz";

export const Query: IQuery<Context> = {
  hello: () => "world",
  todos: async (_, { filter, sort, limit, offset }, { prisma }) => {
    const whereClause = filter?.completed != null ? { completed: filter.completed } : undefined;
    const orderByClause = sort?.createdAt ? { createdAt: sort.createdAt?.toLowerCase() as 'asc' | 'desc' }: undefined; 
    const todos = await prisma.todo.findMany({
      where: whereClause,
      orderBy: orderByClause,
      skip: offset || 0, // Skip the first offset items (default 0)
      take: limit || 10, // Limit the number of todos retrieved (default 10) 
    }); 
    return todos.map(todo => ({
      ...todo,
      createdAt: formatInTimeZone(todo.createdAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
      updatedAt: formatInTimeZone(todo.updatedAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
    }));
  },
  incompleteTodos: async (_, { limit, offset }, { prisma }) => {
    const todos = await prisma.todo.findMany({ 
      where: {completed: false},
      skip: offset || 0, 
      take: limit || 10,
    });
    return todos.map(todo => ({
      ...todo,
      createdAt: formatInTimeZone(todo.createdAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
      updatedAt: formatInTimeZone(todo.updatedAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
    }))
  },
  completedTodos: async (_, { limit, offset }, { prisma }) => {
    const todos = await prisma.todo.findMany({ 
      where: {completed: true},
      skip: offset || 0, 
      take: limit || 10,
    });
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
