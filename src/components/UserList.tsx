import { useQuery } from '@apollo/client';
import { GET_USERS } from './UserList.graphql';

export default function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-4">
        {data.users.map((user: any) => (
          <li key={user.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}