import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";
import { formatInTimeZone } from "date-fns-tz";
import { Prisma } from "@prisma/client"

export const Query: IQuery<Context> = {
  hello: () => "world",
  todos: async (_, { filter, sort, limit, offset }, { prisma }) => {
    const now = new Date();

    const where: Prisma.TodoWhereInput = {};
    if (filter?.completed !== undefined && filter.completed !== null) {
      where.completed = filter.completed;
    }
    if (filter?.overdue) {
      where.dueDate = { lt: now };
    }
    if (filter?.upcoming) {
      where.dueDate = { gte: now };
    }

    const orderBy: Prisma.TodoOrderByWithRelationInput = {};
    if (sort?.createdAt) {
      orderBy.createdAt = sort.createdAt.toLowerCase() as Prisma.SortOrder;
    }

    if (sort?.dueDate) {
      orderBy.dueDate = sort.dueDate.toLowerCase() as Prisma.SortOrder;
    }

    const todos = await prisma.todo.findMany({
      where,
      orderBy,
      skip: offset || 0, // Skip the first offset items (default 0)
      take: limit || 10, // Limit the number of todos retrieved (default 10) 
    }); 
    return todos.map(todo => ({
      ...todo,
      createdAt: formatInTimeZone(todo.createdAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
      updatedAt: formatInTimeZone(todo.updatedAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
      dueDate: todo.dueDate ? formatInTimeZone(todo.dueDate, "America/New_York", "yyyy-MM-dd HH:mm::ss") : null
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
      dueDate: todo.dueDate ? formatInTimeZone(todo.dueDate, "America/New_York", "yyyy-MM-dd HH:mm::ss") : null
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
      dueDate: todo.dueDate ? formatInTimeZone(todo.dueDate, "America/New_York", "yyyy-MM-dd HH:mm::ss") : null
    }))
  },
  todo: async(_, { id }, { prisma }) => {
    const todo = await prisma.todo.findUnique({ where: { id }});
    if (!todo)  throw new Error("Todo not found");
    return {
      ...todo,
      createdAt: formatInTimeZone(todo.createdAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
      updatedAt: formatInTimeZone(todo.updatedAt, "America/New_York", "yyyy-MM-dd HH:mm::ss"),
      dueDate: todo.dueDate ? formatInTimeZone(todo.dueDate, "America/New_York", "yyyy-MM-dd HH:mm::ss") : null
    }
  },
};
