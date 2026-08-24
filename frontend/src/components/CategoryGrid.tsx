import { CATEGORIES } from '../data/categories'
import type { CategoryId } from '../types'

interface CategoryGridProps {
  onSelect: (id: CategoryId) => void
}

export default function CategoryGrid({ onSelect }: CategoryGridProps) {
  return (
    <div className="oweru-panel">
      <h4 className="mb-1">Register an Estate</h4>
      <p className="text-muted mb-4">Pick the type of property your customer wants to sell.</p>

      <div className="row g-3">
        {CATEGORIES.map((cat) => (
          <div className="col-12 col-md-6 col-lg-4" key={cat.id}>
            <div
              className="oweru-cat-card"
              role="button"
              tabIndex={0}
              onClick={() => onSelect(cat.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(cat.id)
              }}
            >
              <div
                className="oweru-cat-icon"
                style={{ background: `${cat.accent}1a`, color: cat.accent }}
              >
                <i className={`bi ${cat.icon}`} />
              </div>
              <div className="fw-semibold">{cat.title}</div>
              <div className="text-muted small">{cat.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
