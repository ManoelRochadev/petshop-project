export function Dashboard() {
  return (
    <div>
      <h1>Olá {localStorage.getItem('email')}</h1>
    </div>
  )
}