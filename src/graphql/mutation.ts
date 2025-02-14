import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";

export const Mutation: IMutation<Context> = {
  createSomething: async (_, { input }, { prisma }) => {
    const something = await prisma.something.create({
      data: {
        name: input.name,
      },
    });

    return {
      id: something.id,
      name: something.name,
    };
  },
  createTodo: async (_, { input }, { prisma }) => {
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
        completed: false,
      },
    });

    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    };
  },
  updateTodo: async (_, { input }, { prisma }) => {
    if (!input){
      throw new Error("Input is required")
    }
    const { id, title, completed } = input;

    const updatedData: any = {};
    if (title !== undefined && title !== null) {
      updatedData.title = title;
    }
    if (completed !== undefined && completed !== null) {
      updatedData.completed = completed;
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: updatedData,
    });
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    }
  },
};
