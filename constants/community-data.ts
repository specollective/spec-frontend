export interface CommunityMember {
  name: string
  title: string
  image: string
}

export interface Testimonial {
  name: string
  title: string
  src: string
  image: { alt: string }
  quote: string
}

export const communityMembers: CommunityMember[] = [
  { name: 'Victoria Lo', title: 'Software Engineer', image: '/faces/Rectangle_Victoria.svg' },
  { name: 'Yoline Banerjee', title: 'Software Engineer', image: '/faces/Rectangle_Yoline.svg' },
  { name: 'Crystal Shamsi', title: 'Software Engineer', image: '/faces/Rectangle_Crystal.svg' },
  { name: 'Alicia Bong', title: 'Project Manager', image: '/faces/Rectangle_Alicia.svg' },
  { name: 'Lu Daley', title: 'Software Engineer', image: '/faces/Rectangle_Lu.svg' },
  { name: 'Ilia de Leon', title: 'Design Lead', image: '/faces/Rectangle_Ilia.svg' },
  { name: 'Joe Golden', title: 'Curator', image: '/faces/Rectangle_Joe.svg' },
  { name: 'Marcus Steiner', title: 'LMS Manager', image: '/faces/Rectangle_Marcus.svg' },
  { name: 'Menoukha Robin Case', title: 'Content Advisor', image: '/faces/Rectangle_Menoukha.svg' },
  { name: 'Nan Eileen Mead', title: 'Research Lead', image: '/faces/Rectangle_Nan.svg' },
  { name: 'Dennis Morgan', title: 'Lead Game Designer', image: '/faces/Rectangle_Dennis.svg' },
  { name: 'Najwana Nashmin', title: 'Software Engineer', image: '/faces/Rectangle_Najwana.svg' },
  { name: 'Megan Kim', title: 'Research Intern', image: '/faces/Rectangle_Megan.svg' },
  { name: 'Sharleen Loh', title: 'Research Intern', image: '/faces/Rectangle_Sharleen.svg' },
  { name: 'Zara Abdurahaman', title: 'Junior Researcher', image: '/faces/Rectangle_Zara.svg' },
  { name: 'Zoey Liu', title: 'Research Intern', image: '/faces/Rectangle_Zoey.svg' },
  { name: 'Ollie Oliver', title: 'Curator', image: '/faces/Rectangle_Ollie2.svg' },
  { name: 'Zaire Overton', title: 'Special Projects', image: '/faces/Rectangle_Zaire.svg' },
  { name: 'Jie (Jolin) Shen', title: 'Research Intern', image: '/faces/Rectangle_Joline.svg' },
  { name: 'Karishma Mehta', title: 'Junior Researcher', image: '/faces/Rectangle_Karishma2.svg' },
]

export const testimonials: Testimonial[] = [
  {
    name: 'Victoria Lo',
    title: 'Software Engineer',
    src: '/faces/Rectangle_Victoria.svg',
    image: { alt: 'Victoria Lo' },
    quote:
      'During my time at SPEC, I learned so much about the foundations of software engineering, agile, and open source development. I joined SPEC for its mission to empower individuals to learn as you go and contribute to world-changing initiatives through the open sharing economy. With a small but mighty team, the genuine care that everyone has to do good by people is what keeps me motivated to continue contributing, growing, and learning.',
  },
  {
    name: 'Lu Daley',
    title: 'Software Engineer',
    src: '/faces/Rectangle_Lu.svg',
    image: { alt: 'Lu Daley' },
    quote:
      'I made a mid-career switch from Software Sales to Software Development. After graduating from The Flatiron School, I joined SPEC and gained invaluable industry experience. My team developed, tested, and deployed software daily. I was independent with a team-structured safety net that allowed me to take risks, fail, learn, and grow. Three months after joining SPEC, I was hired for my first full-time Software Engineering role. My team celebrated my accomplishment and helped me prepare for my new role.',
  },
  {
    name: 'Ilia de Leon',
    title: 'Design Lead',
    src: '/faces/Rectangle_Ilia.svg',
    image: { alt: 'Ilia de Leon' },
    quote:
      "SPEC has been a perfect next step in my UX design journey. It's such a great space for me to explore the different areas within UX design, to figure out where I excel. On top of discovery within this new field for me, being 100% supported and encouraged to continue learning has been amazing. SPEC is going to change the world, and I am happy to contribute my small piece!",
  },
  {
    name: 'Yoline Banerjee',
    title: 'Software Engineer',
    src: '/faces/Rectangle_Yoline.svg',
    image: { alt: 'Yoline Banerjee' },
    quote:
      'As an RA for SPEC, I had the opportunity to dive deep into the world of coding and gain valuable skills that have had a lasting impact on my personal and professional growth. But beyond just the technical knowledge, what truly stood out to me was the incredibly supportive and kind community of people at SPEC. I felt welcomed from day one and was always encouraged to ask questions, seek guidance, and push myself to learn more.',
  },
  {
    name: 'Crystal Shamsi',
    title: 'Software Engineer',
    src: '/faces/Rectangle_Crystal.svg',
    image: { alt: 'Crystal Shamsi' },
    quote:
      "I'm so grateful to be a part of the SPEC team. Meeting with Dr. Rhianna Rogers gave me invaluable insight into cultivating cultural competence and how to begin development with the end-user in mind, thereby focusing first and foremost on inclusiveness and accessibility. The mentorship and support I've received have been instrumental to my growth and success.",
  },
  {
    name: 'Alicia Bong',
    title: 'Project Manager',
    src: '/faces/Rectangle_Alicia.svg',
    image: { alt: 'Alicia Bong' },
    quote:
      'I joined SPEC during a transitionary period of my life. Being able to work on multiple projects and in various roles all while being mentored helped me identify what my next career choice should be. Now that I have found gainful employment outside of SPEC I am happy to still feel included and connected to the team.',
  },
  {
    name: 'Joe Golden',
    title: 'Curator',
    src: '/faces/Rectangle_Joe.svg',
    image: { alt: 'Joe Golden' },
    quote:
      "Working with SPEC allowed me to curate a virtual art gallery space, Digital Expressions of Mass Incarceration, featuring the work of LGBTQ+ incarcerated artists and providing a platform for marginalized community members inside the prison system. Letters from the inmates thanking us for sharing their work demonstrate the impact of our efforts. I'm inspired to continue to discover ways to employ the arts to connect with each other.",
  },
  {
    name: 'Menoukha Robin Case',
    title: 'Ph.D. Content Advisor',
    src: '/faces/Rectangle_Menoukha.svg',
    image: { alt: 'Menoukha Robin Case' },
    quote:
      'The development process at SPEC is an exceptional pleasure because of its egalitarian intern program. Hearing the voices and sharing content development with people who have diverse approaches, diverse knowledge sources, and stakes in varying outcomes is illuminating. It helped us build inclusive, welcoming courses that have demonstrated strong learning outcomes.',
  },
]
