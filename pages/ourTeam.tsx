import AppHead from "../components/AppHead";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OurTeam() {
  return (
    <>
      <AppHead />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold">Our Team</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}