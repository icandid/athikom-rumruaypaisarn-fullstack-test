import {AutoScalingText} from './auto-scaling-text'
import {useCalculator} from '../contexts/calculator-context'

export function CalculatorDisplay() {
  const {state} = useCalculator()
  return (
    <div className="h-32 bg-neutral-800 relative">
      <AutoScalingText>{state.displayValue}</AutoScalingText>
    </div>
  )
}
