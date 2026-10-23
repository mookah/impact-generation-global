/* =========================================================
   IMPACT GENERATION GLOBAL
   Single source of truth for site content.
   Update this file to update the whole website.
========================================================= */

export const site = {
  name: "Impact Generation Global",
  shortName: "IGG",
  tagline: "Empowering a generation. Transforming lives.",
  description:
    "Impact Generation Global is a Christ-centered nonprofit raising young people in Zambia with faith, character, dignity and purpose through discipleship, mentorship, education and practical community outreach.",
  url: "https://www.impactgenerationglobal.org",
  email: "info@impactgenerationglobal.org",
  facebook: "https://web.facebook.com/impactgeneration.com2022",
  youtube: "https://www.youtube.com/@impactgenerationglobal",
  paypal:
    "https://www.paypal.com/donate/?hosted_button_id=34HPDHC4M7YZA",
  gofundme: "https://gofund.me/7f8b19b5e",
  founded: 2022,
  locations: "Zambia & United States",
  instagram: "https://www.instagram.com/impactgenerationglobal",
} as const;

// Compatibility with the existing feature branch's Facebook updates pages.
export const FACEBOOK_PAGE_URL = site.facebook;

export const vision =
  "To see a transformed generation of young people empowered with Christ-centered values, practical skills and sustainable opportunities to lead their communities with purpose and dignity.";

export const mission =
  "We walk alongside young people through discipleship, education and counselling, youth development, self-empowerment and healthy living — raising devoted disciples of Jesus Christ who become positive influences in their generation.";

export const missionPillars = [
  {
    title: "Discipleship",
    description:
      "Helping young people know Christ, grow spiritually and live out their faith daily.",
  },
  {
    title: "Education & Counselling",
    description:
      "Guidance, life skills and a safe place to process real questions and real pressure.",
  },
  {
    title: "Youth Development",
    description:
      "Leadership, mentorship and opportunities that build confidence and capability.",
  },
  {
    title: "Self-Empowerment",
    description:
      "Practical skills that help young people stand on their own and serve others.",
  },
  {
    title: "Healthy Living",
    description:
      "Caring for the body, mind, relationships and future with wise, deliberate choices.",
  },
] as const;

export const values = [
  { title: "Faith", description: "Christ at the centre of everything we do." },
  { title: "Integrity", description: "Honest, accountable and transparent." },
  { title: "Dignity", description: "Every person treated with worth and respect." },
  { title: "Community", description: "Safe spaces where people truly belong." },
  { title: "Compassion", description: "Serving with love, patience and understanding." },
  { title: "Transformation", description: "Lasting change in lives and communities." },
] as const;

export type Program = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  focus: string[];
  stat?: { value: string; label: string };
};

