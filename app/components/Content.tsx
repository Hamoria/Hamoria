import type React from 'react'

export default function Content({
  cn,
  children,
}: {
  cn?: string
  children: React.ReactNode
}) {
  return (
    <main
      className={`px-0 place-self-stretch min-h-[30vh] flex flex-col items-center justify-center ${
        cn ? cn : ''
      }`}>
      {children}
    </main>
  )
}
