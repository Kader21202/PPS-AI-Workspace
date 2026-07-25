type UserMessageProps = {
  content: string
}

function UserMessage({
  content,
}: UserMessageProps) {
  return (
    <article className="user-message">
      <div className="message-content">
        {content}
      </div>
    </article>
  )
}

export default UserMessage
