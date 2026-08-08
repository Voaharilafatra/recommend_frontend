/**
 * MarkerCluster - représentation visuelle d'un regroupement de marqueurs proches.
 * Props : count, x, y, onClick
 */
function MarkerCluster({ count, x, y, onClick }) {
  const size = count > 20 ? 52 : count > 8 ? 44 : 36

  return (
    <button
      onClick={onClick}
      aria-label={`${count} services regroupés, cliquez pour zoomer`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
      }}
      className="absolute grid place-items-center rounded-full bg-yellow-400 font-bold text-black shadow-lg shadow-yellow-400/40 ring-4 ring-white transition-transform duration-300 hover:scale-110 animate__animated animate__bounceIn"
    >
      {count}
    </button>
  )
}

export default MarkerCluster
