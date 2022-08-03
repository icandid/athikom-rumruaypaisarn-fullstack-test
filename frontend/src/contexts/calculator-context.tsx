import * as React from 'react'
import {add, subtract, multiply, divide} from '../utils/calculator'

const CalculatorOperations = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
  '=': (_prevValue: number, nextValue: number) => nextValue,
}

type SetState = React.Dispatch<Partial<State>>
export type Operator = keyof typeof CalculatorOperations
interface State {
  value: number | null
  displayValue: string
  operator: Operator | null
  waitingForOperand: boolean
}

const CalculatorContext = React.createContext<
  {state: State; setState: SetState} | undefined
>(undefined)

function calculatorReducer(currentState: State, newState: Partial<State>) {
  return {
    ...currentState,
    ...newState,
  }
}

interface Props {
  children: React.ReactNode
}

const initialState = {
  value: null,
  displayValue: '0',
  operator: null,
  waitingForOperand: false,
}

function CalculatorProvider({children}: Props) {
  const [state, setState] = React.useReducer(calculatorReducer, {
    ...initialState,
  })
  const value = {state, setState}
  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  )
}

function useCalculator() {
  const context = React.useContext(CalculatorContext)
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider')
  }
  return context
}

export {CalculatorProvider, useCalculator, CalculatorOperations}