export const programs: Program[] = [
  {
    slug: "boys-to-men",
    title: "Boys To Men",
    summary:
      "Mentoring boys and young men in character, discipline and responsible leadership.",
    description:
      "Boys To Men creates safe spaces where boys are mentored, encouraged and equipped with values that shape their future. Through mentorship sessions, the Boys 2 Men Conference and consistent role models, young men grow in confidence, self-control and positive decision-making.",
    image: "/images/boys-to-men/boys-to-men-hero.webp",
    imageAlt: "Young men at a Boys To Men mentorship session",
    focus: [
      "Mentorship sessions",
      "Character and discipline",
      "Leadership conferences",
      "Faith and identity",
      "Emotional strength",
      "Service to community",
    ],
    stat: { value: "Boys 2 Men", label: "Annual conference" },
  },
  {
    slug: "pad-a-girl",
    title: "Pad A Girl",
    summary:
      "Restoring dignity and keeping girls in school through menstrual hygiene support.",
    description:
      "Pad A Girl supports girls with menstrual hygiene products, mentorship, life-skills education and faith-filled encouragement so they can stay in school, walk with dignity and discover purpose.",
    image: "/images/pad-a-girl/pad-a-girl-hero.webp",
    imageAlt: "Pad A Girl school outreach",
    focus: [
      "Dignity kits",
      "School outreach",
      "Mentorship",
      "Life skills",
      "Community engagement",
      "Faith and encouragement",
    ],
    stat: { value: "1,000+", label: "Girls reached" },
  },
  {
    slug: "school-ministry",
    title: "School Ministry",
    summary:
      "Reaching students with mentorship, character formation and wise life choices.",
    description:
      "We partner with schools to encourage students through assemblies, classroom sessions and one-to-one mentorship — speaking honestly about discipline, drug abuse prevention, healthy living, purpose and faith.",
    image: "/images/school-ministry/school-ministry-hero.webp",
    imageAlt: "Students gathered for a school ministry session",
    focus: [
      "School assemblies",
      "Classroom sessions",
      "Mentorship",
      "Wise choices",
      "Character building",
      "Community impact",
    ],
  },
  {
    slug: "cycle-for-change",
    title: "Cycle For Change",
    summary:
      "Cycling for healthy living, community awareness and youth engagement.",
    description:
      "Cycle For Change brings young people together through cycling — promoting fitness and discipline while raising awareness on mental health, addiction and crime, and mobilising communities for outreach.",
    image: "/images/cycle-for-change-hero.webp",
    imageAlt: "Cycle For Change riders in the community",
    focus: [
      "Healthy living",
      "Awareness rides",
      "Team building",
      "Community mobilisation",
      "Youth leadership",
      "Evangelism",
    ],
    stat: { value: "100 KM", label: "Challenge ride" },
  },
  {
    slug: "pastors-kids",
    title: "Pastors Kids",
    summary:
      "Supporting, mentoring and empowering pastors' children to grow with confidence, identity and purpose.",
    description:
      "Pastors' children often carry expectations and pressure attached to ministry life. This program creates a safe, encouraging space where they can be seen, heard, mentored and strengthened — emotionally, spiritually and socially.",
    image: "/images/pastors-kids-hero.webp",
    imageAlt: "Pastors Kids fellowship gathering",
    focus: [
      "Emotional support",
      "Identity formation",
      "Spiritual growth",
      "Peer connection",
      "Mentorship",
      "Church family care",
    ],
  },
  {
    slug: "youth-camps",
    title: "Youth Camps",
    summary:
      "Faith-filled camps where young people grow, heal, discover purpose and build lasting friendships.",
    description:
      "Youth Camps take young people away from daily pressures into a focused environment of teaching, worship, mentorship, team building and friendship. Day and night sessions create room for reflection, prayer and real growth.",
    image: "/images/youth-camps/youth-camps-hero.webp",
    imageAlt: "Youth Camp participants gathered together",
    focus: [
      "Discipleship",
      "Team building",
      "Purpose discovery",
      "Mentorship",
      "Worship",
      "Leadership formation",
    ],
    stat: { value: "50+", label: "Young people per camp" },
  },
];

export const programBySlug = (slug: string) =>
  programs.find((program) => program.slug === slug);

/* =========================================================
   EVENTS
   Add entries here — the calendar groups them by year/month/week.
========================================================= */

export type EventItem = {
  id: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  category: "Program" | "Camp" | "Outreach" | "Meeting" | "Community";
  description: string;
  link?: string;
  recurring?: "weekly" | "monthly";
};

