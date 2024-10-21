import { Header, Home, ListOfPlants, MotionDiv, Plants, SymtomsForm } from "@/components";
import { Suspense } from "react";

export default async function HomePage({
  searchParams
}: {searchParams?:{
  sintomas?: string
}}) {
  const sintomas = searchParams?.sintomas ?? '';

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.50 }}>
      <Header/>
      <Home>
        <Suspense>
          <SymtomsForm/>
        </Suspense>
      </Home>
      <Plants text={sintomas ? "Plantas recomendada" : "Todas las plantas"}>
        <ListOfPlants symptoms={sintomas}/>
      </Plants>
    </MotionDiv>
  );
}
