import logoPps from '../assets/logo-pps.png'
import useLocalization from '../hooks/useLocalization'
import {
  supportedLanguages,
  type SupportedLanguage,
} from '../models/Language'

type HeaderProps = {
  selectedLanguage: SupportedLanguage
  onLanguageChange: (
    language: SupportedLanguage,
  ) => void
}

function Header({
  selectedLanguage,
  onLanguageChange,
}: HeaderProps) {
  const { t } = useLocalization()

  return (
    <header className="app-header">
      <div className="app-brand">
        <div className="app-logo-container">
          <img
            className="pps-logo"
            src={logoPps}
            alt="Logo du PPS"
          />
        </div>

        <div className="app-identity">
          <div className="app-title-row">
            <h1 className="app-title">pps.ia</h1>
          </div>

          <div
            className="app-title-arabic"
            lang="ar"
            dir="rtl"
          >
            حزب التقدم و الاشتراكية
          </div>

          <p className="app-subtitle">
            {t('assistantSubtitle')}
          </p>
        </div>
      </div>

      <div className="header-actions">
        <label
          className="language-selector"
          htmlFor="workspace-language"
        >
          <svg
            className="language-selector-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a15 15 0 0 1 0 18" />
            <path d="M12 3a15 15 0 0 0 0 18" />
          </svg>

          <select
            id="workspace-language"
            value={selectedLanguage}
            aria-label={t('interfaceLanguage')}
            onChange={event =>
              onLanguageChange(
                event.target.value as SupportedLanguage,
              )
            }
          >
            {supportedLanguages.map(language => (
              <option
                key={language.code}
                value={language.code}
              >
                {language.nativeLabel}
              </option>
            ))}
          </select>
        </label>

        <div
          className="connection-status"
          role="status"
        >
          <span
            className="status-dot"
            aria-hidden="true"
          />

          <span className="connection-status__label">
            {t('connected')}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header

