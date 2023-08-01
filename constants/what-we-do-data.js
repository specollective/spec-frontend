import raExperience from '../../public/RA.svg';
import digitalGallerySnap from '../../public/GalleryImage.svg';
import joERSnap from '../../public/JoER 1.png';
import Link from 'next/link';

const JoERData1 = <Link
className="underline text-spec-turquiose hover:text-spec-turquiose"
href="https://www.pardeerand.edu/">Pardee RAND Graduate School</Link>
const JoERData2 = <Link className="underline text-spec-turquiose hover:text-spec-turquiose" href="https://www.pardeerand.edu/">Wabash College</Link>
const JoERData3 = <Link className="underline text-spec-turquiose hover:text-spec-turquiose" href="https://www.pardeerand.edu/">a CAREP Public Discourse Fellow</Link>
const ArtGalleryData1 = <Link className="underline text-spec-turquiose hover:text-spec-turquiose" href="https://www.abocomix.com/">Studies of prison art programs</Link>
const ArtGalleryData2 = <Link className="underline text-spec-turquiose hover:text-spec-turquiose" href="https://www.abocomix.com/">ABO Comix</Link>

const whatWeDoData = [
  {
    id: 1,
    name: 'Engaged Research',
    tag: '',
    info: <>The diversity of the publishing sector does not reflect that of the US population. The Journal of Engaged Research (JoER) elevates the perspectives of emerging scholars, students, artists and activists from historically marginalized groups. During the CAREP/SPEC partnership, collaborators from the  {JoERData1}, {JoERData2} and {JoERData3} worked with the co editors of JoER to publish articles.</>,
    pic: {
      alt: 'journal-of-engaged-research-image',
      url: joERSnap,
    },
    linkLine: 'Visit the Journal >>',
    link: 'https://medium.com/journal-of-engaged-research',
  },
  {
    id: 2,
    name: 'Collaborative Mentorship',
    tag: ' ',
    info: <>Incarceration can be a particularly traumatizing experience for LGBTQ+ individuals.{ArtGalleryData1} suggest that artistic activities have several benefits for prisoner rehabilitation and institutional management. This gallery of work by LGBTQ+ incarcerated artists was produced during the CAREP/SPEC partnership in collaboration with advocacy group {ArtGalleryData2}.</>,
    pic: {
      alt: 'digital-art-galleries-image',
      url: digitalGallerySnap,
    },
    linkLine: 'Visit the Gallery >>',
    link: 'https://medium.com/journal-of-engaged-research/expressions/home',
  },
  {
    id: 3,
    name: 'Applied Learning',
    tag: '',
    info: `SPEC's RAs make valuable contributions to real-world projects while advancing their careers. There are many opportunities available to RAs, such as: contributing to open-source software and hardware projects, conducting research and data analysis to support SPEC initiatives, writing journal articles, and assisting with fundraising through marketing strategies, social media content creation, and grant proposal writing.`,
    pic: {
      alt: 'ra-experience-image',
      url: raExperience,
    },
    linkLine: '',
    link: '',
  },
  {
    id: 3,
    name: 'Capacity Building',
    tag: '',
    info: `SPEC's RAs make valuable contributions to real-world projects while advancing their careers. There are many opportunities available to RAs, such as: contributing to open-source software and hardware projects, conducting research and data analysis to support SPEC initiatives, writing journal articles, and assisting with fundraising through marketing strategies, social media content creation, and grant proposal writing.`,
    pic: {
      alt: 'ra-experience-image',
      url: raExperience,
    },
    linkLine: '',
    link: '',
  },
  {
    id: 4,
    name: 'Career Development',
    tag: '',
    info: `SPEC's RAs make valuable contributions to real-world projects while advancing their careers. There are many opportunities available to RAs, such as: contributing to open-source software and hardware projects, conducting research and data analysis to support SPEC initiatives, writing journal articles, and assisting with fundraising through marketing strategies, social media content creation, and grant proposal writing.`,
    pic: {
      alt: 'ra-experience-image',
      url: raExperience,
    },
    linkLine: '',
    link: '',
  },
];

export default whatWeDoData;