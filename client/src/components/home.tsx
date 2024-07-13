"use client"

import styles from "@/components/style.module.css"
import Image from 'next/image'
import { useEffect, useRef } from "react";

export default function Home({children}: {children?: React.ReactNode}) {
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

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <a href="#search" className={styles.active}>Buscar</a>
          <a href="#sec">Plantas</a>
        </nav>
      </header>

      <section className={styles.parallax} id='search'>
        <Image ref={hill1Ref} src="/images/hill1.png" alt="hill1" style={imageStyle} width={500} height={500}></Image>
        <Image src="/images/hill2.png" alt="hill2" style={imageStyle} width={500} height={500}></Image>
        <Image src="/images/hill3.png" alt="hill3" style={imageStyle} width={500} height={500}></Image>
        <Image ref={hill4Ref} src="/images/hill4.png" alt="hill4" style={imageStyle} width={500} height={500}></Image>
        <Image ref={hill5Ref} src="/images/hill5.png" alt="hill5" style={imageStyle} width={500} height={500}></Image>
        <Image src="/images/tree.png" alt="tree" style={imageStyle} width={500} height={500}></Image>
        <h2 ref={textRef} className={styles.text}>Plantas Medicinales</h2>
        <Image ref={leafRef} src="/images/leaf.png" alt="leaf" style={imageStyle} width={500} height={500}></Image>
        <Image src="/images/plant.png" alt="plant" style={imageStyle} width={500} height={500}></Image>
        <form ref={formRef} className={styles.form}>
            <input/>
            <button type="button">gasd</button>
        </form>
      </section>
    </>
  );
}
