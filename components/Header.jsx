export default function Header() {
  return (
    <>
      <h1
        style={{
          fontSize: "4rem",
          margin: 0,
          fontWeight: 800,
          background: "linear-gradient(90deg,#7dd3fc,#b392ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        EntuLife
      </h1>
      <h2 style={{ marginTop: 10, color: "rgba(233,236,248,0.6)" }}>
        Discover where you are in your journey
      </h2>
    </>
  );
}