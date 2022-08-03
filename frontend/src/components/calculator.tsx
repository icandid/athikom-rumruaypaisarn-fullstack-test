import {CalculatorDisplay} from './calculator-display'
import {Keypads} from './keypads'

export function Calculator() {
  return (
    <div className="w-[320px] shadow-lg rounded-lg relative overflow-hidden mx-auto">
      <CalculatorDisplay />
      <Keypads />
    </div>
  )
}
