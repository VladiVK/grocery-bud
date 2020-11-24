import React, { useEffect } from 'react';

const ALert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeoutID = setTimeout(() => removeAlert(), 3000);
    return () => clearTimeout(timeoutID);
  }, [list]); //иначе таймер может длиться менее 3 секунд

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default ALert;
