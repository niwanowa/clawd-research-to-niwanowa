export interface Restaurant {
  id: string;
  name: string;
  genre: string[];
  rating: number;
  priceRange: {
    lunch?: string;
    dinner?: string;
  };
  description: string;
  image?: string;
  address: string;
  phone?: string;
  hours?: string;
  closedDays?: string;
  distance: string;
  features: string[];
}

export const restaurants: Restaurant[] = [
  {
    id: "coffee-pictures",
    name: "COFFEE PICTURES 札幌諏訪神社ブース",
    genre: ["甘味処", "カフェ"],
    rating: 3.03,
    priceRange: {
      lunch: "～¥999",
    },
    description: "諏訪神社の近所にあるコーヒー店の販売ブース。参拝後にほっと一息つける。お汁粉が人気。",
    address: "札幌市北区北2条西2丁目（諏訪神社内）",
    hours: "不定期（SNS確認推奨）",
    distance: "北13条東駅から153m",
    features: ["参拝帰りに立ち寄りやすい", "お汁粉", "自家焙煎コーヒー"],
  },
  {
    id: "unique",
    name: "カフェ&キッチン ユニック",
    genre: ["カフェ", "クレープ・ガレット", "ステーキ"],
    rating: 3.39,
    priceRange: {
      lunch: "¥1,000～¥1,999",
      dinner: "¥3,000～¥3,999",
    },
    description: "ユニークなカフェレストラン。オムライスやハンバーグが人気。",
    address: "札幌市北区北13条東3丁目",
    closedDays: "木曜日",
    distance: "北13条東駅から329m",
    features: ["オムライス", "ハンバーグ", "クレープ", "ユニークな空間"],
  },
  {
    id: "ishida-coffee",
    name: "石田珈琲店",
    genre: ["カフェ"],
    rating: 3.53,
    priceRange: {
      lunch: "～¥999（モーニング）、¥1,000～¥1,999（ランチ）",
    },
    description: "いちじくのタルトなど季節限定スイーツが人気。コーヒーの品質が高い。",
    address: "札幌市北区北18条西2丁目",
    closedDays: "火曜日、水曜日",
    distance: "北13条東駅から719m",
    features: ["季節限定スイーツ", "高品質コーヒー", "いちじくのタルト"],
  },
  {
    id: "enimo-no5",
    name: "enimo No.5",
    genre: ["カフェ", "コーヒースタンド"],
    rating: 3.44,
    priceRange: {
      lunch: "¥1,000～¥1,999",
      dinner: "¥2,000～¥2,999",
    },
    description: "いちごシリーズが人気。かわいいスイーツが充実。",
    address: "札幌市北区北12条西2丁目",
    distance: "北13条東駅から706m",
    features: ["いちごシリーズ", "かわいいスイーツ", "年中無休"],
  },
  {
    id: "curry-shokudo-kokoro",
    name: "カレー食堂 心 札幌本店",
    genre: ["スープカレー", "カフェ", "カレー"],
    rating: 3.42,
    priceRange: {
      lunch: "¥1,000～¥1,999",
      dinner: "¥1,000～¥1,999",
    },
    description: "スープカレーの老舗。北大からすぐ。安定の美味しさ。",
    address: "札幌市北区北18条西2丁目",
    distance: "北13条東駅から757m",
    features: ["スープカレーの老舗", "北大近く", "安定の美味しさ"],
  },
  {
    id: "noya",
    name: "のや",
    genre: ["カフェ", "洋食"],
    rating: 3.35,
    priceRange: {
      lunch: "¥1,000～¥1,999",
      dinner: "¥1,000～¥1,999",
    },
    description: "隠れ家のような蔵カフェ。洋食が人気。",
    address: "札幌市北区北13条東3丁目",
    closedDays: "火曜日、水曜日",
    distance: "北13条東駅から435m",
    features: ["隠れ家的な雰囲気", "蔵カフェ", "洋食"],
  },
  {
    id: "mogyoshinoyome",
    name: "元漁師の嫁",
    genre: ["カフェ", "海鮮", "カレー"],
    rating: 3.17,
    priceRange: {
      lunch: "～¥999",
    },
    description: "素朴で丁寧な魚定食。安心の一軒。",
    address: "札幌市北区北13条東3丁目",
    distance: "北13条東駅から788m",
    features: ["魚定食", "素朴で丁寧", "安心の一軒"],
  },
  {
    id: "kiki-coffee",
    name: "KIKI COFFEE PLACE",
    genre: ["カフェ"],
    rating: 3.24,
    priceRange: {
      dinner: "¥2,000～¥2,999",
    },
    description: "5つ星ホテルでのバーテンダー経験がある店主。こだわりのコーヒー。",
    address: "札幌市北区北12条西2丁目",
    closedDays: "火曜日",
    distance: "北13条東駅から603m",
    features: ["こだわりのコーヒー", "経験豊富な店主", "上質な空間"],
  },
  {
    id: "ichigoyakan",
    name: "苺館",
    genre: ["カフェ", "カレー"],
    rating: 3.18,
    priceRange: {
      lunch: "～¥999",
    },
    description: "ノスタルジーな外観。お店の雰囲気が最高。",
    address: "札幌市北区北12条東3丁目",
    closedDays: "日曜日",
    distance: "北13条東駅から496m",
    features: ["ノスタルジーな雰囲気", "かわいい外観", "居心地の良さ"],
  },
  {
    id: "perch",
    name: "PERCH",
    genre: ["カフェ", "バー"],
    rating: 3.09,
    priceRange: {
      lunch: "～¥999",
      dinner: "¥1,000～¥1,999",
    },
    description: "クリームパスタなどが人気。落ち着いた雰囲気。",
    address: "札幌市北区北13条東3丁目",
    closedDays: "水曜日",
    distance: "北13条東駅から515m",
    features: ["クリームパスタ", "バー機能", "落ち着いた雰囲気"],
  },
];

export const getRestaurantsByGenre = (genre: string): Restaurant[] => {
  return restaurants.filter((r) => r.genre.includes(genre));
};

export const getTopRatedRestaurants = (limit: number = 5): Restaurant[] => {
  return [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, limit);
};
