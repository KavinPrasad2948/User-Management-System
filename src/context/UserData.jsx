import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const UserData = createContext(); // Define UserData here

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(false); // Add fetching state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setFetching(true); // Set fetching to true when fetching starts
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setFetching(false); // Set fetching to false when fetching completes
    }
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const editUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
      const updatedUsers = users.map(user => (user.id === id ? response.data : user));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <UserData.Provider value={{ users, fetching, fetchUsers, addUser, editUser, deleteUser }}>
      {children}
    </UserData.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is required and must be a node
};

export { UserProvider, UserData }; // Export UserData
