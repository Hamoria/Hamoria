export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('sv-SE', {
    // weekday: "long",
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