export const events: EventItem[] = [
  {
    id: "monthly-leadership-meeting",
    title: "Monthly Leadership Meeting",
    date: "2026-01-10",
    time: "09:00 – 12:00",
    location: "Zambia Office",
    category: "Meeting",
    description:
      "Team leaders and volunteers review program progress, plan outreach and pray together.",
    recurring: "monthly",
  },
  {
    id: "weekly-youth-fellowship",
    title: "Weekly Youth Fellowship",
    date: "2026-02-07",
    time: "15:00 – 17:00",
    location: "Community Centre",
    category: "Program",
    description:
      "A weekly gathering for teaching, worship, mentorship and friendship.",
    recurring: "weekly",
  },
  {
    id: "school-ministry-term-1",
    title: "School Ministry — Term 1 Visits",
    date: "2026-02-16",
    endDate: "2026-03-27",
    location: "Partner schools",
    category: "Outreach",
    description:
      "Our team visits partner schools with assemblies, mentorship sessions and life-skills teaching.",
  },
  {
    id: "pad-a-girl-outreach-march",
    title: "Pad A Girl School Outreach",
    date: "2026-03-14",
    time: "08:00 – 13:00",
    location: "Partner schools",
    category: "Outreach",
    description:
      "Dignity kits, mentorship and life-skills sessions for girls in partner schools.",
    link: "/programs/pad-a-girl",
  },
  {
    id: "boys-2-men-conference",
    title: "Boys 2 Men Conference",
    date: "2026-04-18",
    time: "08:30 – 16:00",
    location: "Main venue",
    category: "Program",
    description:
      "Speakers, mentors and young men gather for teaching, discipleship and mentorship.",
    link: "/programs/boys-to-men",
  },
  {
    id: "cycle-for-change-awareness-ride",
    title: "Cycle For Change Awareness Ride",
    date: "2026-05-23",
    time: "07:00",
    location: "City route",
    category: "Community",
    description:
      "A community ride raising awareness on mental health, addiction and crime.",
    link: "/programs/cycle-for-change",
  },
  {
    id: "youth-camp-2026",
    title: "Youth Camp 2026",
    date: "2026-08-18",
    endDate: "2026-08-23",
    location: "Camp site",
    category: "Camp",
    description:
      "Six days of teaching, worship, team building, mentorship and fellowship.",
    link: "/programs/youth-camps",
  },
  {
    id: "cycle-for-change-festival",
    title: "Cycle For Change Festival",
    date: "2026-08-22",
    time: "09:00",
    location: "City route",
    category: "Community",
    description:
      "City-wide ride and festival for awareness, healthy living and youth engagement.",
    link: "/programs/cycle-for-change",
  },
  {
    id: "vision-tour",
    title: "Vision Tour & Leadership Visit",
    date: "2026-08-25",
    endDate: "2026-08-31",
    location: "Zambia",
    category: "Meeting",
    description:
      "Leadership visit connecting our international team with local leaders and young people.",
  },
  {
    id: "school-ministry-term-2",
    title: "School Ministry — Term 2 Visits",
    date: "2026-09-07",
    endDate: "2026-10-16",
    location: "Partner schools",
    category: "Outreach",
    description:
      "Term two of school assemblies, mentorship and life-skills sessions.",
    link: "/programs/school-ministry",
  },
  {
    id: "pastors-kids-retreat",
    title: "Pastors Kids Retreat",
    date: "2026-10-24",
    time: "09:00 – 15:00",
    location: "Community Centre",
    category: "Program",
    description:
      "A day of encouragement, mentorship and peer connection for pastors' children.",
    link: "/programs/pastors-kids",
  },
  {
    id: "year-end-thanksgiving",
    title: "Year-End Thanksgiving",
    date: "2026-12-12",
    time: "10:00",
    location: "Main venue",
    category: "Community",
    description:
      "Celebrating the year together — stories, testimonies and gratitude.",
  },
];

/* =========================================================
   BLOG / NEWS UPDATES
   Manual posts. Newest first is handled automatically.
========================================================= */

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: "News" | "Story" | "Event" | "Devotional";
  excerpt: string;
  body: string[];
  image?: string;
  imageAlt?: string;
  facebookUrl?: string;
};

