"use client"

import styles from "@/components/home.module.css"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Home() {
    const [symptoms, setSymptoms] = useState<string>()
    const [placeholder, setPlaceholder] = useState<string>("¿Qué síntomas tienes?")
    const [hash, setHash] = useState<string>("#buscar")

    const textRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const leafRef = useRef<HTMLImageElement>(null);
    const hill1Ref = useRef<HTMLImageElement>(null);
    const hill4Ref = useRef<HTMLImageElement>(null);
    const hill5Ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const text = textRef.current;
        const form = formRef.current;
        const leaf = leafRef.current;
        const hill1 = hill1Ref.current;
        const hill4 = hill4Ref.current;
        const hill5 = hill5Ref.current;

        if (text && form && leaf && hill1 && hill4 && hill5) {
          window.addEventListener("scroll", () => {
            const value = window.scrollY;

            if (value <= window.outerHeight * 0.6) {
                text.style.marginTop = value * -1 + "px";
                form.style.marginTop = value * 2.5+ "px";
                leaf.style.top = value * -1.5 + "px";
                leaf.style.left = value * 1.5 + "px";
                hill5.style.left = value * 1.5 + "px";
                hill4.style.left = value * -1.5 + "px";
                hill1.style.top = value * 1.5 + "px";
            }
          });
        }
    
        return () => window.removeEventListener("scroll", () => {});
      }, []);

    const imageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    } as React.CSSProperties;

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
    <>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <a href="#buscar" className={styles.active}>Buscar</a>
          <a href="#plantas">Plantas</a>
        </nav>
      </header>

      <section className={styles.parallax} id='buscar'>
        <Image ref={hill1Ref} src="/images/hill1.png" alt="hill1" style={imageStyle} width={500} height={500}></Image>
        <Image src="/images/hill2.png" alt="hill2" style={imageStyle} width={500} height={500}></Image>
        <Image src="/images/hill3.png" alt="hill3" style={imageStyle} width={500} height={500}></Image>
        <Image ref={hill4Ref} src="/images/hill4.png" alt="hill4" style={imageStyle} width={500} height={500}></Image>
        <Image ref={hill5Ref} src="/images/hill5.png" alt="hill5" style={imageStyle} width={500} height={500}></Image>
        <Image src="/images/tree.png" alt="tree" style={imageStyle} width={500} height={500}></Image>
        <Image ref={leafRef} src="/images/leaf.png" alt="leaf" style={imageStyle} width={500} height={500}></Image>
        <Image src="/images/plant.png" alt="plant" style={imageStyle} width={500} height={500}></Image>
        <h2 ref={textRef} className={styles.text}>Plantas Medicinales</h2>
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
      </section>
    </>
  );
}
