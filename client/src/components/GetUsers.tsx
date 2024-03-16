import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';
const GetUsers = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>...Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <table>
      <caption>Users</caption>
      <thead>
        <tr>
          <th scope="col">User ID</th>
          <th scope="col">User name</th>
          <th scope="col">User email</th>
        </tr>
      </thead>
      <tbody>
        {data.users.map(({ _id, username, email }: { _id: string, username: string, email: string }) => (
          <tr key={_id}>
            <td>{_id}</td>
            <td>{username}</td>
            <td>{email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default GetUsers;