export const posts: Post[] = [
  {
    slug: "youth-camp-2026-recap",
    title: "Youth Camp 2026: six days that changed the conversation",
    date: "2026-08-24",
    category: "Event",
    excerpt:
      "More than 50 young people gathered for six days of teaching, worship, mentorship and friendship — with day and night sessions that gave room for real questions.",
    body: [
      "From 18 to 23 August, more than 50 young people gathered for Youth Camp 2026. The programme ran day and night, creating space for teaching, worship, prayer, mentorship and practical life development.",
      "Young people learned together, prayed together and built friendships that carried beyond the camp. Campers were free to ask questions, participate and grow spiritually and socially in an environment built for them.",
      "Camp leadership was not only about speaking from the front. Leaders sat around tables with the young people, listened to them and helped them think seriously about faith, focus, discipline and purpose.",
      "We are grateful to every leader, volunteer and partner who made the week possible — and to the international friends who travelled to be part of it.",
    ],
    image: "/images/youth-camps/youth-camps-hero.webp",
    imageAlt: "Youth Camp 2026 participants",
  },
  {
    slug: "cycle-for-change-crusade",
    title: "When bicycles became messengers",
    date: "2026-08-22",
    category: "Story",
    excerpt:
      "Cycle For Change was dedicated to community mobilisation for the Come Go With Us Crusade — young cyclists rode through surrounding communities with flyers and invitations.",
    body: [
      "Impact Generation Global participated in the 2026 Come Go With Us Crusade and played an important role in community mobilisation.",
      "Cycle For Change was intentionally dedicated to spreading the invitation. Young cyclists were given flyers and rode through surrounding communities inviting people to attend.",
      "What normally serves as a programme for healthy living, discipline and youth engagement became a practical evangelistic tool. Every bicycle carried more than a rider — it carried an invitation.",
    ],
    image: "/images/events/cycle-for-change-city-ride.webp",
    imageAlt: "Young cyclists on a Cycle For Change awareness ride",
  },
  {
    slug: "school-ministry-term-update",
    title: "Reaching young people where they are",
    date: "2026-07-15",
    category: "News",
    excerpt:
      "Our school ministry continued beyond camps and crusades — into classrooms, assemblies and everyday conversations.",
    body: [
      "The work of Impact Generation Global continues beyond camps and crusades into schools and local communities.",
      "Through school ministry, young people receive mentorship, discipleship, encouragement and practical guidance on discipline, drug abuse prevention, healthy living, purpose and positive life choices.",
      "Schools provide an important opportunity to reach young people in an environment where they spend much of their everyday lives. Community outreach then allows our teams to connect with young people and families outside organised programmes.",
    ],
    image: "/images/school-ministry/school-ministry-hero.webp",
    imageAlt: "School ministry session with students",
  },
  {
    slug: "pad-a-girl-dignity",
    title: "Dignity is not a small thing",
    date: "2026-06-10",
    category: "Story",
    excerpt:
      "Pad A Girl continued to reach girls with hygiene support, mentorship and encouragement — small practical acts with a large, lasting effect.",
    body: [
      "For many girls, missing school every month is not a choice — it is a consequence of not having what they need.",
      "Pad A Girl responds with dignity kits, mentorship and life-skills education, creating space for girls to ask questions, grow in confidence and stay focused on their future.",
      "We are grateful to the volunteers, teachers and partners who make each outreach possible.",
    ],
    image: "/images/pad-a-girl/pad-a-girl-hero.webp",
    imageAlt: "Pad A Girl outreach with girls at a school",
  },
];

/* =========================================================
   NEWSLETTERS
   Each issue has a web page and a downloadable PDF.
========================================================= */

export type NewsletterIssue = {
  slug: string;
  title: string;
  month: string;
  year: number;
  cover: string;
  summary: string;
  highlights: string[];
  /** Printable version of the issue — used for "Download PDF". */
  printUrl: string;
};

export const newsletters: NewsletterIssue[] = [
  {
    slug: "august-2026",
    title: "August 2026 Newsletter",
    month: "August",
    year: 2026,
    cover: "/images/newsletter/august-2026/youth-camp-group.jpg",
    summary:
      "Youth Camp 2026, the vision tour to Zambia, international fellowship, Cycle for Change and the Come Go With Us Crusade.",
    highlights: [
      "Youth Camp 2026 — six days of faith, friendship and purpose",
      "Vision tour: Dave and Joe visit Zambia",
      "Cycle for Change becomes a tool for evangelism",
      "Baptism and new beginnings at the crusade",
    ],
    printUrl: "/newsletter/august-2026?print=1",
  },
];
