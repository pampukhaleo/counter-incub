import React from 'react'

import '../counter.css'
import { Button } from '../../Button/Button';

type PropsType = {
  setError: (text: string) => void
  error: string
  counterValue: number
  incrementValue: () => void
  resetValue: () => void
  disabled: boolean
}
export const SecondCounter = ({ setError,
                                error,
                                counterValue,
                                incrementValue,
                                resetValue,
                                disabled
                              }: PropsType) => {
  // const [show, setShow] = useState<boolean>(false);

  console.log(disabled);

  return (
    <div className="counter-container">
      <div className="value-container">
        <span className={ `value ${ disabled && 'red' }` }>{ counterValue }</span>
      </div>

      <div className="button-container">
        <Button name="inc" disabled={ disabled } callBack={ incrementValue }/>
        <Button name="reset" disabled={ counterValue === 0  && !disabled } callBack={ resetValue }/>
      </div>
    </div>
  )
}
