'use client'

import {useState} from 'react'

export function ComingSoonForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/site-unlock', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password}),
      })

      if (response.ok) {
        window.location.href = '/'
        return
      }

      setError('Incorrect password')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-white px-6">
      <p className="text-base text-black">Site is coming soon</p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex w-full max-w-xs flex-col items-center gap-4"
      >
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          className="w-full border-b border-black/20 bg-transparent px-1 py-2 text-sm text-black outline-none placeholder:text-neutral-400 focus:border-black"
        />
        <button
          type="submit"
          disabled={isSubmitting || !password}
          className="text-sm text-black transition-opacity hover:opacity-60 disabled:opacity-40"
        >
          {isSubmitting ? 'Checking…' : 'Enter'}
        </button>
        {error ? (
          <p className="text-sm text-neutral-400">{error}</p>
        ) : null}
      </form>
    </main>
  )
}
