import React from 'react'
import './button.css'

type PropsType = {
  name: string
  disabled?: boolean
  callBack: () => void
}

export const Button: React.FC<PropsType> = (props) => {
  const { name, disabled, callBack } = props
  return (
    <button onClick={callBack} className="button" disabled={ disabled }>{ name }</button>
  )
}
