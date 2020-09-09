import React, { useState } from 'react';
import AppContext from './AppContext';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const estados = {
    email,
    password,
    setEmail,
    setPassword,
  };

  return (
    <AppContext.Provider value={estados}>
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
