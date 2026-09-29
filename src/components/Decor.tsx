import { Cloud, Flower, Heart, Sparkle, Star } from "./Doodles";

const FLOATS = [
  { kind: "cloud", className: "float-cloud one", delay: "0s" },
  { kind: "cloud", className: "float-cloud two", delay: "1.4s" },
  { kind: "cloud", className: "float-cloud three", delay: "2.2s" },
  { kind: "star", className: "float-star one", delay: "0.3s" },
  { kind: "star", className: "float-star two", delay: "1.8s" },
  { kind: "heart", className: "float-heart one", delay: "0.8s" },
  { kind: "heart", className: "float-heart two", delay: "2.6s" },
  { kind: "flower", className: "float-flower one", delay: "0.5s" },
  { kind: "flower", className: "float-flower two", delay: "2s" },
  { kind: "sparkle", className: "float-sparkle one", delay: "0.2s" },
  { kind: "sparkle", className: "float-sparkle two", delay: "1.1s" },
  { kind: "sparkle", className: "float-sparkle three", delay: "2.4s" },
] as const;

export function FloatingDecor() {
  return (
    <div className="decor-layer" aria-hidden="true">
      <div className="paper-blob blob-a" />
      <div className="paper-blob blob-b" />
      <div className="paper-blob blob-c" />
      <div className="paper-blob blob-d" />
      {FLOATS.map((item) => (
        <span key={item.className} className={`float-item ${item.className}`} style={{ animationDelay: item.delay }}>
          {item.kind === "cloud" && <Cloud />}
          {item.kind === "star" && <Star />}
          {item.kind === "heart" && <Heart />}
          {item.kind === "flower" && <Flower />}
          {item.kind === "sparkle" && <Sparkle />}
        </span>
      ))}
    </div>
  );
}
