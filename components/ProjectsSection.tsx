import ProjectsAccordion from './ProjectsAccordian';
import raExperience from '../public/RA.svg';
import digitalGallerySnap from '../public/GalleryImage.svg';
import joERSnap from '../public/JoER 1.png';

function ProjectsSection() {
	const projectsData = [
		{
			id: 1,
			name: 'Journal of Engaged Research',
			tag: '',
			info: 'The diversity of the publishing sector does not reflect that of the US population. The Journal of Engaged Research (JoER) elevates the perspectives of emerging scholars, students, artists and activists from historically marginalized groups. During the CAREP/SPEC partnership, collaborators from the Pardee RAND Graduate School, Wabash College and a CAREP Public Discourse Fellow worked with the co editors of JoER to publish articles.',
			pic: {
				alt: 'journal-of-engaged-research-image',
				url: joERSnap,
			},
			linkLine: 'Visit the Journal >>',
			link: '',
		},
		{
			id: 2,
			name: 'Digital Art Galleries',
			tag: ' ',
			info: "Incarceration can be a particularly traumatizing experience for LGBTQ+ individuals. Studies of prison art programs suggest that artistic activities have several benefits for prisoner rehabilitation and institutional management. This gallery of work by LGBTQ+ incarcerated artists was produced during the CAREP/SPEC partnership in collaboration with advocacy group ABO Comix. ",
			pic: {
				alt: 'digital-art-galleries-image',
				url: digitalGallerySnap,
			},
			linkLine: 'Visit the Gallery >>',
			link: '',
		},
		{
			id: 3,
			name: 'The RA Experience',
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

	return (
		<div className="bg-spec-black-600 font-Poppins p-10 md:p-20 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 md:m-auto">
			
			<ProjectsAccordion projectsData={projectsData} />
		</div>
	);
}

export default ProjectsSection;