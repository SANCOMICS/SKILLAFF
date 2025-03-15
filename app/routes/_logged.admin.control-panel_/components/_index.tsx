import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
  PageLayout,
} from '~/designSystem'
import { ErrorBoundary } from '~/designSystem/core'
import { useDesignSystem } from '~/designSystem/provider'

export default function LandingPage() {
  const { isLoading } = useDesignSystem()
  const features = [
    {
      heading: `Premium Digital Skills Courses`,
      description: `Access high-quality courses teaching in-demand digital skills that can help you start earning online immediately`,
      icon: <i className="las la-graduation-cap"></i>,
    },
    {
      heading: `50% Commission on Referrals`,
      description: `Earn passive income by sharing SkillFlow with others - get 50% commission on every referral`,
      icon: <i className="las la-hand-holding-usd"></i>,
    },
    {
      heading: `Mobile Learning`,
      description: `Learn anytime, anywhere with our mobile-responsive platform optimized for on-the-go studying`,
      icon: <i className="las la-mobile"></i>,
    },
    {
      heading: `Secure Payments`,
      description: `Integrated Fapshi payment system ensures your transactions and earnings are always protected`,
      icon: <i className="las la-lock"></i>,
    },
    {
      heading: `Supportive Community`,
      description: `Join a network of ambitious learners sharing tips, opportunities and success stories`,
      icon: <i className="las la-users"></i>,
    },
    {
      heading: `Quick Start`,
      description: `Get started in minutes with social login via Facebook or TikTok and begin learning immediately`,
      icon: <i className="las la-rocket"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Jean Paul`,
      designation: `Digital Marketing Freelancer`,
      content: `Within 2 months of joining SkillFlow, I learned Facebook Ads and landed my first client. Now I make 300,000 XAF monthly from my digital marketing services.`,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: `Marie Claire`,
      designation: `Affiliate Marketer`,
      content: `The affiliate program is amazing! I've earned over 500,000 XAF just by sharing SkillFlow with my network. The courses helped me understand digital marketing too.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Emmanuel`,
      designation: `Web Developer`,
      content: `SkillFlow taught me web development from scratch. Within 6 months, I was building websites for clients. Best investment I've ever made in myself.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Basic Access`,
      description: `Perfect for beginners starting their digital skills journey`,
      monthly: 0,
      yearly: 0,
      features: [
        `Access to 5 basic courses`,
        `Community access`,
        `Mobile learning`,
      ],
    },
    {
      title: `Pro Access`,
      description: `Most popular choice for serious learners`,
      monthly: 3000,
      yearly: 30000,
      features: [
        `Access to all courses`,
        `Priority support`,
        `Affiliate program access`,
        `Certification`,
      ],
      highlight: true,
    },
  ]

  const questionAnswers = [
    {
      question: `How quickly can I start earning?`,
      answer: `Many of our students start earning within 2-3 months of consistent learning and practice. The timeline varies based on the skill you choose and your dedication.`,
    },
    {
      question: `Do I need any prior experience?`,
      answer: `No prior experience needed! Our courses start from the basics and gradually progress to advanced concepts.`,
    },
    {
      question: `How does the affiliate program work?`,
      answer: `You earn 50% commission on every person who joins through your referral link. Earnings are automatically tracked and paid to your wallet.`,
    },
    {
      question: `Can I access courses on mobile?`,
      answer: `Yes! Our platform is fully mobile-responsive. Learn on any device, anytime, anywhere.`,
    },
  ]

  const steps = [
    {
      heading: `Choose Your Skill Path`,
      description: `Select from our curated collection of in-demand digital skills courses`,
    },
    {
      heading: `Learn at Your Pace`,
      description: `Access course content 24/7 and learn according to your schedule`,
    },
    {
      heading: `Practice Real Projects`,
      description: `Apply your skills on practical projects that prepare you for real work`,
    },
    {
      heading: `Start Earning`,
      description: `Use your new skills to find clients or earn through our affiliate program`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Struggling to find stable income opportunities`,
    },
    {
      emoji: `😔`,
      title: `Feeling left behind in the digital economy`,
    },
    {
      emoji: `😤`,
      title: `Frustrated with expensive courses that don't deliver results`,
    },
  ]

  return (
    <ErrorBoundary>
      <PageLayout isLoading={isLoading}>
        <LandingContainer navItems={navItems}>
          <LandingHero
            title={`Transform Your Skills into Income in the Digital Economy`}
            subtitle={`Join thousands of young Africans learning high-income digital skills and earning through our 50% commission affiliate program`}
            buttonText={`Start Learning Today`}
            buttonLink={`/skillfeed`}
            pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/gDTGyB-SKILLFLOW-wHLz`}
            socialProof={
              <LandingSocialRating
                numberOfUsers={1000}
                suffixText={`successful learners`}
              />
            }
          />
          <LandingSocialProof title={`Featured on`} />
          <LandingPainPoints
            title={`77% of young Africans want to learn new skills but don't know where to start`}
            painPoints={painPoints}
          />
          <LandingHowItWorks
            title={`Your Journey to Digital Income`}
            steps={steps}
          />
          <LandingFeatures
            id="features"
            title={`Everything You Need to Succeed in the Digital Economy`}
            subtitle={`Built specifically for ambitious young Africans looking to generate income through digital skills`}
            features={features}
          />
          <LandingTestimonials
            title={`Join Thousands Already Building Their Digital Future`}
            subtitle={`See how SkillFlow is helping young Africans transform their lives through digital skills`}
            testimonials={testimonials}
          />
          <LandingPricing
            id="pricing"
            title={`Affordable Investment in Your Future`}
            subtitle={`Choose the plan that matches your goals`}
            packages={packages}
          />
          <LandingFAQ
            id="faq"
            title={`Common Questions`}
            subtitle={`Everything you need to know about getting started`}
            questionAnswers={questionAnswers}
          />
          <LandingCTA
            title={`Start Your Digital Success Journey Today`}
            subtitle={`Join 1000+ learners already building their future with SkillFlow`}
            buttonText={`Get Started Now`}
            buttonLink={`/register`}
          />
        </LandingContainer>
      </PageLayout>
    </ErrorBoundary>
  )
}
