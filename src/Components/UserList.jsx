import { useContext, useState } from 'react';
import { UserData } from '../context/UserData';
import EditUserForm from './EditUserForm';
import '../css/style.css'

const UserList = () => {
  const { users, addUser, editUser, deleteUser } = useContext(UserData);
  const [newUser, setNewUser] = useState({});
  const [editUserId, setEditUserId] = useState(null);

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      setNewUser({}); // Reset newUser to clear input fields
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEdit = (id) => {
    setEditUserId(id);
  };

  const handleEditUser = async (id, updatedUserData) => {
    try {
      await editUser(id, updatedUserData);
      setEditUserId(null);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-3 text-center">User List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>
                <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(user.id)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUserId && (
        <EditUserForm
          user={users.find(user => user.id === editUserId)}
          onSave={(updatedUserData) => handleEditUser(editUserId, updatedUserData)}
          onCancel={() => setEditUserId(null)}
        />
      )}
      <h2 className="mt-3 text-center">Add New User</h2>
      <div className="form-group">
        <input type="text" className="form-control mb-2" value={newUser.name || ''} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Enter name" />
        <input type="text" className="form-control mb-2" value={newUser.username || ''} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} placeholder="Enter username" />
        <input type="email" className="form-control mb-2" value={newUser.email || ''} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="Enter email" />
        <input type="text" className="form-control mb-2" value={newUser.phone || ''} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} placeholder="Enter phone" />
        <input type="text" className="form-control mb-2" value={newUser.website || ''} onChange={(e) => setNewUser({ ...newUser, website: e.target.value })} placeholder="Enter website" />
        <button className="btn btn-success" onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserList;
