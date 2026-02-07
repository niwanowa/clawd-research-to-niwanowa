import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import CampaignSection from "@/components/CampaignSection";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants, getTopRatedRestaurants } from "@/lib/restaurants";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const restaurantSectionRef = useRef<HTMLDivElement>(null);

  const genres = Array.from(new Set(restaurants.flatMap((r) => r.genre)));
  const topRated = getTopRatedRestaurants(6);

  const filteredRestaurants = selectedGenre
    ? restaurants.filter((r) => r.genre.includes(selectedGenre))
    : topRated;

  const handleExplore = () => {
    restaurantSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Credit Section */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
        <div className="container py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
            <p className="text-sm text-slate-600">
              <span className="font-medium text-slate-700">このページは</span>
              <span className="text-slate-500"> 2026年1月11日に</span>
              <span className="font-medium text-slate-700"> Manus </span>
              <span className="text-slate-500">で作成されました</span>
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection onExplore={handleExplore} />

      {/* Campaign Section */}
      <CampaignSection />

      {/* Restaurant Section */}
      <section ref={restaurantSectionRef} className="py-16 bg-background">
        <div className="container">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              おすすめの飲食店
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mb-4"></div>
            <p className="text-lg text-slate-600">
              諏訪神社周辺の高評価ランチ・カフェ
            </p>
          </div>

          {/* Genre Filter */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <Button
              onClick={() => setSelectedGenre(null)}
              variant={selectedGenre === null ? "default" : "outline"}
              className={`${
                selectedGenre === null
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-red-600 text-red-600 hover:bg-red-50"
              }`}
            >
              すべて
            </Button>
            {genres.map((genre) => (
              <Button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                variant={selectedGenre === genre ? "default" : "outline"}
                className={`${
                  selectedGenre === genre
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "border-red-600 text-red-600 hover:bg-red-50"
                }`}
              >
                {genre}
              </Button>
            ))}
          </div>

          {/* Restaurant Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="animate-in fade-in duration-500"
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shrine Info Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              札幌諏訪神社について
            </h2>

            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-red-600">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">所在地</h3>
                    <p className="text-slate-600">
                      札幌市北区北2条西2丁目
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">電話番号</h3>
                    <p className="text-slate-600">
                      011-641-1409
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">参拝時間</h3>
                    <p className="text-slate-600">
                      24時間（社務所は9:00～17:00）
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    札幌諏訪神社は、北海道札幌市北区に鎮座する神社で、地元の人々から「お諏訪さん」と親しまれています。参拝帰りに周辺の高評価飲食店に立ち寄り、美味しいランチやカフェを楽しむのがおすすめです。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">札幌諏訪神社周辺 グルメガイド</h3>
              <p className="text-slate-400 text-sm">
                参拝帰りに立ち寄りたい高評価のランチ・カフェをまとめたガイドです。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">情報</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    プライバシーポリシー
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    利用規約
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">最終更新</h4>
              <p className="text-slate-400 text-sm">
                2026年1月11日
              </p>
              <p className="text-slate-500 text-xs mt-4">
                ※本サイトの情報は参考です。最新情報は各店舗にご確認ください。
              </p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2026 札幌諏訪神社周辺 グルメガイド. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
