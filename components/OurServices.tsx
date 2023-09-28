import ServicesAccordion from './ServicesAccordian';
import whatWeDoData from '../constants/what-we-do-data';
import HomeSection from './HomeSection';

function OurServicesSection() {
  return (
    <HomeSection>
      <ServicesAccordion projectsData={whatWeDoData} />
    </HomeSection>
  );
}

export default OurServicesSection;