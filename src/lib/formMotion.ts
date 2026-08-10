import { luxuryEase } from './motion'

export const fieldReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: luxuryEase },
  },
}
