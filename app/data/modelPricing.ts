// Define model pricing data for the application

export interface PriceInfo {
  original: number;
  discounted: number;
}

export interface ModelInfo {
  apiName: string;
  realName: string;
  inputPrice: PriceInfo;
  outputPrice: PriceInfo;
}

export interface ModelPricing {
  [category: string]: ModelInfo[];
}

const modelPricing: ModelPricing = {
  "OpenAI": [
    {
      apiName: "gpt-4o",
      realName: "GPT-4o",
      inputPrice: { original: 10.0, discounted: 5.0 },
      outputPrice: { original: 30.0, discounted: 15.0 }
    },
    {
      apiName: "gpt-4-turbo",
      realName: "GPT-4 Turbo",
      inputPrice: { original: 10.0, discounted: 5.0 },
      outputPrice: { original: 30.0, discounted: 15.0 }
    },
    {
      apiName: "gpt-4-vision",
      realName: "GPT-4 Vision",
      inputPrice: { original: 10.0, discounted: 5.0 },
      outputPrice: { original: 30.0, discounted: 15.0 }
    },
    {
      apiName: "gpt-4",
      realName: "GPT-4",
      inputPrice: { original: 30.0, discounted: 15.0 },
      outputPrice: { original: 60.0, discounted: 30.0 }
    },
    {
      apiName: "gpt-3.5-turbo",
      realName: "GPT-3.5 Turbo",
      inputPrice: { original: 1.0, discounted: 0.5 },
      outputPrice: { original: 2.0, discounted: 1.0 }
    }
  ],
  "Anthropic": [
    {
      apiName: "claude-3-opus",
      realName: "Claude 3 Opus",
      inputPrice: { original: 15.0, discounted: 7.5 },
      outputPrice: { original: 75.0, discounted: 37.5 }
    },
    {
      apiName: "claude-3-sonnet",
      realName: "Claude 3 Sonnet",
      inputPrice: { original: 3.0, discounted: 1.5 },
      outputPrice: { original: 15.0, discounted: 7.5 }
    },
    {
      apiName: "claude-3-haiku",
      realName: "Claude 3 Haiku",
      inputPrice: { original: 0.25, discounted: 0.125 },
      outputPrice: { original: 1.25, discounted: 0.625 }
    }
  ],
  "Google": [
    {
      apiName: "gemini-1.5-pro",
      realName: "Gemini 1.5 Pro",
      inputPrice: { original: 7.0, discounted: 3.5 },
      outputPrice: { original: 21.0, discounted: 10.5 }
    },
    {
      apiName: "gemini-1.0-pro",
      realName: "Gemini 1.0 Pro",
      inputPrice: { original: 3.5, discounted: 1.75 },
      outputPrice: { original: 10.5, discounted: 5.25 }
    }
  ],
  "Mistral AI": [
    {
      apiName: "mistral-large",
      realName: "Mistral Large",
      inputPrice: { original: 8.0, discounted: 4.0 },
      outputPrice: { original: 24.0, discounted: 12.0 }
    },
    {
      apiName: "mistral-medium",
      realName: "Mistral Medium",
      inputPrice: { original: 2.7, discounted: 1.35 },
      outputPrice: { original: 8.1, discounted: 4.05 }
    },
    {
      apiName: "mistral-small",
      realName: "Mistral Small",
      inputPrice: { original: 2.0, discounted: 1.0 },
      outputPrice: { original: 6.0, discounted: 3.0 }
    }
  ]
};

export default modelPricing; 