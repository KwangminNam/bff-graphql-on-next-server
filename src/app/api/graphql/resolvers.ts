interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
}

interface User {
  id: string;
  name: string;
  password: string;
  email: string;
}

let users: User[] = [
  { id: '1', name: 'kwangmin', password: 'password123', email: 'john@example.com' },
  { id: '2', name: 'yujoo', password: 'password456', email: 'jane@example.com' },
];

let todos: Todo[] = [
  { id: '1', title: '육아하기', completed: false, userId: '1' },
  { id: '2', title: '공부하기', completed: false, userId: '1' },
  { id: '3', title: '운동하기', completed: false, userId: '2' },
];

export const resolvers = {
  Query: {
    todos: () => todos,
    todo: (_: any, { id }: { id: string }) => todos.find(todo => todo.id === id),
    users: () => users,
    user: (_: any, { id }: { id: string }) => users.find(user => user.id === id),
  },
  Mutation: {
    createTodo: (_: any, { title, userId }: { title: string, userId: string }) => {
      const newTodo = {
        id: String(todos.length + 1),
        title,
        completed: false,
        userId,
      };
      todos.push(newTodo);
      return newTodo;
    },
    updateTodo: (_: any, { id, title, completed }: { id: string; title?: string; completed?: boolean }) => {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) throw new Error('Todo not found');

      const updatedTodo = {
        ...todos[todoIndex],
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
      };

      todos[todoIndex] = updatedTodo;
      return updatedTodo;
    },
    deleteTodo: (_: any, { id }: { id: string }) => {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) throw new Error('Todo not found');

      todos = todos.filter(todo => todo.id !== id);
      return true;
    },
  },
  Todo: {
    user: (parent: Todo) => users.find(user => user.id === parent.userId),
  },
  User: {
    todos: (parent: User) => todos.filter(todo => todo.userId === parent.id),
  },
}; 