'use client';

import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from './TodoList.graphql';
import { GET_TODOS } from './TodoList.graphql';

const GET_USERS_WITH_TODOS = gql`
  query GetUsersWithTodos {
    users {
      id
      name
      todos {
        id
        title
        completed
      }
    }
  }
`;

export default function TodoList() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { loading, error, data } = useQuery(GET_USERS_WITH_TODOS);
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    
    try {
      await createTodo({ variables: { title: newTodoTitle } });
      setNewTodoTitle('');
    } catch (err) {
      console.error('Error creating todo:', err);
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      await updateTodo({ variables: { id, completed: !completed } });
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo({ variables: { id } });
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <form onSubmit={handleCreateTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Add a new todo"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>

      <ul className="space-y-2">
        {data?.users.map((user: any) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <ul>
              {user.todos.map((todo: any) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id, todo.completed)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className={todo.completed ? 'line-through text-gray-500' : 'text-black'}>
                      {todo.title}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
} 