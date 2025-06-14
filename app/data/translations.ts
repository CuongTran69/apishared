export type Language = 'en' | 'vi';

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    title: 'API Shared - All in one API',
    description: 'Access powerful AI APIs at discounted rates. Featuring OpenAI, Anthropic, and more.',
    exploreAPILLM: 'Explore LLMAIVN',
    modelsSection: 'Prices Token Models',
    joinUs: 'Join Us',
    providersTitle: 'Providers',
    modelCodeCopy: 'Copy Model Code',
    bonusPricing: 'Bonus Recharge',
    modelPricing: 'AI Model Pricing',
    footerText: 'Join our community groups to get $2 credit and 24h free trial access! 🎁',
    copyrightText: '2024 API Shared. All rights reserved.',
    freeTrial: 'Free Trial',
    joinAndTest: 'Join and Test API',
    tryBeforeYouBuy: 'Try before you buy with our trial offer',
    freeCreditText: "Free",
    bonusCreditTiers: 'Bonus Credit Tiers:',
    minimumDeposit: 'Minimum deposit:',
    bonusRate: 'Bonus rate:',
    exampleInvestment: 'Example Investment',
    totalBalanceAfterBonus: 'Total Balance After Bonus',
    contactUsToPurchase: 'Contact Us to Purchase',
    validFor: 'Valid for',
    tenPlusPurchase: '$10+ Purchase',
    getExtraTen: 'Get an extra 100% bonus when you spend over $10',
    spend: 'Spend',
    bonus: 'Bonus',
    bonusPercentage: 'Bonus %',
    tenDollarTier: 'Buy 10$: 100% Bonus',
    testApiKey: 'Test API Key',
    placeholder: 'Search models...',
    modelName: 'Model Name',
    realModelName: 'Real Model Name',
    inputPrice: 'Input Price ($/1M tokens)',
    outputPrice: 'Output Price ($/1M tokens)',
    showAll: 'Show all',
    showLess: 'Show less',
    newBadge: 'NEW'
  },
  vi: {
    title: 'API Shared - All in one API',
    description: 'Truy cập các API AI mạnh mẽ với mức ưu đãi cực lớn. Được trang bị các models của OpenAI, Anthropic và nhiều hơn nữa.',
    exploreAPILLM: 'Khám phá LLMAIVN',
    modelsSection: 'Giá token models AI',
    joinUs: 'Tham gia cùng chúng tôi',
    providersTitle: 'Nhà Cung Cấp',
    modelCodeCopy: 'Sao Chép Mã Mô Hình',
    bonusPricing: 'Ưu đãi nạp tiền',
    modelPricing: 'Giá Các Models AI',
    footerText: 'Tham gia nhóm cộng đồng của chúng tôi để nhận $2 credit và 24h miễn phí dùng thử! 🎁',
    copyrightText: '2024 API Shared. All rights reserved.',
    freeTrial: 'Dùng thử miễn phí',
    joinAndTest: 'Tham gia và dùng thử API',
    tryBeforeYouBuy: 'Dùng thử trước khi mua',
    freeCreditText: 'Miễn phí',
    bonusCreditTiers: 'Ưu Đãi Nạp Tiền',
    minimumDeposit: 'Mệnh giá nạp tối thiểu:',
    bonusRate: 'Tỷ lệ ưu đãi:',
    exampleInvestment: 'Ví dụ đầu tư:',
    totalBalanceAfterBonus: 'Tổng số dư sau khi nhận ưu đãi',
    contactUsToPurchase: 'Liên hệ với chúng tôi để mua',
    validFor: 'Hạn sử dụng',
    tenPlusPurchase: 'Mua Trên $10',
    getExtraTen: 'Nhận thêm ưu đãi 100% khi nạp trên $10',
    spend: 'Chi Tiêu',
    bonus: 'Ưu Đãi',
    bonusPercentage: '% Ưu Đãi',
    tenDollarTier: 'Mua trên $10: Ưu Đãi 100%',
    testApiKey: 'Kiểm Tra API Key',
    placeholder: 'Tìm kiếm model...',
    modelName: 'Tên Model',
    realModelName: 'Tên Model Thực',
    inputPrice: 'Giá Input ($/1M tokens)',
    outputPrice: 'Giá Output ($/1M tokens)',
    showAll: 'Hiển thị tất cả',
    showLess: 'Hiển thị ít hơn',
    newBadge: 'MỚI'
  }
};

export default translations; 