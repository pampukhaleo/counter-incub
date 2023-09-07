import React, { ChangeEvent } from 'react'
import { Button } from '../../Button/Button';

type PropsType = {
  setError: (text: string) => void
  error: string
  startValue: number
  maxValue: number
  changeStartValue: (e: ChangeEvent<HTMLInputElement>) => void
  changeMaxValue: (e: ChangeEvent<HTMLInputElement>) => void
  saveValues: () => void
}

export const SetComponent = ({
                               setError,
                               error,
                               startValue,
                               maxValue,
                               changeStartValue,
                               changeMaxValue,
                               saveValues
                             }: PropsType) => {

  return (
    <div className="set-container">
      <div className="start-end-container">
        <input value={ startValue } onChange={ changeStartValue } type="number" placeholder="set start value"
               className={ `${ startValue < 0 && 'red-input' } ${ startValue >= maxValue && 'red-input' }` }/>
        <input value={ maxValue } onChange={ changeMaxValue } type="number" placeholder="set end value"
               className={ `${ maxValue < 0 && 'red-input' } ${ maxValue <= startValue && 'red-input' }` }/>
      </div>
      <div className="button-container">
        <Button name="save values" disabled={ error !== '' } callBack={ saveValues }/>
      </div>
    </div>
  )
}
