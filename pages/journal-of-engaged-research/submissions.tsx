import AppHead from "../../components/AppHead";
import Navbar from "../../components/Navbar";
import { JoerFormHeader } from "../../components/JoerFormHeader/JoerFormHeader";

export default function JoerSubmissionsPage() {
  return (
    <>
      <AppHead />
      <Navbar />
      <main>
        <JoerFormHeader />
      </main>
    </>
  );
}
