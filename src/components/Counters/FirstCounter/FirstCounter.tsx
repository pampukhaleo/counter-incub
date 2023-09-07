import React, { ChangeEvent, useEffect, useState } from 'react'

import '../counter.css'
import { Button } from '../../Button/Button';

type PropsType = {
  setError: (text: string) => void
  error: string
}
export const FirstCounter = ({ setError, error }: PropsType) => {
  const [counterValue, setCounterValue] = useState<number>(0);
  const [startValue, setStartValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(1);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const getCounterValue = localStorage.getItem('counterValue')
    const getStartValue = localStorage.getItem('startValue')
    const getMaxValue = localStorage.getItem('maxValue')

    if (getCounterValue && getStartValue && getMaxValue) {
      const stringCounterValue = JSON.parse(getCounterValue)
      setCounterValue(stringCounterValue)

      const stringStartValue = JSON.parse(getStartValue)
      setStartValue(stringStartValue)

      const stringMaxValue = JSON.parse(getMaxValue)
      setMaxValue(stringMaxValue)
      //if after restart value >= maxValue - we can increment no more
      if (stringCounterValue === stringMaxValue) {
        setDisabled(true)
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('counterValue', JSON.stringify(counterValue))
    localStorage.setItem('startValue', JSON.stringify(startValue))
    localStorage.setItem('maxValue', JSON.stringify(maxValue))
  }, [counterValue, startValue, maxValue]);

  const incrementValue = () => {
    //increment value
    setCounterValue(counterValue + 1)
    //if value >= maxValue - we can increment no more
    setDisabled(counterValue >= (maxValue - 1))
  }

  const resetValue = () => {
    //we go back to saved start value
    setCounterValue(startValue)
    //setting disabled value to initial - false. (if not we have a bug where increment button stays disabled if value reached maxValue)
    setDisabled(false)
  }

  const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
    setStartValue(+e.currentTarget.value)
    //validation
    setError(+e.currentTarget.value < 0 || +e.currentTarget.value >= maxValue ? 'Incorrect values. Please change input numbers' : '')
  }

  const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(+e.currentTarget.value)
    //validation
    setError(+e.currentTarget.value < 0 || +e.currentTarget.value <= startValue || startValue < 0 ? 'Incorrect values. Please change input numbers' : '')
  }

  const showInputs = () => {
    setShow(!show)
    //if disabled === true then change disabled to false in order to make reset button always disabled while we are in showInputs mode
    if (disabled) {
      setDisabled(!disabled)
    }
  }

  const saveValues = () => {
    setShow(!show)
    setCounterValue(startValue)
  }

  return (
    <div className="counter-container">
      {
        show
          ? <div className="start-end-container">
            <input value={ startValue } onChange={ changeStartValue } type="number" placeholder="set start value"
                   className={ `${ startValue < 0 && 'red-input' } ${ startValue >= maxValue && 'red-input' }` }/>
            <input value={ maxValue } onChange={ changeMaxValue } type="number" placeholder="set end value"
                   className={ `${ maxValue < 0 && 'red-input' } ${ maxValue <= startValue && 'red-input' }` }/>
          </div>
          : <div className="value-container">
            <span className={ `value ${ disabled && 'red' }` }>{ counterValue }</span>
          </div>
      }
      <div className="button-container">
        {
          show
            ? null
            : <>
              <Button name="inc" disabled={ disabled || show } callBack={ incrementValue }/>
              <Button name="reset" disabled={ counterValue === 0 || show && !disabled } callBack={ resetValue }/>
            </>
        }

        {
          show
            ? <Button name="save values" disabled={ error !== '' } callBack={ saveValues }/>
            : <Button name="set" callBack={ showInputs }/>
        }
      </div>
    </div>
  )
}
