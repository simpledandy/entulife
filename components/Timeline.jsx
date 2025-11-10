"use client";
import { motion } from "framer-motion";

export default function Timeline({ age, leftPercent }) {
  return (
    <div style={{ width: "85%", maxWidth: 1200, marginTop: 56, position: "relative" }}>
      <div style={{ position: "relative", height: 24 }}>
        {/* Base Line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 6,
            transform: "translateY(-50%)",
            borderRadius: 6,
            background: "linear-gradient(90deg, rgba(125,211,252,0.12), rgba(179,146,255,0.08))",
            boxShadow: "0 6px 30px rgba(10,12,20,0.6) inset",
          }}
        />

        {/* Ticks every 10 years */}
        {[...Array(11)].map((_, i) => {
          const left = `${i * 10}%`;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left,
                top: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: 2,
                  height: 12,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: "rgba(233,236,248,0.35)",
                }}
              >
                {i * 10}
              </div>
            </div>
          );
        })}

        {/* Animated Orb + Label */}
        {age !== null && (
          <>
            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                translateY: "-50%",
                left: leftPercent,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(107,230,225,1) 0%, rgba(59,130,246,0.9) 60%)",
                boxShadow:
                  "0 8px 28px rgba(107,230,225,0.18), 0 0 8px rgba(59,130,246,0.12)",
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                top: "10%",
                translateY: "-50%",
                left: leftPercent,
                transform: "translateX(-50%)",
                pointerEvents: "none",
                fontSize: 13,
                padding: "6px 10px",
                borderRadius: 999,
                background: "rgba(10,14,20,0.6)",
                color: "#7be6e6",
                border: "1px solid rgba(107,230,225,0.12)",
                whiteSpace: "nowrap",
              }}
            >
              You are here
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}