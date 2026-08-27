import { useEffect, useState } from 'react'
import { houseForSaleApi } from '../../services/api'
import type { CategoryId, PropertyCategoryRecord } from '../../types'

interface CategoryGridProps {
  onSelect: (id: CategoryId, propertyCategoryId: string) => void
}

export default function CategoryGrid({ onSelect }: CategoryGridProps) {
  const [categories, setCategories] = useState<PropertyCategoryRecord[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    houseForSaleApi.getPropertyCategories()
      .then((items: PropertyCategoryRecord[]) => setCategories(items.filter((item) => /house|land|commercial/i.test(`${item.title} ${item.slug}`))))
      .catch(() => setError('Unable to load property categories.'))
  }, [])

  return (
    <div className="oweru-panel">
      <h4 className="mb-1">Register an Estate</h4>
      <p className="text-muted mb-4">Pick the type of property your customer wants to sell.</p>

      <div className="row g-3">
        {categories.map((cat) => (
          <div className="col-12 col-md-6 col-lg-4" key={cat.id}>
            <div
              className="oweru-cat-card"
              role="button"
              tabIndex={0}
              onClick={() => onSelect(toCategoryId(cat), cat.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(toCategoryId(cat), cat.id)
              }}>
              <div className="oweru-cat-icon" style={{ background: `${cat.accent || '#3B6FE0'}1a`, color: cat.accent || '#3B6FE0' }}>
                <i className={`bi ${cat.icon || 'bi-building'}`} />
              </div>
              <div className="fw-semibold">{cat.title}</div>
              <div className="text-muted small">{cat.description || 'List property available for sale'}</div>
            </div>
          </div>
        ))}
        {error && <div className="col-12 text-danger">{error}</div>}
        {!error && categories.length === 0 && <div className="col-12 text-muted">Loading property categories...</div>}
      </div>
    </div>
  )
}

function toCategoryId(category: PropertyCategoryRecord): CategoryId {
  const value = `${category.slug} ${category.title}`.toLowerCase()
  if (value.includes('house')) return 'house-sale'
  if (value.includes('land')) return 'land-sale'
  return 'commercial-sale'
}
