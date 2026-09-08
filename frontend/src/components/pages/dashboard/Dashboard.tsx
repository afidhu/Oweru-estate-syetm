import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import api, { getUploadUrl } from '../../../services/api'
import type { PropertyCategoryRecord } from '../../../types'

type Section = 'overview' | 'listings' | 'people' | 'categories'
type PersonKind = 'brokers' | 'owners'
type ListingKind = 'house-for-sale' | 'land-for-sale' | 'commercial-area'

interface Listing { id: string; title: string; status?: string; salePrice?: string | number | null; createdAt?: string; broker?: { name: string }; owner?: { name: string }; category: ListingKind }
interface ListingDetail extends Listing { [key: string]: any }
interface Person { id: string; name: string; phone: string; email?: string | null; nid?: string | null; tin?: string | null }
interface DashboardData { listings: Listing[]; brokers: Person[]; owners: Person[]; categories: PropertyCategoryRecord[] }

const labels: Record<ListingKind, string> = { 'house-for-sale': 'Houses', 'land-for-sale': 'Land', 'commercial-area': 'Commercial' }
const emptyPerson = { name: '', phone: '', email: '', nid: '', tin: '' }
const emptyCategory = { title: '', slug: '', description: '', icon: '', accent: '' }
const endpoint = (kind: ListingKind) => `/${kind}`
const slugify = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const money = (value: Listing['salePrice']) => value === null || value === undefined || value === '' ? 'Price not set' : `TZS ${Number(value).toLocaleString()}`

