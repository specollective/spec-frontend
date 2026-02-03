import AppHead from "../../components/AppHead";
import Navbar from "../../components/Navbar";
import { JoerFormHeader } from "../../components/JoerFormHeader/JoerFormHeader";

export default function JoerSubmissionsPage() {
  return (
    <>
      <AppHead />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <JoerFormHeader />
      </main>
    </>
  );
}
