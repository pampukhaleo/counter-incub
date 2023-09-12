import React, { useState } from 'react'
import { FirstCounter } from './FirstCounter';

export const FirstCounterContainer = () => {
  const [error, setError] = useState<string>('');

  return (
    <>
      {
        <h1 className={ `${error ? 'error' : 'hide'}` }>{ error }</h1>
      }
      <FirstCounter setError={ setError } error={ error }/>
    </>
  )
}