export default function Dashboard() {
  const navigate = useNavigate()
  const authUser = JSON.parse(localStorage.getItem('oweru-auth-user') || '{}') as { username?: string; role?: string }
  const roleLabel = authUser.role ? authUser.role.charAt(0) + authUser.role.slice(1).toLowerCase() : 'Admin'
  const avatarLabel = (authUser.username || roleLabel).slice(0, 2).toUpperCase()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : hour < 21 ? 'Good evening' : 'Good night'
  const [section, setSection] = useState<Section>('overview')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('ALL')
  const [kindFilter, setKindFilter] = useState<'ALL' | ListingKind>('ALL')
  const [personKind, setPersonKind] = useState<PersonKind>('brokers')
  const PAGE_SIZE = 9
  const [listingPage, setListingPage] = useState(1)
  const [peoplePage, setPeoplePage] = useState(1)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [personModal, setPersonModal] = useState<{ kind: PersonKind; id?: string } | null>(null)
  const [personForm, setPersonForm] = useState(emptyPerson)
  const [categoryModal, setCategoryModal] = useState<{ id?: string } | null>(null)
  const [categoryForm, setCategoryForm] = useState(emptyCategory)
  const [listingModal, setListingModal] = useState<Listing | null>(null)
  const [viewListing, setViewListing] = useState<ListingDetail | null>(null)
  const [listingToView, setListingToView] = useState<Listing | null>(null)
  const [addListingOpen, setAddListingOpen] = useState(false)
  const [newListing, setNewListing] = useState({ kind: 'house-for-sale' as ListingKind, title: '', salePrice: '', listingType: 'SALE' })
  const queryClient = useQueryClient()
  const { data: dashboardData, isLoading: loading, isError: dashboardQueryError } = useQuery<DashboardData>({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      const [houses, land, commercial, brokerData, ownerData, categoryData] = await Promise.all([
        api.get('/house-for-sale'), api.get('/land-for-sale'), api.get('/commercial-area'), api.get('/brokers'), api.get('/owners'), api.get('/property-categories'),
      ])
      return {
        listings: [
          ...(houses.data as Listing[]).map((item) => ({ ...item, category: 'house-for-sale' as const })),
          ...(land.data as Listing[]).map((item) => ({ ...item, category: 'land-for-sale' as const })),
          ...(commercial.data as Listing[]).map((item) => ({ ...item, category: 'commercial-area' as const })),
        ],
        brokers: brokerData.data,
        owners: ownerData.data,
        categories: categoryData.data,
      }
    },
  })
  const { data: viewListingData, isFetching: viewLoading, isError: viewQueryError } = useQuery<ListingDetail>({
    queryKey: ['listing-detail', listingToView?.category, listingToView?.id],
    queryFn: async () => {
      const response = await api.get(`${endpoint(listingToView!.category)}/${listingToView!.id}`)
      return { ...response.data, category: listingToView!.category }
    },
    enabled: Boolean(listingToView),
  })
  useEffect(() => {
    if (viewListingData) setViewListing(viewListingData)
  }, [viewListingData])
  const listings = dashboardData?.listings ?? []
  const brokers = dashboardData?.brokers ?? []
  const owners = dashboardData?.owners ?? []
  const categories = dashboardData?.categories ?? []
  const dashboardError = dashboardQueryError ? 'Unable to load dashboard data. Check that the API is running.' : ''

  async function loadData() {
    setError('')
    await queryClient.invalidateQueries({ queryKey: ['dashboard-data'] })
  }
  function logout() {
    localStorage.removeItem('oweru-auth-user')
    navigate('/login', { replace: true })
  }
  const filteredListings = useMemo(() => listings.filter((listing) => {
    const text = `${listing.title} ${listing.broker?.name ?? ''} ${listing.owner?.name ?? ''}`.toLowerCase()
    return (kindFilter === 'ALL' || listing.category === kindFilter) && (status === 'ALL' || listing.status === status) && text.includes(query.toLowerCase())
  }).sort((a, b) => {
    const pendingA = (a.status ?? '') === 'PENDING' ? 0 : 1
    const pendingB = (b.status ?? '') === 'PENDING' ? 0 : 1
    if (pendingA !== pendingB) return pendingA - pendingB
    return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
  }), [kindFilter, listings, query, status])
  const filteredPeople = useMemo(() => (personKind === 'brokers' ? brokers : owners).filter((person) => `${person.name} ${person.phone} ${person.email ?? ''}`.toLowerCase().includes(query.toLowerCase())), [brokers, owners, personKind, query])
  useEffect(() => { setListingPage(1) }, [query, status, kindFilter])
  useEffect(() => { setPeoplePage(1) }, [query, personKind])
  const listingPageCount = Math.max(1, Math.ceil(filteredListings.length / PAGE_SIZE))
  const peoplePageCount = Math.max(1, Math.ceil(filteredPeople.length / PAGE_SIZE))
  const pagedListings = filteredListings.slice((listingPage - 1) * PAGE_SIZE, listingPage * PAGE_SIZE)
  const pagedPeople = filteredPeople.slice((peoplePage - 1) * PAGE_SIZE, peoplePage * PAGE_SIZE)
  const active = listings.filter((listing) => listing.status === 'ACTIVE').length
  const pending = listings.filter((listing) => listing.status === 'PENDING').length
  const flash = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 3500) }

  function openPerson(kind: PersonKind, person?: Person) {
    setPersonKind(kind); setPersonModal({ kind, id: person?.id })
    setPersonForm(person ? { name: person.name, phone: person.phone, email: person.email ?? '', nid: person.nid ?? '', tin: person.tin ?? '' } : emptyPerson)
  }
  async function savePerson(event: FormEvent) {
    event.preventDefault(); if (!personModal || !personForm.name.trim() || !personForm.phone.trim()) return; setSaving(true)
    try { const data = { ...personForm, email: personForm.email || undefined, nid: personForm.nid || undefined, tin: personForm.tin || undefined }; personModal.id ? await api.patch(`/${personModal.kind}/${personModal.id}`, data) : await api.post(`/${personModal.kind}`, data); setPersonModal(null); await loadData(); flash('Contact saved successfully.') }
    catch (requestError) { console.error(requestError); setError('The contact could not be saved.') } finally { setSaving(false) }
  }
  async function deletePerson(kind: PersonKind, id: string) {
    if (!window.confirm('Delete this contact?')) return
    try { await api.delete(`/${kind}/${id}`); await loadData(); flash('Contact deleted.') } catch (requestError) { console.error(requestError); setError('The contact could not be deleted.') }
  }
  function openCategory(category?: PropertyCategoryRecord) {
    setCategoryModal({ id: category?.id })
    setCategoryForm(category ? { title: category.title, slug: category.slug, description: category.description || '', icon: category.icon || '', accent: category.accent || '' } : emptyCategory)
  }
  async function saveCategory(event: FormEvent) {
    event.preventDefault(); if (!categoryModal || !categoryForm.title.trim() || !categoryForm.slug.trim()) return; setSaving(true)
    try { const data = { ...categoryForm, description: categoryForm.description || undefined, icon: categoryForm.icon || undefined, accent: categoryForm.accent || undefined }; categoryModal.id ? await api.patch(`/property-categories/${categoryModal.id}`, data) : await api.post('/property-categories', data); setCategoryModal(null); await loadData(); flash('Category saved successfully.') }
    catch (requestError) { console.error(requestError); setError('The category could not be saved.') } finally { setSaving(false) }
  }
  async function deleteCategory(id: string) {
    if (!window.confirm('Delete this category?')) return
    try { await api.delete(`/property-categories/${id}`); await loadData(); flash('Category deleted.') } catch (requestError) { console.error(requestError); setError('The category could not be deleted.') }
  }
  async function saveListing(event: FormEvent) {
    event.preventDefault(); if (!listingModal?.title.trim()) return; setSaving(true)
    try { await api.patch(`${endpoint(listingModal.category)}/${listingModal.id}`, { title: listingModal.title, salePrice: listingModal.salePrice === '' ? undefined : Number(listingModal.salePrice), status: listingModal.status }); setListingModal(null); await loadData(); flash('Listing updated successfully.') }
    catch (requestError) { console.error(requestError); setError('The listing could not be updated.') } finally { setSaving(false) }
  }
  async function deleteListing(listing: Listing) {
    if (!window.confirm(`Delete ${listing.title}?`)) return
    try { await api.delete(`${endpoint(listing.category)}/${listing.id}`); await loadData(); flash('Listing deleted.') } catch (requestError) { console.error(requestError); setError('The listing could not be deleted.') }
  }
  async function viewListingDetails(listing: Listing) {
    setViewListing(null)
    setListingToView(listing)
  }
  async function addListing(event: FormEvent) {
    event.preventDefault(); if (!newListing.title.trim() || !newListing.salePrice) return; setSaving(true)
    try { const data = newListing.kind === 'commercial-area' ? { title: newListing.title, salePrice: Number(newListing.salePrice), listingType: newListing.listingType } : { title: newListing.title, salePrice: Number(newListing.salePrice) }; await api.post(endpoint(newListing.kind), data); setAddListingOpen(false); setNewListing({ ...newListing, title: '', salePrice: '' }); await loadData(); flash('Listing added successfully.') }
    catch (requestError) { console.error(requestError); setError('The listing could not be added.') } finally { setSaving(false) }
  }

  return <div className="admin-shell">
    <aside className="admin-sidebar"><a className="admin-brand" href="/"><img src="/assets/logo.jpeg" alt="oweru estate" /><span className="admin-brand-word">Register <span>Estate</span></span></a><div className="admin-sidebar-label">Workspace</div><nav className="admin-nav">{([['overview', 'grid-1x2', 'Overview'], ['listings', 'buildings', 'Listings'], ['people', 'people', 'People'], ['categories', 'tags', 'Categories']] as const).map(([value, icon, label]) => <button key={value} className={section === value ? 'active' : ''} onClick={() => setSection(value)}><i className={`bi bi-${icon}`} /> {label}{value === 'listings' && <span className="admin-nav-count">{listings.length}</span>}{value === 'categories' && <span className="admin-nav-count">{categories.length}</span>}</button>)}</nav><div className="admin-sidebar-bottom"><div className="admin-user-avatar">{avatarLabel}</div><div className="admin-user-info"><strong>{roleLabel}</strong><small>{authUser.username || 'Estate operations'}</small></div><button className="admin-logout" type="button" title="Log out" aria-label="Log out" onClick={logout}><i className="bi bi-box-arrow-right" /></button></div></aside>
    <main className="admin-main"><header className="admin-topbar"><div><span className="admin-kicker">Operations center</span><h1>{section === 'overview' ? `${greeting}, ${roleLabel}` : section === 'listings' ? 'Property listings' : section === 'people' ? 'People directory' : 'Property categories'}</h1></div><div className="admin-top-actions"><span className="admin-live"><span /> Live data</span><button className="admin-icon-button" title="Refresh data" onClick={() => void loadData()}><i className="bi bi-arrow-clockwise" /></button><button className="admin-primary" onClick={() => section === 'people' ? openPerson(personKind) : section === 'categories' ? openCategory() : setAddListingOpen(true)}><i className="bi bi-plus-lg" /> {section === 'people' ? 'Add person' : section === 'categories' ? 'Add category' : 'Add listing'}</button></div></header>
      {(error || dashboardError || viewQueryError) && <div className="admin-alert error"><i className="bi bi-exclamation-circle" /> {error || dashboardError || 'The listing details could not be loaded.'}<button onClick={() => setError('')}><i className="bi bi-x" /></button></div>}{notice && <div className="admin-alert success"><i className="bi bi-check-circle" /> {notice}</div>}
      {section === 'overview' && <><section className="admin-metrics"><Metric icon="buildings" label="Total listings" value={listings.length} detail="Across all property types" tone="navy" /><Metric icon="check2-circle" label="Active listings" value={active} detail={`${listings.length ? Math.round(active / listings.length * 100) : 0}% of portfolio`} tone="gold" /><Metric icon="hourglass-split" label="Needs attention" value={pending} detail="Pending review" tone="coral" /><Metric icon="people" label="People managed" value={brokers.length + owners.length} detail={`${brokers.length} brokers - ${owners.length} owners`} tone="green" /></section><div className="admin-content-grid"><section className="admin-panel admin-panel-wide"><PanelHeading title="Recent listings" action="View all" onAction={() => setSection('listings')} />{loading ? <Loading /> : <ListingTable listings={listings.slice(0, 6)} onEdit={setListingModal} onDelete={deleteListing} onView={viewListingDetails} />}</section><section className="admin-panel"><PanelHeading title="Portfolio mix" /><div className="portfolio-list">{(Object.keys(labels) as ListingKind[]).map((kind) => { const count = listings.filter((item) => item.category === kind).length; return <div className="portfolio-row" key={kind}><span className={`portfolio-icon ${kind}`}><i className={`bi bi-${kind === 'house-for-sale' ? 'house' : kind === 'land-for-sale' ? 'geo' : 'shop'}`} /></span><div><strong>{labels[kind]}</strong><small>{count} listings</small></div><b>{listings.length ? Math.round(count / listings.length * 100) : 0}%</b></div> })}</div><div className="admin-mini-note"><i className="bi bi-shield-check" /><span><strong>All systems operational</strong><small>Last synced just now</small></span></div></section></div></>}
      {section === 'listings' && <section className="admin-panel admin-full-panel"><div className="admin-toolbar"><Search value={query} onChange={setQuery} placeholder="Search title, owner or broker" /><select value={kindFilter} onChange={(event) => setKindFilter(event.target.value as typeof kindFilter)}><option value="ALL">All property types</option>{(Object.keys(labels) as ListingKind[]).map((kind) => <option key={kind} value={kind}>{labels[kind]}</option>)}</select><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="ALL">All statuses</option><option>ACTIVE</option><option>PENDING</option><option>SOLD</option><option>ARCHIVED</option></select></div>{loading ? <Loading /> : <><ListingTable listings={pagedListings} onEdit={setListingModal} onDelete={deleteListing} onView={viewListingDetails} emptyMessage="No listings match your filters." /><Pager page={listingPage} pageCount={listingPageCount} total={filteredListings.length} onChange={setListingPage} /></>}</section>}
      {section === 'people' && <section className="admin-panel admin-full-panel"><div className="people-tabs"><button className={personKind === 'brokers' ? 'active' : ''} onClick={() => setPersonKind('brokers')}><i className="bi bi-briefcase" /> Brokers <b>{brokers.length}</b></button><button className={personKind === 'owners' ? 'active' : ''} onClick={() => setPersonKind('owners')}><i className="bi bi-person" /> Owners <b>{owners.length}</b></button><div className="people-search"><Search value={query} onChange={setQuery} placeholder="Search people" /></div></div><PeopleTable people={pagedPeople} kind={personKind} onEdit={openPerson} onDelete={deletePerson} /><Pager page={peoplePage} pageCount={peoplePageCount} total={filteredPeople.length} onChange={setPeoplePage} /></section>}
      {section === 'categories' && <section className="admin-panel admin-full-panel"><div className="admin-toolbar"><Search value={query} onChange={setQuery} placeholder="Search categories" /></div><CategoriesTable categories={categories.filter((category) => `${category.title} ${category.slug}`.toLowerCase().includes(query.toLowerCase()))} onEdit={openCategory} onDelete={deleteCategory} /></section>}
    </main>
    {personModal && <Modal title={`${personModal.id ? 'Edit' : 'Add'} ${personKind === 'brokers' ? 'broker' : 'owner'}`} onClose={() => setPersonModal(null)}><form onSubmit={savePerson} className="admin-form"><div className="form-grid"><Field label="Full name" required value={personForm.name} onChange={(value) => setPersonForm({ ...personForm, name: value })} /><Field label="Phone number" required value={personForm.phone} onChange={(value) => setPersonForm({ ...personForm, phone: value })} /><Field label="Email (optional)" type="email" value={personForm.email} onChange={(value) => setPersonForm({ ...personForm, email: value })} /><Field label="NIDA (optional)" value={personForm.nid} onChange={(value) => setPersonForm({ ...personForm, nid: value })} /><Field label="TIN (optional)" value={personForm.tin} onChange={(value) => setPersonForm({ ...personForm, tin: value })} /></div><ModalActions saving={saving} /></form></Modal>}
    {categoryModal && <Modal title={`${categoryModal.id ? 'Edit' : 'Add'} category`} onClose={() => setCategoryModal(null)}><form onSubmit={saveCategory} className="admin-form"><div className="form-grid"><Field label="Title" required value={categoryForm.title} onChange={(value) => setCategoryForm({ ...categoryForm, title: value, slug: categoryModal?.id ? categoryForm.slug : slugify(value) })} /><Field label="Slug" required value={categoryForm.slug} onChange={(value) => setCategoryForm({ ...categoryForm, slug: value })} /><Field label="Description (optional)" value={categoryForm.description} onChange={(value) => setCategoryForm({ ...categoryForm, description: value })} /><Field label="Icon class (optional)" value={categoryForm.icon} onChange={(value) => setCategoryForm({ ...categoryForm, icon: value })} /><Field label="Accent color (optional)" value={categoryForm.accent} onChange={(value) => setCategoryForm({ ...categoryForm, accent: value })} /></div><ModalActions saving={saving} /></form></Modal>}
    {listingModal && <Modal title="Edit listing" onClose={() => setListingModal(null)}><form onSubmit={saveListing} className="admin-form"><div className="form-grid"><Field label="Property title" required value={listingModal.title} onChange={(value) => setListingModal({ ...listingModal, title: value })} /><Field label="Sale price" money value={String(listingModal.salePrice ?? '')} onChange={(value) => setListingModal({ ...listingModal, salePrice: value })} /><label>Status<select value={listingModal.status ?? 'ACTIVE'} onChange={(event) => setListingModal({ ...listingModal, status: event.target.value })}><option>ACTIVE</option><option>PENDING</option><option>SOLD</option><option>APPROVED</option></select></label></div><ModalActions saving={saving} /></form></Modal>}
    {viewLoading && <div className="modal-backdrop" role="status"><div className="admin-modal"><Loading /></div></div>}
    {viewListing && <ListingViewModal listing={viewListing} onClose={() => { setViewListing(null); setListingToView(null) }} />}
    {addListingOpen && <Modal title="Add quick listing" onClose={() => setAddListingOpen(false)}><form onSubmit={addListing} className="admin-form"><div className="form-grid"><label>Property type<select value={newListing.kind} onChange={(event) => setNewListing({ ...newListing, kind: event.target.value as ListingKind })}>{(Object.keys(labels) as ListingKind[]).map((kind) => <option key={kind} value={kind}>{labels[kind]}</option>)}</select></label>{newListing.kind === 'commercial-area' && <label>Listing type<select value={newListing.listingType} onChange={(event) => setNewListing({ ...newListing, listingType: event.target.value })}><option>SALE</option><option>RENT</option></select></label>}<Field label="Property title" required value={newListing.title} onChange={(value) => setNewListing({ ...newListing, title: value })} /><Field label="Sale price" money required value={newListing.salePrice} onChange={(value) => setNewListing({ ...newListing, salePrice: value })} /></div><ModalActions saving={saving} label="Add listing" /></form></Modal>}
  </div>
}

