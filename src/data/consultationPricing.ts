export type TeamPricingTier = {
  label: string;
  price: number;
  formattedPrice: string;
  shortPrice: string;
  paystackUrl: string;
};

export const CONSULTATION_PRICING: Record<string, TeamPricingTier> = {
  "Just me": {
    label: "Just me",
    price: 50000,
    formattedPrice: "₦50,000",
    shortPrice: "₦50k",
    paystackUrl: "https://paystack.shop/pay/circlehqcompany",
  },
  "2–10": {
    label: "2–10",
    price: 100000,
    formattedPrice: "₦100,000",
    shortPrice: "₦100k",
    paystackUrl: "https://paystack.shop/pay/cmt84z0q67",
  },
  "11–50": {
    label: "11–50",
    price: 150000,
    formattedPrice: "₦150,000",
    shortPrice: "₦150k",
    paystackUrl: "https://paystack.shop/pay/elbnow8omf",
  },
  "50+": {
    label: "50+",
    price: 200000,
    formattedPrice: "₦200,000",
    shortPrice: "₦200k",
    paystackUrl: "https://paystack.shop/pay/7a7r3170jo",
  },
};
