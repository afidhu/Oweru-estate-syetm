import { STEP_LABELS } from '../../types'
import { useLanguage } from '../../i18n'

interface StepperProps {
  currentStep: number // 0-based index into STEP_LABELS
}

export default function Stepper({ currentStep }: StepperProps) {
  const { tr } = useLanguage()
  return (
    <ol className="oweru-stepper">
      {STEP_LABELS.map((label, i) => {
        const isComplete = i < currentStep
        const isActive = i === currentStep
        const isLast = i === STEP_LABELS.length - 1

        return (
          <li
            className={`oweru-step ${isComplete ? 'is-complete' : ''} ${isActive ? 'is-active' : ''}`}
            key={label}
          >
            <div className="oweru-step-circle">
              {isComplete ? <i className="bi bi-check-lg" /> : i + 1}
            </div>
            <span className="oweru-step-label">{tr(label)}</span>
            {!isLast && <div className="oweru-step-line" />}
          </li>
        )
      })}
    </ol>
  )
}
