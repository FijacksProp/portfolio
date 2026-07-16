import { ImageResponse } from "next/og";

export const alt = "Joshua Olugbemi — Full-stack software engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F1EA",
          color: "#101820",
          padding: "58px 66px",
          fontFamily: "sans-serif",
          borderTop: "18px solid #147DF5",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <span>Joshua Olugbemi</span>
          <span>Full-stack software engineer / Nigeria</span>
        </div>
        <div style={{ display: "flex", maxWidth: 1060, fontSize: 76, lineHeight: 0.98, letterSpacing: "-0.045em", fontWeight: 600 }}>
          I design and ship complete software products across interface, logic, data, and delivery.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 22, borderTop: "2px solid #101820", fontSize: 18, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          <span>Interface → Service → Data → Delivery</span>
          <span>FP / 2026</span>
        </div>
      </div>
    ),
    size,
  );
}
