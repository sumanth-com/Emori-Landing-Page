import { motion } from 'framer-motion'

export function DiamondSparkle({ className = '' }: { className?: string }) {
  return (
    <div className={`diamond-field ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          className={`diamond-field__sparkle diamond-field__sparkle--${i}`}
          animate={{
            opacity: [0.15, 0.85, 0.15],
            scale: [0.85, 1.15, 0.85],
          }}
          transition={{
            duration: 4.5 + i * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.7,
          }}
        />
      ))}
    </div>
  )
}
