import { useQuery } from '@tanstack/react-query'
import { houseForSaleApi } from '../../services/api'
import type { CategoryId, PropertyCategoryRecord } from '../../types'
import { useLanguage } from '../../i18n'

interface CategoryGridProps {
  onSelect: (id: CategoryId, propertyCategoryId: string) => void
}

export default function CategoryGrid({ onSelect }: CategoryGridProps) {
  const { tr } = useLanguage()
  const { data: categories = [], isError } = useQuery<PropertyCategoryRecord[]>({
    queryKey: ['property-categories'],
    queryFn: houseForSaleApi.getPropertyCategories,
    select: (items) => items.filter((item) => /house|land|commercial/i.test(`${item.title} ${item.slug}`)),
  })
  const error = isError ? tr('Unable to load property categories.') : ''

  return (
    <div className="oweru-panel">
      <h4 className="mb-1">{tr('Register an Estate')}</h4>
      <p className="text-muted mb-4">{tr('Pick the type of property your customer wants to sell.')}</p>

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
              <div className="fw-semibold">{tr(cat.title)}</div>
              <div className="text-muted small">{tr(cat.description || 'List property available for sale')}</div>
            </div>
          </div>
        ))}
        {error && <div className="col-12 text-danger">{error}</div>}
        {!error && categories.length === 0 && <div className="col-12 text-muted">{tr('Loading property categories...')}</div>}
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
