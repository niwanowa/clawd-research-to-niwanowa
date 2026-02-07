import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onExplore?: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-shrine.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Torii gate motif */}
        <div className="mb-8 flex justify-center">
          <svg
            className="w-16 h-16 text-red-600"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Simple torii gate silhouette */}
            <rect x="20" y="40" width="60" height="8" />
            <line x1="30" y1="48" x2="30" y2="80" />
            <line x1="70" y1="48" x2="70" y2="80" />
            <rect x="25" y="75" width="50" height="4" />
          </svg>
        </div>

        {/* Main title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          札幌諏訪神社周辺
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-red-300 mb-6 drop-shadow-lg">
          グルメ&キャンペーンガイド
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md">
          参拝帰りに立ち寄りたい高評価のランチ・カフェ
        </p>

        {/* CTA Button */}
        <Button
          onClick={onExplore}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 drop-shadow-lg"
        >
          おすすめ店舗を見る
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
    </section>
  );
}
