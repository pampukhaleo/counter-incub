import React, { ChangeEvent, useEffect, useState } from 'react'
import { SecondCounter } from './SecondCounter';
import { SetComponent } from './SetComponent';

export const SecondCounterContainer = () => {
  const [error, setError] = useState<string>('');
  const [counterValue, setCounterValue] = useState<number>(0);
  const [startValue, setStartValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(1);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const getCounterValue = localStorage.getItem('secondCounterValue')
    const getStartValue = localStorage.getItem('secondStartValue')
    const getMaxValue = localStorage.getItem('secondMaxValue')

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
    localStorage.setItem('secondCounterValue', JSON.stringify(counterValue))
    localStorage.setItem('secondStartValue', JSON.stringify(startValue))
    localStorage.setItem('secondMaxValue', JSON.stringify(maxValue))
  }, [counterValue, startValue, maxValue]);

  const incrementValue = () => {
    //increment value
    setCounterValue(counterValue + 1)
    //if value >= maxValue - we can increment no more
    setDisabled(counterValue === (maxValue - 1))
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

  const resetValue = () => {
    //we go back to saved start value
    setCounterValue(startValue)
    //setting disabled value to initial - false. (if not we have a bug where increment button stays disabled if value reached maxValue)
    setDisabled(false)
  }

  const saveValues = () => {
    setCounterValue(startValue)
    setDisabled(false)
  }

  return (
    <div className="second-container">
      <SetComponent setError={ setError }
                    error={ error }
                    startValue={ startValue }
                    maxValue={ maxValue }
                    changeStartValue={ changeStartValue }
                    changeMaxValue={ changeMaxValue }
                    saveValues={ saveValues }
      />
      <SecondCounter setError={ setError }
                     error={ error }
                     counterValue={ counterValue }
                     incrementValue={ incrementValue }
                     resetValue={ resetValue }
                     disabled={ disabled }

      />
    </div>
  )
}
