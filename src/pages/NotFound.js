import React, { useState } from 'react';
import { useRouteError } from 'react-router-dom';
import PostPopup from '../components/Popup';

function ErrorPage() {
  const error = useRouteError();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <PostPopup open={true} closePopup={() => {}}  />
    </div>
  );
}

export default ErrorPage;
