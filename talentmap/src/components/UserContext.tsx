import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';

interface UserContextType {
  users: User[];
  setUsers: (users: User[]) => void;
  addUsers: (newUsers: User[]) => void;
  saveUsers: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize users from localStorage or fallback to empty array
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const savedUsers = localStorage.getItem('users');
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
      return [];
    }
  });

  // Save users to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
    }
  }, [users]);

  const addUsers = (newUsers: User[]) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      
      newUsers.forEach(newUser => {
        const existingUserIndex = updatedUsers.findIndex(user => user.name === newUser.name);
        
        if (existingUserIndex !== -1) {
          // Update existing user with new information
          updatedUsers[existingUserIndex] = {
            ...updatedUsers[existingUserIndex],
            ...newUser,
            // Preserve the existing ID
            id: updatedUsers[existingUserIndex].id
          };
        } else {
          // Add new user
          updatedUsers.push(newUser);
        }
      });
      
      return updatedUsers;
    });
  };

  const saveUsers = () => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ users, setUsers, addUsers, saveUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};