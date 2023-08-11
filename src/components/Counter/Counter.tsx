import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'

import './counter.css'
import { Button } from '../Button/Button';

export const Counter = () => {
  const [counterValue, setCounterValue] = useState<number>(0);
  const [counterMaxValue, setCounterMaxValue] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const incrementValue = () => {
    setCounterValue(counterValue + 1)
    if (counterValue >= (counterMaxValue - 1)) {
      setDisabled(true)
    }
  }

  const resetValue = () => {
    setCounterValue(0)
    setDisabled(false)
  }

  const setStartValue = (e: ChangeEvent<HTMLInputElement>) => setCounterValue(+e.currentTarget.value)

  const setMaxValue = (e: ChangeEvent<HTMLInputElement>) => setCounterMaxValue(+e.currentTarget.value)

  return (
    <div className="counter-container">
      <div className="start-end-container">
        <input onChange={ setStartValue } type="text" placeholder="set start value"/>
        <input value={ counterMaxValue } onChange={ setMaxValue } type="text" placeholder="set end value"/>
      </div>
      <div className="value-container">
        <span className={ `value ${ disabled && 'red' }` }>{ counterValue }</span>
      </div>
      <div className="button-container">
        <Button name="inc" disabled={ disabled } callBack={ incrementValue }/>
        <Button name="reset" disabled={ counterValue === counterMaxValue && !disabled} callBack={ resetValue }/>
      </div>
    </div>
  )
}
