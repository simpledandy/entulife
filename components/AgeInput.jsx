export default function AgeInput({ value, onChange }) {
  return (
    <div style={{ marginTop: 28 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          color: "rgba(233,236,248,0.6)",
          marginBottom: 8,
        }}
      >
        How old are you?
      </label>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={onChange}
        placeholder=""
        style={{
          textAlign: "center",
          fontSize: "1.4rem",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          padding: "10px 18px",
          color: "inherit",
          width: 140,
          outline: "none",
        }}
      />
    </div>
  );
}
