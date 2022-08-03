import React from 'react'

function getScale(node: HTMLElement) {
  if (!node) {
    return 1
  }

  const parentNode = node.parentNode as unknown as HTMLElement
  const availableWidth = parentNode.offsetWidth
  const actualWidth = node.offsetWidth
  const actualScale = availableWidth / actualWidth

  if (actualScale < 1) {
    return actualScale * 0.9
  }

  return 1
}

interface AutoScalingTextProps {
  children: React.ReactNode
}

export function AutoScalingText({children}: AutoScalingTextProps) {
  const nodeRef = React.useRef(null)
  const scale = getScale(nodeRef.current!)
  return (
    <div
      className="absolute right-0 origin-right px-6 text-8xl text-white font-light leading-[8rem]"
      data-testid="total"
      ref={nodeRef}
      style={{transform: `scale(${scale},${scale})`}}
    >
      {children}
    </div>
  )
}
