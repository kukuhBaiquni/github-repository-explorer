export default function textEllipsis(text: string, max: number) {
  const ellipsis = max < text.length ? '...' : ''
  const result = `${text.slice(0, Math.max(max, 0))}${ellipsis}`

  return result
}
