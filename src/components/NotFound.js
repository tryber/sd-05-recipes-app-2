import React from 'react';
import { useHistory } from 'react-router-dom';

export default function NotFound() {
  const history = useHistory();

  const redirectPage = () => {
    setTimeout(() => {
      history.push('/comidas');
    }, 30000);
  };

  return (
    <div className="notFound-page">
      <h3 className="notFound-text">Sorry, Not Found</h3>
      <img src="https://media.giphy.com/media/kGW0WGX4mJHXNvhgE6/giphy.gif" alt="Friends gif" />
      {redirectPage()}
    </div>
  );
}
