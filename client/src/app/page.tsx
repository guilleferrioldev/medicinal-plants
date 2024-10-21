import { Header, Home, ListOfPlants, Plants, SymtomsForm } from "@/components";
import { Suspense } from "react";

export default async function HomePage({
  searchParams
}: {searchParams?:{
  sintomas?: string
}}) {
  const sintomas = searchParams?.sintomas ?? '';

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
