import { FormEvent, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import api from '../../../services/api'

type Section = 'overview' | 'listings' | 'people'
type PersonKind = 'brokers' | 'owners'
type ListingKind = 'house-for-sale' | 'land-for-sale' | 'commercial-area'

interface Listing { id: string; title: string; status?: string; salePrice?: string | number | null; createdAt?: string; broker?: { name: string }; owner?: { name: string }; category: ListingKind }
interface Person { id: string; name: string; phone: string; email?: string | null; nid?: string | null; tin?: string | null }

const labels: Record<ListingKind, string> = { 'house-for-sale': 'Houses', 'land-for-sale': 'Land', 'commercial-area': 'Commercial' }
const emptyPerson = { name: '', phone: '', email: '', nid: '', tin: '' }
const endpoint = (kind: ListingKind) => `/${kind}`
const money = (value: Listing['salePrice']) => value === null || value === undefined || value === '' ? 'Price not set' : `TZS ${Number(value).toLocaleString()}`

export default function Dashboard() {
  const [section, setSection] = useState<Section>('overview')
  const [listings, setListings] = useState<Listing[]>([])
  const [brokers, setBrokers] = useState<Person[]>([])
  const [owners, setOwners] = useState<Person[]>([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('ALL')
  const [kindFilter, setKindFilter] = useState<'ALL' | ListingKind>('ALL')
  const [personKind, setPersonKind] = useState<PersonKind>('brokers')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [personModal, setPersonModal] = useState<{ kind: PersonKind; id?: string } | null>(null)
  const [personForm, setPersonForm] = useState(emptyPerson)
  const [listingModal, setListingModal] = useState<Listing | null>(null)
  const [addListingOpen, setAddListingOpen] = useState(false)
  const [newListing, setNewListing] = useState({ kind: 'house-for-sale' as ListingKind, title: '', salePrice: '', listingType: 'SALE' })

  async function loadData() {
    setLoading(true); setError('')
    try {
      const [houses, land, commercial, brokerData, ownerData] = await Promise.all([
        api.get('/house-for-sale'), api.get('/land-for-sale'), api.get('/commercial-area'), api.get('/brokers'), api.get('/owners'),
      ])
      setListings([
        ...(houses.data as Listing[]).map((item) => ({ ...item, category: 'house-for-sale' as const })),
        ...(land.data as Listing[]).map((item) => ({ ...item, category: 'land-for-sale' as const })),
        ...(commercial.data as Listing[]).map((item) => ({ ...item, category: 'commercial-area' as const })),
      ])
      setBrokers(brokerData.data); setOwners(ownerData.data)
    } catch (requestError) { console.error(requestError); setError('Unable to load dashboard data. Check that the API is running.') }
    finally { setLoading(false) }
  }

  useEffect(() => { void loadData() }, [])
  const filteredListings = useMemo(() => listings.filter((listing) => {
    const text = `${listing.title} ${listing.broker?.name ?? ''} ${listing.owner?.name ?? ''}`.toLowerCase()
    return (kindFilter === 'ALL' || listing.category === kindFilter) && (status === 'ALL' || listing.status === status) && text.includes(query.toLowerCase())
  }), [kindFilter, listings, query, status])
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
  async function saveListing(event: FormEvent) {
    event.preventDefault(); if (!listingModal?.title.trim()) return; setSaving(true)
    try { await api.patch(`${endpoint(listingModal.category)}/${listingModal.id}`, { title: listingModal.title, salePrice: listingModal.salePrice === '' ? undefined : Number(listingModal.salePrice), status: listingModal.status }); setListingModal(null); await loadData(); flash('Listing updated successfully.') }
    catch (requestError) { console.error(requestError); setError('The listing could not be updated.') } finally { setSaving(false) }
  }
  async function deleteListing(listing: Listing) {
    if (!window.confirm(`Delete ${listing.title}?`)) return
    try { await api.delete(`${endpoint(listing.category)}/${listing.id}`); await loadData(); flash('Listing deleted.') } catch (requestError) { console.error(requestError); setError('The listing could not be deleted.') }
  }
  async function addListing(event: FormEvent) {
    event.preventDefault(); if (!newListing.title.trim() || !newListing.salePrice) return; setSaving(true)
    try { const data = newListing.kind === 'commercial-area' ? { title: newListing.title, salePrice: Number(newListing.salePrice), listingType: newListing.listingType } : { title: newListing.title, salePrice: Number(newListing.salePrice) }; await api.post(endpoint(newListing.kind), data); setAddListingOpen(false); setNewListing({ ...newListing, title: '', salePrice: '' }); await loadData(); flash('Listing added successfully.') }
    catch (requestError) { console.error(requestError); setError('The listing could not be added.') } finally { setSaving(false) }
  }

  return <div className="admin-shell">
    <aside className="admin-sidebar"><a className="admin-brand" href="/"><span className="admin-brand-mark">O</span><span>oweru<span>estate</span></span></a><div className="admin-sidebar-label">Workspace</div><nav className="admin-nav">{([['overview', 'grid-1x2', 'Overview'], ['listings', 'buildings', 'Listings'], ['people', 'people', 'People']] as const).map(([value, icon, label]) => <button key={value} className={section === value ? 'active' : ''} onClick={() => setSection(value)}><i className={`bi bi-${icon}`} /> {label}{value === 'listings' && <span className="admin-nav-count">{listings.length}</span>}</button>)}</nav><div className="admin-sidebar-bottom"><div className="admin-user-avatar">AD</div><div><strong>Administrator</strong><small>Estate operations</small></div></div></aside>
    <main className="admin-main"><header className="admin-topbar"><div><span className="admin-kicker">Operations center</span><h1>{section === 'overview' ? 'Good morning, Admin' : section === 'listings' ? 'Property listings' : 'People directory'}</h1></div><div className="admin-top-actions"><span className="admin-live"><span /> Live data</span><button className="admin-icon-button" title="Refresh data" onClick={() => void loadData()}><i className="bi bi-arrow-clockwise" /></button><button className="admin-primary" onClick={() => section === 'people' ? openPerson(personKind) : setAddListingOpen(true)}><i className="bi bi-plus-lg" /> {section === 'people' ? 'Add person' : 'Add listing'}</button></div></header>
      {error && <div className="admin-alert error"><i className="bi bi-exclamation-circle" /> {error}<button onClick={() => setError('')}><i className="bi bi-x" /></button></div>}{notice && <div className="admin-alert success"><i className="bi bi-check-circle" /> {notice}</div>}
      {section === 'overview' && <><section className="admin-metrics"><Metric icon="buildings" label="Total listings" value={listings.length} detail="Across all property types" tone="navy" /><Metric icon="check2-circle" label="Active listings" value={active} detail={`${listings.length ? Math.round(active / listings.length * 100) : 0}% of portfolio`} tone="gold" /><Metric icon="hourglass-split" label="Needs attention" value={pending} detail="Pending review" tone="coral" /><Metric icon="people" label="People managed" value={brokers.length + owners.length} detail={`${brokers.length} brokers - ${owners.length} owners`} tone="green" /></section><div className="admin-content-grid"><section className="admin-panel admin-panel-wide"><PanelHeading title="Recent listings" action="View all" onAction={() => setSection('listings')} />{loading ? <Loading /> : <ListingTable listings={listings.slice(0, 6)} onEdit={setListingModal} onDelete={deleteListing} />}</section><section className="admin-panel"><PanelHeading title="Portfolio mix" /><div className="portfolio-list">{(Object.keys(labels) as ListingKind[]).map((kind) => { const count = listings.filter((item) => item.category === kind).length; return <div className="portfolio-row" key={kind}><span className={`portfolio-icon ${kind}`}><i className={`bi bi-${kind === 'house-for-sale' ? 'house' : kind === 'land-for-sale' ? 'geo' : 'shop'}`} /></span><div><strong>{labels[kind]}</strong><small>{count} listings</small></div><b>{listings.length ? Math.round(count / listings.length * 100) : 0}%</b></div> })}</div><div className="admin-mini-note"><i className="bi bi-shield-check" /><span><strong>All systems operational</strong><small>Last synced just now</small></span></div></section></div></>}
      {section === 'listings' && <section className="admin-panel admin-full-panel"><div className="admin-toolbar"><Search value={query} onChange={setQuery} placeholder="Search title, owner or broker" /><select value={kindFilter} onChange={(event) => setKindFilter(event.target.value as typeof kindFilter)}><option value="ALL">All property types</option>{(Object.keys(labels) as ListingKind[]).map((kind) => <option key={kind} value={kind}>{labels[kind]}</option>)}</select><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="ALL">All statuses</option><option>ACTIVE</option><option>PENDING</option><option>SOLD</option><option>ARCHIVED</option></select></div>{loading ? <Loading /> : <ListingTable listings={filteredListings} onEdit={setListingModal} onDelete={deleteListing} emptyMessage="No listings match your filters." />}</section>}
      {section === 'people' && <section className="admin-panel admin-full-panel"><div className="people-tabs"><button className={personKind === 'brokers' ? 'active' : ''} onClick={() => setPersonKind('brokers')}><i className="bi bi-briefcase" /> Brokers <b>{brokers.length}</b></button><button className={personKind === 'owners' ? 'active' : ''} onClick={() => setPersonKind('owners')}><i className="bi bi-person" /> Owners <b>{owners.length}</b></button><div className="people-search"><Search value={query} onChange={setQuery} placeholder="Search people" /></div></div><PeopleTable people={(personKind === 'brokers' ? brokers : owners).filter((person) => `${person.name} ${person.phone} ${person.email ?? ''}`.toLowerCase().includes(query.toLowerCase()))} kind={personKind} onEdit={openPerson} onDelete={deletePerson} /></section>}
    </main>
    {personModal && <Modal title={`${personModal.id ? 'Edit' : 'Add'} ${personKind === 'brokers' ? 'broker' : 'owner'}`} onClose={() => setPersonModal(null)}><form onSubmit={savePerson} className="admin-form"><div className="form-grid"><Field label="Full name" required value={personForm.name} onChange={(value) => setPersonForm({ ...personForm, name: value })} /><Field label="Phone number" required value={personForm.phone} onChange={(value) => setPersonForm({ ...personForm, phone: value })} /><Field label="Email (optional)" type="email" value={personForm.email} onChange={(value) => setPersonForm({ ...personForm, email: value })} /><Field label="NIDA (optional)" value={personForm.nid} onChange={(value) => setPersonForm({ ...personForm, nid: value })} /><Field label="TIN (optional)" value={personForm.tin} onChange={(value) => setPersonForm({ ...personForm, tin: value })} /></div><ModalActions saving={saving} /></form></Modal>}
    {listingModal && <Modal title="Edit listing" onClose={() => setListingModal(null)}><form onSubmit={saveListing} className="admin-form"><div className="form-grid"><Field label="Property title" required value={listingModal.title} onChange={(value) => setListingModal({ ...listingModal, title: value })} /><Field label="Sale price" type="number" value={String(listingModal.salePrice ?? '')} onChange={(value) => setListingModal({ ...listingModal, salePrice: value })} /><label>Status<select value={listingModal.status ?? 'ACTIVE'} onChange={(event) => setListingModal({ ...listingModal, status: event.target.value })}><option>ACTIVE</option><option>PENDING</option><option>SOLD</option><option>ARCHIVED</option></select></label></div><ModalActions saving={saving} /></form></Modal>}
    {addListingOpen && <Modal title="Add quick listing" onClose={() => setAddListingOpen(false)}><form onSubmit={addListing} className="admin-form"><div className="form-grid"><label>Property type<select value={newListing.kind} onChange={(event) => setNewListing({ ...newListing, kind: event.target.value as ListingKind })}>{(Object.keys(labels) as ListingKind[]).map((kind) => <option key={kind} value={kind}>{labels[kind]}</option>)}</select></label>{newListing.kind === 'commercial-area' && <label>Listing type<select value={newListing.listingType} onChange={(event) => setNewListing({ ...newListing, listingType: event.target.value })}><option>SALE</option><option>RENT</option></select></label>}<Field label="Property title" required value={newListing.title} onChange={(value) => setNewListing({ ...newListing, title: value })} /><Field label="Sale price" type="number" required value={newListing.salePrice} onChange={(value) => setNewListing({ ...newListing, salePrice: value })} /></div><ModalActions saving={saving} label="Add listing" /></form></Modal>}
  </div>
}

function Metric({ icon, label, value, detail, tone }: { icon: string; label: string; value: number; detail: string; tone: string }) { return <div className="metric-card"><span className={`metric-icon ${tone}`}><i className={`bi bi-${icon}`} /></span><div><small>{label}</small><strong>{value.toLocaleString()}</strong><em>{detail}</em></div></div> }
function PanelHeading({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) { return <div className="panel-heading"><h2>{title}</h2>{action && <button onClick={onAction}>{action} <i className="bi bi-arrow-up-right" /></button>}</div> }
function Search({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) { return <div className="admin-search"><i className="bi bi-search" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></div> }
function Loading() { return <div className="loading-state"><span /><span /><span /> Loading workspace data...</div> }
function Field({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) { return <label>{label}<input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} /></label> }
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) { return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="admin-modal"><div className="modal-heading"><div><span>Admin workspace</span><h2>{title}</h2></div><button onClick={onClose} title="Close"><i className="bi bi-x-lg" /></button></div>{children}</div></div> }
function ModalActions({ saving, label = 'Save changes' }: { saving: boolean; label?: string }) { return <div className="modal-actions"><button type="submit" className="admin-primary" disabled={saving}>{saving ? 'Saving...' : label}</button></div> }
function ListingTable({ listings, onEdit, onDelete, emptyMessage = 'No listings yet.' }: { listings: Listing[]; onEdit: (listing: Listing) => void; onDelete: (listing: Listing) => void; emptyMessage?: string }) { return listings.length ? <div className="table-wrap"><table className="admin-table"><thead><tr><th>Property</th><th>Type</th><th>Price</th><th>Status</th><th>Contacts</th><th /></tr></thead><tbody>{listings.map((listing) => <tr key={`${listing.category}-${listing.id}`}><td><div className="property-cell"><span className="property-thumb"><i className={`bi bi-${listing.category === 'house-for-sale' ? 'house' : listing.category === 'land-for-sale' ? 'geo' : 'shop'}`} /></span><span><strong>{listing.title || 'Untitled property'}</strong><small>{listing.id.slice(0, 8)} · {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : 'Recently added'}</small></span></div></td><td>{labels[listing.category]}</td><td><strong>{money(listing.salePrice)}</strong></td><td><span className={`status-pill ${(listing.status ?? 'ACTIVE').toLowerCase()}`}>{listing.status ?? 'ACTIVE'}</span></td><td><small>{listing.owner?.name ?? 'No owner'}<br />{listing.broker?.name ?? 'No broker'}</small></td><td><div className="row-actions"><button title="Edit" onClick={() => onEdit(listing)}><i className="bi bi-pencil" /></button><button title="Delete" onClick={() => onDelete(listing)}><i className="bi bi-trash3" /></button></div></td></tr>)}</tbody></table></div> : <div className="empty-state"><i className="bi bi-inbox" /><strong>{emptyMessage}</strong><span>Try changing your filters or add a new listing.</span></div> }
function PeopleTable({ people, kind, onEdit, onDelete }: { people: Person[]; kind: PersonKind; onEdit: (kind: PersonKind, person?: Person) => void; onDelete: (kind: PersonKind, id: string) => void }) { return people.length ? <div className="table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Identity</th><th /></tr></thead><tbody>{people.map((person) => <tr key={person.id}><td><div className="person-cell"><span>{person.name.slice(0, 2).toUpperCase()}</span><strong>{person.name}</strong></div></td><td>{person.phone}</td><td>{person.email || 'Not provided'}</td><td><small>{person.nid ? `NIDA ${person.nid}` : 'No NIDA'}<br />{person.tin ? `TIN ${person.tin}` : 'No TIN'}</small></td><td><div className="row-actions"><button title="Edit" onClick={() => onEdit(kind, person)}><i className="bi bi-pencil" /></button><button title="Delete" onClick={() => onDelete(kind, person.id)}><i className="bi bi-trash3" /></button></div></td></tr>)}</tbody></table></div> : <div className="empty-state"><i className="bi bi-people" /><strong>No {kind} found</strong><span>Add a contact to start building your directory.</span></div> }
