import styles from "@/styles/intercept.module.css"

import { capitalizeAndSeparate } from ".";

const ShowKeys = {
    nombre_cientifico: "Nombre científico",
    familia: "Familia",
    descripcion	: "Descripción",
    Propiedades: "Propiedades",
    propiedades: "Propiedades",
    advertencias: "Advertencias",
    posologia: "Posología",
    enfermedades: "Enfermedades"
  }
  

export const showObject = (
    item: Record<string, any>,
    scope = 0
  ): React.ReactElement => {
    const sections: React.ReactElement[] = [];
  
    Object.entries(item).forEach(([key, value]) => {
      let scopedKey: string
      if (key in ShowKeys) {
        scopedKey = ShowKeys[key as keyof typeof ShowKeys]; 
      } else {
        scopedKey = capitalizeAndSeparate(key);
      }
  
      if (scope === 1) {
        scopedKey = `- ${scopedKey}`;
      } else if (scope === 2) {
        scopedKey = `· ${scopedKey}`;
      } 
      
      if (key === "nombre") {
        sections.push(
          <div key={scopedKey}>
            <h1>{value}</h1>
          </div>
        );
      } else if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          sections.push(
            <div key={scopedKey}>
              <b>{scopedKey}</b>
              <ul>
                {value.map((item, index) => (
                  <li key={index}>{item}{index < value.length - 1 ? ", " : "."}</li>
                ))}
              </ul>
            </div>
          );
        } else {
          sections.push(
            <div key={scopedKey}>
              <h2>{scopedKey}</h2>
              {showObject(value, scope + 1)}
            </div>
          );
        }
      } else {
        sections.push(
          <div key={scopedKey}>
            <h2>{scopedKey}</h2>
            <p>{value}</p>
          </div>
        );
      }
    });
  
    return <div className={styles.details}>{sections}</div>;
  };
  