function Metric({ icon, label, value, detail, tone }: { icon: string; label: string; value: number; detail: string; tone: string }) { return <div className="metric-card"><span className={`metric-icon ${tone}`}><i className={`bi bi-${icon}`} /></span><div><small>{label}</small><strong>{value.toLocaleString()}</strong><em>{detail}</em></div></div> }
function PanelHeading({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) { return <div className="panel-heading"><h2>{title}</h2>{action && <button onClick={onAction}>{action} <i className="bi bi-arrow-up-right" /></button>}</div> }
function Search({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) { return <div className="admin-search"><i className="bi bi-search" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></div> }
function Loading() { return <div className="loading-state"><span /><span /><span /> Loading workspace data...</div> }
function Pager({ page, pageCount, total, onChange }: { page: number; pageCount: number; total: number; onChange: (page: number) => void }) {
  if (total === 0) return null
  return <div className="admin-pager"><span>{total} total · page {page} of {pageCount}</span><div className="admin-pager-buttons"><button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}><i className="bi bi-chevron-left" /> Prev</button><button type="button" disabled={page >= pageCount} onClick={() => onChange(page + 1)}>Next <i className="bi bi-chevron-right" /></button></div></div>
}
function Field({ label, value, onChange, type = 'text', required = false, money: moneyFormat = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; money?: boolean }) {
  if (moneyFormat) {
    const digits = value.replace(/\D/g, '')
    const display = digits ? Number(digits).toLocaleString() : ''
    return <label>{label}<input type="text" inputMode="numeric" required={required} value={display} onChange={(event) => onChange(event.target.value.replace(/\D/g, ''))} /></label>
  }
  return <label>{label}<input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} /></label>
}
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) { return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="admin-modal"><div className="modal-heading"><div><span>Admin workspace</span><h2>{title}</h2></div><button onClick={onClose} title="Close"><i className="bi bi-x-lg" /></button></div>{children}</div></div> }
function ModalActions({ saving, label = 'Save changes' }: { saving: boolean; label?: string }) { return <div className="modal-actions"><button type="submit" className="admin-primary" disabled={saving}>{saving ? 'Saving...' : label}</button></div> }
function ListingTable({ listings, onEdit, onDelete, onView, emptyMessage = 'No listings yet.' }: { listings: Listing[]; onEdit: (listing: Listing) => void; onDelete: (listing: Listing) => void; onView: (listing: Listing) => void; emptyMessage?: string }) { return listings.length ? <div className="table-wrap"><table className="admin-table"><thead><tr><th>Property</th><th>Type</th><th>Price</th><th>Status</th><th>Contacts</th><th /></tr></thead><tbody>{listings.map((listing) => <tr key={`${listing.category}-${listing.id}`}><td><div className="property-cell"><span className="property-thumb"><i className={`bi bi-${listing.category === 'house-for-sale' ? 'house' : listing.category === 'land-for-sale' ? 'geo' : 'shop'}`} /></span><span><strong>{listing.title || 'Untitled property'}</strong><small>{listing.id.slice(0, 8)} · {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : 'Recently added'}</small></span></div></td><td>{labels[listing.category]}</td><td><strong>{money(listing.salePrice)}</strong></td><td><span className={`status-pill ${(listing.status ?? 'ACTIVE').toLowerCase()}`}>{listing.status ?? 'ACTIVE'}</span></td><td><small>{listing.owner?.name ?? 'No owner'}<br />{listing.broker?.name ?? 'No broker'}</small></td><td><div className="row-actions"><button title="View details" onClick={() => onView(listing)}><i className="bi bi-eye" /></button><button title="Edit" onClick={() => onEdit(listing)}><i className="bi bi-pencil" /></button><button title="Delete" onClick={() => onDelete(listing)}><i className="bi bi-trash3" /></button></div></td></tr>)}</tbody></table></div> : <div className="empty-state"><i className="bi bi-inbox" /><strong>{emptyMessage}</strong><span>Try changing your filters or add a new listing.</span></div> }
function ListingViewModal({ listing, onClose }: { listing: ListingDetail; onClose: () => void }) {
  const mediaKeys = new Set(['images', 'documents', 'videos', 'features'])
  const scalarDetails = Object.entries(listing).filter(([key, value]) => key !== 'id' && !key.endsWith('Id') && !mediaKeys.has(key) && value !== null && value !== undefined && typeof value !== 'object')
  const relationDetails = ['propertyCategory', 'houseType', 'landType', 'propertyType', 'region', 'district', 'ward'].filter((key) => listing[key])
  const personEntries = (person: any) => person && typeof person === 'object'
    ? Object.entries(person).filter(([key, value]) => key !== 'id' && !key.endsWith('Id') && value !== null && value !== undefined && typeof value !== 'object')
    : []
  const images = Array.isArray(listing.images) ? listing.images : []
  const documents = Array.isArray(listing.documents) ? listing.documents : []
  const videos = Array.isArray(listing.videos) ? listing.videos : []
  const [attachment, setAttachment] = useState<{ kind: 'image' | 'video' | 'file'; src: string; name: string } | null>(null)
  return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="admin-modal listing-view-modal"><div className="modal-heading"><div><span>Property details</span><h2>{listing.title || 'Untitled property'}</h2></div><button onClick={onClose} title="Close"><i className="bi bi-x-lg" /></button></div><div className="listing-view-content"><section className="listing-media-section listing-info-section"><h3><i className="bi bi-house" /> Property details</h3><div className="listing-detail-grid">{scalarDetails.map(([key, value]) => <div key={key}><small>{prettyLabel(key)}</small><strong>{formatDetailValue(value, key)}</strong></div>)}{relationDetails.map((key) => <div key={key}><small>{prettyLabel(key)}</small><strong>{formatDetailValue(listing[key], key)}</strong></div>)}</div></section><section className="listing-media-section listing-info-section"><h3><i className="bi bi-briefcase" /> Broker info</h3>{personEntries(listing.broker).length ? <div className="listing-detail-grid">{personEntries(listing.broker).map(([key, value]) => <div key={key}><small>{prettyLabel(key)}</small><strong>{formatDetailValue(value, key)}</strong></div>)}</div> : <p className="listing-media-empty">No broker attached.</p>}</section><section className="listing-media-section listing-info-section"><h3><i className="bi bi-person" /> Owner info</h3>{personEntries(listing.owner).length ? <div className="listing-detail-grid">{personEntries(listing.owner).map(([key, value]) => <div key={key}><small>{prettyLabel(key)}</small><strong>{formatDetailValue(value, key)}</strong></div>)}</div> : <p className="listing-media-empty">No owner attached.</p>}</section><MediaSection title="Images" icon="images" empty={!images.length}>{images.map((image) => <button type="button" className="listing-image-link" onClick={() => setAttachment({ kind: 'image', src: getUploadUrl(image.url), name: 'Property image' })} key={image.id || image.url}><img src={getUploadUrl(image.url)} alt="Property" /></button>)}</MediaSection><MediaSection title="Videos" icon="camera-video" empty={!videos.length}>{videos.map((video) => <video className="listing-video" controls preload="metadata" src={getUploadUrl(video.url)} key={video.id || video.url} />)}</MediaSection><MediaSection title="Documents" icon="paperclip" empty={!documents.length}>{documents.map((document) => <button type="button" className="listing-document" onClick={() => setAttachment({ kind: /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(document.url) ? 'image' : /\.(mp4|webm|mov|mkv|avi|m4v|3gp)$/i.test(document.url) ? 'video' : 'file', src: getUploadUrl(document.url), name: document.name || 'Document' })} key={document.id || document.url}><i className="bi bi-file-earmark-text" /> {document.name || 'Document'}</button>)}</MediaSection><MediaSection title="Features" icon="check2-circle" empty={!listing.features?.length}>{(listing.features || []).map((feature: any) => <span className="listing-feature" key={feature.id || feature.name}>{feature.name || feature}</span>)}</MediaSection></div></div>
    {attachment && <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={() => setAttachment(null)} style={{ zIndex: 1090 }}><div className="admin-modal" onClick={(event) => event.stopPropagation()} style={{ maxWidth: 'min(960px, 96vw)' }}><div className="modal-heading"><div><span>Attachment</span><h2 style={{ wordBreak: 'break-word' }}>{attachment.name}</h2></div><button onClick={() => setAttachment(null)} title="Close"><i className="bi bi-x-lg" /></button></div><div style={{ padding: '16px', textAlign: 'center' }}>{attachment.kind === 'image' ? <img src={attachment.src} alt={attachment.name} style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain' }} /> : attachment.kind === 'video' ? <video src={attachment.src} controls autoPlay style={{ maxWidth: '100%', maxHeight: '75vh', background: '#000' }} /> : <iframe title={attachment.name} src={attachment.src} style={{ width: '100%', height: '75vh', border: 0 }} />}<div style={{ marginTop: '12px' }}><a className="admin-primary" href={attachment.src} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}><i className="bi bi-box-arrow-up-right" /> Open in new tab</a></div></div></div></div>}
  </div>
}
function prettyLabel(value: string) { return value.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase()) }
function formatDetailValue(value: any, key?: string): string { if (key === 'createdAt' || key === 'updatedAt') { const date = new Date(value); if (!Number.isNaN(date.getTime())) return date.toLocaleString(undefined, { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) } if (value instanceof Date) return value.toLocaleString(); if (typeof value === 'object' && value !== null) return value.name || value.title || value.phone || 'Available'; if (key && /price|amount/i.test(key) && value !== null && value !== '' && !Number.isNaN(Number(value))) return Number(value).toLocaleString(); return String(value) }
function MediaSection({ title, icon, empty, children }: { title: string; icon: string; empty: boolean; children: ReactNode }) { return <section className="listing-media-section"><h3><i className={`bi bi-${icon}`} /> {title}</h3>{empty ? <p className="listing-media-empty">No {title.toLowerCase()} attached.</p> : <div className="listing-media-grid">{children}</div>}</section> }
function PeopleTable({ people, kind, onEdit, onDelete }: { people: Person[]; kind: PersonKind; onEdit: (kind: PersonKind, person?: Person) => void; onDelete: (kind: PersonKind, id: string) => void }) { return people.length ? <div className="table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Identity</th><th /></tr></thead><tbody>{people.map((person) => <tr key={person.id}><td><div className="person-cell"><span>{person.name.slice(0, 2).toUpperCase()}</span><strong>{person.name}</strong></div></td><td>{person.phone}</td><td>{person.email || 'Not provided'}</td><td><small>{person.nid ? `NIDA ${person.nid}` : 'No NIDA'}<br />{person.tin ? `TIN ${person.tin}` : 'No TIN'}</small></td><td><div className="row-actions"><button title="Edit" onClick={() => onEdit(kind, person)}><i className="bi bi-pencil" /></button><button title="Delete" onClick={() => onDelete(kind, person.id)}><i className="bi bi-trash3" /></button></div></td></tr>)}</tbody></table></div> : <div className="empty-state"><i className="bi bi-people" /><strong>No {kind} found</strong><span>Add a contact to start building your directory.</span></div> }
function CategoriesTable({ categories, onEdit, onDelete }: { categories: PropertyCategoryRecord[]; onEdit: (category?: PropertyCategoryRecord) => void; onDelete: (id: string) => void }) { return categories.length ? <div className="table-wrap"><table className="admin-table"><thead><tr><th>Category</th><th>Slug</th><th>Description</th><th /></tr></thead><tbody>{categories.map((category) => <tr key={category.id}><td><div className="property-cell"><span className="property-thumb" style={{ background: `${category.accent || '#3B6FE0'}1a`, color: category.accent || '#3B6FE0' }}><i className={`bi ${category.icon || 'bi-tags'}`} /></span><strong>{category.title}</strong></div></td><td>{category.slug}</td><td><small>{category.description || 'No description'}</small></td><td><div className="row-actions"><button title="Edit" onClick={() => onEdit(category)}><i className="bi bi-pencil" /></button><button title="Delete" onClick={() => onDelete(category.id)}><i className="bi bi-trash3" /></button></div></td></tr>)}</tbody></table></div> : <div className="empty-state"><i className="bi bi-tags" /><strong>No categories found</strong><span>Add a property category to get started.</span></div> }
