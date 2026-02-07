export interface Campaign {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  details: string;
  isActive: boolean;
}

export const campaigns: Campaign[] = [
  {
    id: "kagami-biraki",
    title: "鏡開き（かがみびらき）",
    description:
      "1月11日は日本全国で鏡開きが行われます。年神様にお供えした鏡餅を下ろして食べることで、一年の健康と幸せを願う伝統行事です。",
    date: "2026年1月11日（日曜日）",
    location: "札幌諏訪神社周辺",
    image: "/images/kagami-biraki.jpg",
    details:
      "北海道では鏡開きは一般的に1月11日に行われます。諏訪神社周辺ではお汁粉サービスなどが行われる可能性があります。参拝帰りに周辺のカフェで温かいお汁粉をお楽しみください。",
    isActive: true,
  },
  {
    id: "daimaru-popup",
    title: "大丸札幌店 マッキントッシュ POP-UP SHOP",
    description:
      "大丸札幌店7階催事場で開催されているマッキントッシュのポップアップショップ。1月11日が最終日です。",
    date: "2026年1月11日（最終日）",
    location: "大丸札幌店 7階催事場",
    details:
      "期間：2025年12月26日（金）～2026年1月11日（日）。マッキントッシュの最新コレクションをご覧いただけます。",
    isActive: true,
  },
];

export const getActiveCampaigns = (): Campaign[] => {
  return campaigns.filter((c) => c.isActive);
};
