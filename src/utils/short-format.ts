export default function shortFormat(num: number) {
  if (num < 0) return 0

  const result = Math.abs(num) > 999
    ? `${Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1))}k`
    : Math.sign(num) * Math.abs(num)
  return result
}
