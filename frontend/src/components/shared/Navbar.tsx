interface NavbarProps {
  onLogoClick: () => void
}

export default function Navbar({ onLogoClick }: NavbarProps) {
  return (
    <nav className="oweru-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
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
        <span className="text-white-50 small d-none d-sm-inline">Register Estate</span>
      </div>
    </nav>
  )
}
