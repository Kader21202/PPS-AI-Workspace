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
        <img
          className="pps-logo"
          src={logoPps}
          alt="Logo du PPS"
        />

        <div className="app-identity">
          <h1 className="app-title">
            pps.ia
            <span className="beta-mini">
              {t('beta')}
            </span>
          </h1>

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
          <span
            className="language-selector-icon"
            aria-hidden="true"
          >
            🌐
          </span>

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
          {t('connected')}
        </div>
      </div>
    </header>
  )
}

export default Header
