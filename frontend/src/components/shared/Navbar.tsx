interface NavbarProps {
  onLogoClick: () => void
}

import { useLanguage } from '../../i18n'

export default function Navbar({ onLogoClick }: NavbarProps) {
  const { language, setLanguage, tr } = useLanguage()

  return (
    <nav className="oweru-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between gap-3">
        <a
          href="#"
          className="oweru-brand"
          onClick={(e) => {
            e.preventDefault()
            onLogoClick()
          }}
        >
          <span className="oweru-brand-mark">O</span>
          <span>
            <span className="oweru-brand-o">Owe</span>ru
          </span>
        </a>
        <div className="d-flex align-items-center gap-3">
            <div className="btn-group btn-group-sm" role="group" aria-label="Language">
            <button type="button" className={`btn ${language === 'en' ? 'btn-light' : 'btn-outline-light'}`} onClick={() => setLanguage('en')}>Eng</button>
            <button type="button" className={`btn ${language === 'sw' ? 'btn-light' : 'btn-outline-light'}`} onClick={() => setLanguage('sw')}>Kisw</button>
          </div>
          <span className="text-white-50 small d-none d-sm-inline">{tr('Register Estate')}</span>
        
        </div>
      </div>
    </nav>
  )
}
