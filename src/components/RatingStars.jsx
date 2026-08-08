import { useState } from 'react'
import { FiStar } from 'react-icons/fi'

const sizeMap = {
  small: 'h-3.5 w-3.5',
  medium: 'h-5 w-5',
  large: 'h-7 w-7',
}

/**
 * RatingStars
 * Props:
 * - rating (0-5)
 * - total (nombre d'avis)
 * - readonly (bool)
 * - size ('small' | 'medium' | 'large')
 * - onChange(newRating)
 * - showCount (bool)
 * - className
 */
function RatingStars({
  rating = 0,
  total = 0,
  readonly = true,
  size = 'medium',
  onChange,
  showCount = false,
  className = '',
}) {
  const [hoverValue, setHoverValue] = useState(0)
  const starSize = sizeMap[size] || sizeMap.medium
  const displayValue = hoverValue || rating

  const handleClick = (value) => {
    if (readonly) return
    onChange && onChange(value)
  }

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div
        className="flex items-center"
        role="img"
        aria-label={`Note : ${rating} sur 5`}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.round(displayValue)
          return (
            <button
              key={star}
              type="button"
              disabled={readonly}
              aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
              onClick={() => handleClick(star)}
              onMouseEnter={() => !readonly && setHoverValue(star)}
              onMouseLeave={() => !readonly && setHoverValue(0)}
              className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-125'} transition-transform duration-200`}
            >
              <FiStar
                className={`${starSize} transition-colors duration-200 ${
                  filled ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-300'
                }`}
              />
            </button>
          )
        })}
      </div>
      {showCount && (
        <span className="text-sm text-zinc-500">
          {rating} {total ? `(${total} avis)` : ''}
        </span>
      )}
    </div>
  )
}

export default RatingStars
