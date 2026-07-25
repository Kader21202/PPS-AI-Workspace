import logoPps from '../assets/logo-pps.png'

function Header() {
  return (
    <header className="app-header">
      <div className="app-brand">
        <img
          className="pps-logo"
          src={logoPps}
          alt="Logo du PPS"
        />

        <div className="app-identity">
          <h1 className="app-title">
            pps.ia
            <span className="beta-mini">Bêta</span>
          </h1>

          <div className="app-title-arabic" lang="ar" dir="rtl">
            حزب التقدم و الاشتراكية
          </div>

          <p className="app-subtitle">
            Assistant institutionnel spécialisé
          </p>
        </div>
      </div>

      <div className="connection-status" role="status">
        <span className="status-dot" aria-hidden="true" />
        Connecté
      </div>
    </header>
  )
}

export default Header