export function SoftDivider({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`soft-divider ${light ? 'soft-divider--light' : ''}`}
      aria-hidden="true"
    />
  )
}
