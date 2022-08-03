import {CalculatorProvider} from './contexts/calculator-context'
import {Calculator} from './components/calculator'

function App() {
  return (
    <div className="bg-slate-800 h-screen pt-20">
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    </div>
  )
}

export default App
