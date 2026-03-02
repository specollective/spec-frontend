import ServicesAccordion from './ServicesAccordian';
import whatWeDoData from '../constants/what-we-do-data';
import HomeSection from './HomeSection';
import { Eyebrow } from './Typography/Eyebrow';

function OurServicesSection() {
  return (
    <HomeSection>
      <div className="w-full">
        <Eyebrow>
          OUR SERVICES
        </Eyebrow>
        <ServicesAccordion services={whatWeDoData} />
      </div>
    </HomeSection>
  );
}

export default OurServicesSection;