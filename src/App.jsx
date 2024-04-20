
import { UserProvider } from './context/UserData';
import UserList from './Components/UserList';
// import AddUserForm from './pages/AddUserForm';

const App = () => {
  return (
    <UserProvider>
      <div>
        <h1 className='text-center'>User Management System</h1>
        <UserList />
      </div>
    </UserProvider>
  );
};

export default App;
