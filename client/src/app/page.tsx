import SymtomsForm from "@/components/form";
import Header from "@/components/header";
import Home from "@/components/home";
import ListOfPlants from "@/components/list";
import Plants from "@/components/plants";
import { Suspense } from "react";

export default async function HomePage({
  searchParams
}: {searchParams?:{
  sintomas?: string
}}) {
  const sintomas = searchParams?.sintomas || '';

  return (
    <main>
      <Header/>
      <Home>
        <Suspense>
          <SymtomsForm/>
        </Suspense>
      </Home>
      <Plants text={sintomas ? "Plantas recomendada" : "Todas las plantas"}>
        <ListOfPlants symptoms={sintomas}/>
      </Plants>
    </main>
  );
}
