import { useMutation } from '@apollo/client';
import {GET_USERS, ADD_USER} from '../graphql/queries';

const AddUser = () => {
    let inputName: HTMLInputElement | null;
    let inputPassword: HTMLInputElement | null;
    let inputEmail: HTMLInputElement | null;

    const [addUser, { loading, error, client }] = useMutation(ADD_USER);

    if (loading) return <p>'Submitting...'</p>;

    return (
      <div>
        {error && <p>`Submission error! ${error.message}`</p>}
        <form
          onSubmit={e => {
            e.preventDefault();
            addUser({
              variables: { 
                username: inputName?.value, 
                password: inputPassword?.value, 
                email: inputEmail?.value 
                },
              refetchQueries: [{ query: GET_USERS }],      
              onError: () => client.refetchQueries({ include: [GET_USERS] })
            });
          }}
        >
          <input
            ref={node => { inputName = node; }}
            placeholder='Name'
            required
          />
          <input
            ref={node => { inputPassword = node; }}
            placeholder='Password'
            required
          />
          <input
            type='email'
            ref={node => { inputEmail = node; }}
            placeholder='Email'
            required
          />
          <button type="submit">Add User</button>
        </form>
      </div>
    );
  }

  export default AddUser;