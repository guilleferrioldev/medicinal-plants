"use client"

import styles from "@/components/home.module.css"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SymtomsForm () {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
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
        const input = event.target.value.trim()
        const params = new URLSearchParams(searchParams)

        if (input) {
          params.set('sintomas', input)
        } else {
          setPlaceholder("¿Qué síntomas tienes?")
          params.delete('sintomas')   
        }
        
        replace(`${pathname}?${params.toString()}`)
    }, 200)
  
    const plantsAction = () => {
        if (!searchParams.get("sintomas")) {
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
                   defaultValue={searchParams.get("sintomas") ?? ""}
                   placeholder={placeholder}/>
            <button type="submit">
              <svg width="35px" height="35px" viewBox="0 0 24 24">
                  <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
        </form>
    )
}