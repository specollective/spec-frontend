import ServicesAccordion from './ServicesAccordian';
import whatWeDoData from '../constants/what-we-do-data';
import HomeSection from './HomeSection';
import { Heading4 } from './Typography/Heading';

function OurServicesSection() {
  return (
    <HomeSection>
      <div className="w-full">
        <Heading4>
          OUR SERVICES
        </Heading4>
        <ServicesAccordion services={whatWeDoData} />
      </div>
    </HomeSection>
  );
}

export default OurServicesSection;