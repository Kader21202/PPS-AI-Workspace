function WelcomeScreen() {
  return (
    <section className="welcome-screen">
      <div className="welcome-language">
        <h2>Bienvenue dans le dialogue</h2>

        <p>
          Le Parti du Progrès et du Socialisme est à l'écoute des citoyennes
          et des citoyens et ouvert au dialogue.
        </p>
      </div>

      <div
        className="welcome-language welcome-language-arabic"
        lang="ar"
        dir="rtl"
      >
        <h2>مرحباً بكم في فضاء الحوار</h2>

        <p>
          يظل حزب التقدم والاشتراكية منصتًا للمواطنات والمواطنين
          ومنفتحًا على الحوار.
        </p>
      </div>
    </section>
  )
}

export default WelcomeScreen
