import Header from '../components/Header'
import useLocalization from '../hooks/useLocalization'
import MainLayout from './MainLayout'
import '../styles/layout.css'

function WorkspaceLayout() {
  const {
    currentLanguage,
    setLanguage,
  } = useLocalization()

  return (
    <div className="workspace-layout">
      <Header
        selectedLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <MainLayout />
    </div>
  )
}

export default WorkspaceLayout
