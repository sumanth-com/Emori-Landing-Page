import { motion, useReducedMotion } from 'framer-motion'
import avniJamwal from '../assets/Avni Jamwal.webp'
import komalGarg from '../assets/Komal Garg.jpeg'
import manishKumar from '../assets/Manish Kumar.webp'
import sagarMehra from '../assets/Sagar Mehra.webp'
import santoshKumar from '../assets/Santosh Kumar.webp'
import { luxuryEase } from '../lib/motion'
import { JewelleryMarquee } from './JewelleryMarquee'

const team = [
  {
    name: 'Avni Jamwal',
    role: 'Head Merchandiser & Designer',
    photo: avniJamwal,
  },
  {
    name: 'Manish Kumar',
    role: 'Head Operations & Logistics',
    photo: manishKumar,
  },
  {
    name: 'Komal Garg',
    role: 'Head Retail Expansion',
    photo: komalGarg,
  },
  {
    name: 'Sagar Mehra',
    role: 'Head Sales & Marketing',
    photo: sagarMehra,
  },
  {
    name: 'Santosh Kumar',
    role: 'Head Technology',
    photo: santoshKumar,
  },
]

const memberReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: luxuryEase },
  },
}

function TeamMember({
  member,
  variants,
}: {
  member: (typeof team)[number]
  variants?: typeof memberReveal
}) {
  return (
    <motion.article className="team__member" variants={variants}>
      <div className="team__photo">
        <img src={member.photo} alt={member.name} loading="lazy" />
      </div>
      <h3 className="team__name">{member.name}</h3>
      <p className="team__role">{member.role}</p>
    </motion.article>
  )
}

export function Team({ inline = false }: { inline?: boolean }) {
  const reduced = useReducedMotion()
  const Wrapper = inline ? 'div' : 'section'
  const loopTeam = [...team, ...team, ...team]

  return (
    <Wrapper
      id="team"
      className={`team${inline ? ' team--inline' : ''}`}
      aria-label="Leadership team"
    >
      <div className="team__rail">
        <motion.div
          className="team__grid team__grid--desktop"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {team.map((member) => (
            <TeamMember key={member.name} member={member} variants={memberReveal} />
          ))}
        </motion.div>

        <div
          className="team__mobile-marquee"
          aria-label="Leadership team"
        >
          <div
            className={`team__mobile-track${reduced ? ' team__mobile-track--static' : ''}`}
          >
            {loopTeam.map((member, index) => (
              <TeamMember key={`${member.name}-${index}`} member={member} />
            ))}
          </div>
        </div>

        <JewelleryMarquee />
      </div>
    </Wrapper>
  )
}
