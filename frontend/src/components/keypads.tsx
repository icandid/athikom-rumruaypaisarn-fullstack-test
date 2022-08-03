import React from 'react'
import {CalculatorKey} from './calculator-key'
import {
  useCalculator,
  Operator,
  CalculatorOperations,
} from '../contexts/calculator-context'

export function Keypads() {
  const {state, setState} = useCalculator()

  const {value, displayValue, operator, waitingForOperand} = state

  function handleKeyDown(event: KeyboardEvent) {
    let {key} = event
    if (key === 'Enter') key = '='

    if (/\d/.test(key)) {
      event.preventDefault()
      pressDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault()
      performOperation(key as Operator)
    }
    if (key === '.') {
      event.preventDefault()
      pressDot()
    }
    if (key === '%') {
      calculatePercentage()
    }
    if (key === 'Backspace') {
      event.preventDefault()
      clearLastChar()
    } else if (key === 'Escape') {
      event.preventDefault()
      if (displayValue === '0') {
        clearAll()
      } else {
        clearDisplay()
      }
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  function clearAll() {
    setState({
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
    })
  }

  function clearDisplay() {
    setState({
      displayValue: '0',
    })
  }

  function clearLastChar() {
    setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0',
    })
  }

  function toggleSign() {
    const newValue = parseFloat(displayValue) * -1
    setState({
      displayValue: String(newValue),
    })
  }

  function calculatePercentage() {
    const currentValue = parseFloat(displayValue)

    if (currentValue === 0) return

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100

    setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
    })
  }

  function pressDigit(digit: number) {
    if (waitingForOperand) {
      setState({
        displayValue: String(digit),
        waitingForOperand: false,
      })
    } else {
      setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      })
    }
  }

  function pressDot() {
    const hasDot = /\./.test(displayValue)
    if (!hasDot) {
      setState({
        displayValue: `${displayValue}.`,
        waitingForOperand: false,
      })
    }
  }

  function performOperation(nextOperator: Operator) {
    const inputValue = parseFloat(displayValue)

    if (value == null) {
      setState({
        value: inputValue,
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)

      setState({
        value: newValue,
        displayValue: String(newValue),
      })
    }

    setState({
      waitingForOperand: true,
      operator: nextOperator,
    })
  }

  const numsPad = [7, 8, 9, 4, 5, 6, 3, 2, 1]
  const operatorsPad: {
    key: Operator
    text: string
    className?: string
  }[] = [
    {
      key: '/',
      text: '÷',
    },
    {
      key: '*',
      text: '×',
    },
    {
      key: '-',
      text: '−',
    },

    {
      key: '=',
      text: '=',
      className: 'h-40',
    },
  ]
  const displayIsNonZero = displayValue !== '0'
  const clearText = displayIsNonZero ? 'C' : 'AC'

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3">
        {/* function-keys */}
        <div className="bg-neutral-600">
          <CalculatorKey
            onClick={() => (displayIsNonZero ? clearDisplay() : clearAll())}
          >
            {clearText}
          </CalculatorKey>
          <CalculatorKey onClick={toggleSign}>±</CalculatorKey>
          <CalculatorKey onClick={calculatePercentage}>%</CalculatorKey>
        </div>

        {/* digit-keys */}
        <div className="bg-neutral-500">
          {numsPad.map(num => {
            return (
              <CalculatorKey
                onClick={() => pressDigit(num)}
                key={`number-pad-${num}`}
              >
                {num}
              </CalculatorKey>
            )
          })}

          <CalculatorKey onClick={() => pressDigit(0)}>0</CalculatorKey>
          <CalculatorKey onClick={pressDot}>•</CalculatorKey>
          <CalculatorKey onClick={() => performOperation('+')} accent>
            +
          </CalculatorKey>
        </div>
      </div>

      {/* operator-keys */}
      <div>
        {operatorsPad.map(({key, text, className}) => (
          <CalculatorKey
            onClick={() => performOperation(key)}
            key={key}
            className={className}
            accent
          >
            {text}
          </CalculatorKey>
        ))}
      </div>
    </div>
  )
}
