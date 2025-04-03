'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo-client';
import TodoList from '@/components/TodoList';
import UserList from '@/components/UserList';

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <main className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Todo App</h1>
          <UserList />
          <div className="mb-16 mt-8" />
          <TodoList />
          
        </div>
      </main>
    </ApolloProvider>
  );
}
