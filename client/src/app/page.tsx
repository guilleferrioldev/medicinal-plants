import SymtomsForm from "@/components/form";
import Header from "@/components/header";
import Home from "@/components/home";
import Plants from "@/components/plants";

export default function HomePage() {
  return (
    <main>
      <Header/>
      <Home>
        <SymtomsForm/>
      </Home>
      <Plants>
      </Plants>
    </main>
  );
}
