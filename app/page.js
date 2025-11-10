"use client";
import { useState, useEffect } from "react";
import { useSpring, useTransform } from "framer-motion";
import Header from "../components/Header";
import AgeInput from "../components/AgeInput";
import Timeline from "../components/Timeline";

export default function Home() {
  const [ageInput, setAgeInput] = useState("");
  const [age, setAge] = useState(null);

  const spring = useSpring(age ?? 0, { stiffness: 70, damping: 20 });
  const leftPercent = useTransform(spring, (v) => `${v}%`);

  const hue = age !== null ? Math.round(200 - age * 1.4) : 220;
  const bgGradient = `linear-gradient(180deg,
    hsl(${hue}, 60%, 10%) 0%,
    hsl(${(hue + 60) % 360}, 60%, 6%) 100%)`;

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "") return setAgeInput(""), setAge(null);
    if (!/^\d{0,3}$/.test(val)) return;
    const num = Number(val);
    if (num >= 0 && num <= 100) {
      setAgeInput(val);
      setAge(num);
    }
  };

  useEffect(() => {
    if (age !== null) spring.set(age);
  }, [age, spring]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#e9ecf8",
        background: bgGradient,
        transition: "background 0.8s ease",
        padding: "48px",
      }}
    >
      <Header />
      <AgeInput value={ageInput} onChange={handleChange} />
      <Timeline age={age} leftPercent={leftPercent} />
    </main>
  );
}
