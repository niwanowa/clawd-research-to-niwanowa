import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { campaigns } from "@/lib/campaigns";
import { Calendar, MapPin } from "lucide-react";

export default function CampaignSection() {
  const activeCampaigns = campaigns.filter((c) => c.isActive);

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            1月11日のキャンペーン情報
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">
            本日開催されている特別なキャンペーンと行事をご紹介します
          </p>
        </div>

        {/* Campaigns grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {activeCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200"
            >
              {/* Image */}
              {campaign.image && (
                <div className="h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                <CardTitle className="text-xl text-slate-900">{campaign.title}</CardTitle>
                <CardDescription className="text-base text-slate-700 mt-2">
                  {campaign.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-900">{campaign.date}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{campaign.location}</span>
                </div>

                {/* Details */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600 leading-relaxed">{campaign.details}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special note */}
        <div className="mt-12 p-6 bg-red-50 border-l-4 border-red-600 rounded-r-lg">
          <h3 className="font-semibold text-slate-900 mb-2">鏡開き（かがみびらき）について</h3>
          <p className="text-slate-700 text-sm">
            1月11日は日本全国で鏡開きが行われます。年神様にお供えした鏡餅を下ろして食べることで、一年の健康と幸せを願う伝統行事です。諏訪神社周辺ではお汁粉サービスなどが行われる可能性があります。参拝帰りに周辺のカフェで温かいお汁粉をお楽しみください。
          </p>
        </div>
      </div>
    </section>
  );
}
