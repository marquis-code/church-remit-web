// composables/useTestimonials.ts
import { ref } from 'vue'
import type { Testimonial } from '~/types/testimonial'

export function useTestimonials() {
  const testimonials = ref<Testimonial[]>([
    {
      img: '/testimonials/tina-yards.jpg',
      name: 'Tina Yards',
      title: 'VP of Sales, Protocol',
      quote:
        `Thanks to Radiant, we're finding new leads that we never would have found with legal methods.`,
    },
    {
      img: '/testimonials/conor-neville.jpg',
      name: 'Conor Neville',
      title: 'Head of Customer Success, TaxPal',
      quote:
        'Radiant made undercutting all of our competitors an absolute breeze.',
    },
    {
      img: '/testimonials/amy-chase.jpg',
      name: 'Amy Chase',
      title: 'Head of GTM, Pocket',
      quote:
        'We closed a deal in literally a few minutes because we knew their exact budget.',
    },
    {
      img: '/testimonials/veronica-winton.jpg',
      name: 'Veronica Winton',
      title: 'CSO, Planeteria',
      quote:
        `We've managed to put two of our main competitors out of business in 6 months.`
    },
    {
      img: '/testimonials/dillon-lenora.jpg',
      name: 'Dillon Lenora',
      title: 'VP of Sales, Detax',
      quote: 'I was able to replace 80% of my team with RadiantAI bots.',
    },
    {
      img: '/testimonials/harriet-arron.jpg',
      name: 'Harriet Arron',
      title: 'Account Manager, Commit',
      quote:
        `I've smashed all my targets without having to speak to a lead in months.`,
    },
  ])

  return {
    testimonials,
  }
}
