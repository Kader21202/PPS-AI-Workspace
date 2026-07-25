type AssistantMessageProps = {
  content: string
}

function AssistantMessage({
  content,
}: AssistantMessageProps) {
  return (
    <article className="assistant-message">
      <div className="message-content">
        {content}
      </div>
    </article>
  )
}

export default AssistantMessage
