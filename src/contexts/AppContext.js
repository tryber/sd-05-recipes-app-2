import { createContext } from 'react';

const AppContext = createContext();

export default AppContext;


const { setData, setLoading, loading } = useContext(StarWarsContext);
const getData = (response) => {
  setLoading(true);
  setData([...response.results]);
  setLoading(false);
};
