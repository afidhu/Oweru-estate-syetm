import { useEffect, useRef, useState } from 'react'

interface ResponsiveSelectProps {
  value: string
  placeholder: string
  options: string[]
  disabled?: boolean
  onChange: (value: string) => void
  getLabel?: (value: string) => string
}

export default function ResponsiveSelect({
  value, placeholder, options, disabled, onChange, getLabel = (option) => option,
}: ResponsiveSelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  return (
    <div className="oweru-location-select" ref={containerRef}>
      <button
        type="button"
        className={`form-select oweru-location-select-trigger ${disabled ? 'disabled' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value ? getLabel(value) : placeholder}</span>
      </button>
      {open && !disabled && (
        <div className="oweru-location-select-menu" role="listbox">
          <button type="button" className={`oweru-location-option ${!value ? 'selected' : ''}`} onClick={() => { onChange(''); setOpen(false) }}>
            {placeholder}
          </button>
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={option === value}
              className={`oweru-location-option ${option === value ? 'selected' : ''}`}
              key={option}
              onClick={() => { onChange(option); setOpen(false) }}
            >
              {getLabel(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
