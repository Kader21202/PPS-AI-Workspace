import logoPps from '../assets/logo-pps.png'

function TypingIndicator() {
  return (
    <div
      className="typing-indicator"
      role="status"
      aria-label="Réponse en préparation"
    >
      <img
        className="typing-indicator__logo"
        src={logoPps}
        alt=""
        aria-hidden="true"
      />

      <span className="typing-indicator__dots" aria-hidden="true">
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__dot" />
      </span>
    </div>
  )
}

export default TypingIndicator
