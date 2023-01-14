import React, { useState } from 'react';
import { useRouteError } from 'react-router-dom';
import Popup from '../components/Popup';

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
      <Popup
        title="Create a post"
        helperText="Write something for your post"
        open={open}
        closePopup={() => setOpen(false)}
        actionButtonHandler={() => setOpen(false)}
        actionButtonText="Publish"
        content={<div>Hello</div>}
      />
    </div>
  );
}

export default ErrorPage;
