interface CalculatorKeyProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
  accent?: boolean
}

export function CalculatorKey(props: CalculatorKeyProps) {
  const {children, className = '', onClick, accent = false} = props

  const bgColor = accent ? 'bg-amber-500' : ''
  return (
    <button
      className={`w-20 h-20 text-white text-3xl leading-[5rem] border-t border-r border-neutral-800 focus:ring-1 ring-black ring-inset outline-0 ${bgColor} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
