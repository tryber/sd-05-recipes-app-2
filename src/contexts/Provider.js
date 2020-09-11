import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selecCategory, setSelecCategory] = useState('');
  const [selectedId, setSelectedId] = useState('');

  console.log(selectedId);

  const [searchBarOn, setSearchBarOn] = useState(false);
  const estados = {
    email,
    password,
    setEmail,
    setPassword,
    searchBarOn,
    setSearchBarOn,
    filteredData,
    setFilteredData,
    selecCategory,
    setSelecCategory,
    setSelectedId,
  };

  return <AppContext.Provider value={estados}>{children}</AppContext.Provider>;
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
