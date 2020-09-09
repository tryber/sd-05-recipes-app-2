import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [searchBarOn, setSearchBarOn] = useState(false);
  const estados = {
    email,
    password,
    setEmail,
    setPassword,
    searchBarOn,
    setSearchBarOn,
  };

  return (
    <AppContext.Provider value={estados}>
      {children}
    </AppContext.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
