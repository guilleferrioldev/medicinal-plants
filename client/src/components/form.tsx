"use client"

import styles from "@/components/home.module.css"
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SymtomsForm () {
    const formRef = useRef<HTMLFormElement>(null);
    const [symptoms, setSymptoms] = useState<string>()
    const [placeholder, setPlaceholder] = useState<string>("¿Qué síntomas tienes?")

    useEffect(() => {
        const form = formRef.current;

        if (form) {
          window.addEventListener("scroll", () => {
            const value = window.scrollY;

            if (value <= window.outerHeight * 0.6) {
                form.style.marginTop = value * 2.5+ "px";
            }
          });
        }
    
        return () => window.removeEventListener("scroll", () => {});
    }, []);

    const handleInputChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSymptoms(event.target.value)
        if (event.target.value === "") {
          setPlaceholder("¿Qué síntomas tienes?")
        }
    }, 200)
  
    useEffect(() => {
        const url = new URL(window.location.href);
        if (symptoms) {
          url.searchParams.set('sintomas', symptoms);
        } else {
          url.searchParams.delete('sintomas');
        }
        window.history.replaceState(null, '', url);
    }, [symptoms])
  
    const plantsAction = () => {
        if (!symptoms) {
          setPlaceholder("Debe insertar los síntomas")
          return
        }
        const seccion = document.getElementById('plantas');
        seccion?.scrollIntoView({ behavior: 'smooth' }); 
      }

    return (
        <form ref={formRef} className={styles.form} action={plantsAction}>
            <input name="symptoms" 
                   onChange={handleInputChange}
                   defaultValue={symptoms}
                   placeholder={placeholder}/>
            <button type="submit">
              <svg width="35px" height="35px" viewBox="0 0 24 24">
                  <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
        </form>
    )
}