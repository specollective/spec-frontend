import ProjectsAccordion from './ProjectsAccordian';
import raExperience from '../public/TrainingImg.svg';
import digitalGallerySnap from '../public/ProjectsImg.svg';
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
			linkLine: 'View Project Details >>',
			link: '/joERSnap',
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
			linkLine: 'View Project Details >>',
			link: '/digital-gallery-snap',
		},
		{
			id: 3,
			name: 'Digital Expressions Gallery',
			tag: 'Digital Expressions of Mass Incarceration Online Gallery',
			info: 'Incarceration can be a particularly traumatizing experience for LGBTQ+ individuals. Studies of prison art programs suggest that artistic activities have several benefits for prisoner rehabilitation and institutional management. This gallery of work by LGBTQ+ incarcerated artists was produced during the CAREP/SPEC partnership in collaboration with advocacy group ABO Comix.',
			pic: {
				alt: 'digital-gallery-image',
				url: digitalGallerySnap,
			},
			linkLine: 'Visit the Gallery >>',
			link: 'https://medium.com/journal-of-engaged-research/expressions/home',
		},



	];

	return (
		<div className="bg-spec-black-600 font-Poppins p-10 md:p-20 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 md:m-auto">
			<h2 className="text-6xl md:text-10xl font-bold mb-10 text-center">Projects</h2>
			<ProjectsAccordion projectsData={projectsData} />
		</div>
	);
}

export default ProjectsSection;