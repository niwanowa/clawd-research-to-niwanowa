import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/lib/restaurants";
import { MapPin, Phone, Clock, Star } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-red-600 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
        {restaurant.image ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <span className="text-slate-400 text-sm">画像準備中</span>
          </div>
        )}
        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-semibold text-sm">{restaurant.rating}</span>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-slate-900">{restaurant.name}</CardTitle>
        <CardDescription className="flex flex-wrap gap-2 mt-2">
          {restaurant.genre.map((g) => (
            <span
              key={g}
              className="inline-block bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium"
            >
              {g}
            </span>
          ))}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2">{restaurant.description}</p>

        {/* Price range */}
        <div className="text-sm text-slate-700">
          {restaurant.priceRange.lunch && (
            <div>
              <span className="font-semibold">ランチ:</span> {restaurant.priceRange.lunch}
            </div>
          )}
          {restaurant.priceRange.dinner && (
            <div>
              <span className="font-semibold">ディナー:</span> {restaurant.priceRange.dinner}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2 text-sm text-slate-600 border-t pt-3">
          {restaurant.hours && (
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
              <span>{restaurant.hours}</span>
            </div>
          )}
          {restaurant.closedDays && (
            <div className="text-sm text-slate-600">
              <span className="font-semibold">定休日:</span> {restaurant.closedDays}
            </div>
          )}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
            <span className="text-xs">{restaurant.distance}</span>
          </div>
        </div>

        {/* Features */}
        {restaurant.features.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {restaurant.features.slice(0, 2).map((feature) => (
              <span
                key={feature}
                className="inline-block bg-red-50 text-red-700 px-2 py-1 rounded text-xs"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Button */}
        <Button
          variant="outline"
          className="w-full mt-4 border-red-600 text-red-600 hover:bg-red-50"
        >
          詳細を見る
        </Button>
      </CardContent>
    </Card>
  );
}
