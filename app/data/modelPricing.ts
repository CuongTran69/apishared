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
  isNew?: boolean;
}

export interface ModelPricing {
  [category: string]: ModelInfo[];
}

const modelPricing = {
  "Anthropic Models": [
    {
      apiName: 'anthropic:opus-4-1-20250805',
      realName: 'Claude 4.1 Opus',
      inputPrice: { original: 15.00, discounted: 7.50 },
      outputPrice: { original: 75.00, discounted: 37.50 }
    },
    {
      apiName: 'anthropic:opus-4-1-20250805-thinking',
      realName: 'Claude 4.1 Opus',
      inputPrice: { original: 15.00, discounted: 7.50 },
      outputPrice: { original: 75.00, discounted: 37.50 }
    },
    {
      apiName: 'anthropic:opus-4-20250514',
      realName: 'Claude 4 Opus',
      inputPrice: { original: 15.00, discounted: 7.50 },
      outputPrice: { original: 75.00, discounted: 37.50 }
    },
    {
      apiName: 'anthropic:sonnet-4-20250514',
      realName: 'Claude 4 Sonnet',
      inputPrice: { original: 3.00, discounted: 1.50 },
      outputPrice: { original: 15.00, discounted: 7.50 }
    },
    {
      apiName: 'anthropic:3.7-sonnet',
      realName: 'Claude 3.7 Sonnet Lastest',
      inputPrice: { original: 3.75, discounted: 1.88 },
      outputPrice: { original: 18.75, discounted: 9.38 }
    },
    {
      apiName: 'anthropic:3.7-sonnet-thinking',
      realName: 'Claude 3.7 Thinking Lastest',
      inputPrice: { original: 5.00, discounted: 2.50 },
      outputPrice: { original: 25.00, discounted: 12.5 }
    },
    {
      apiName: 'anthropic:3.5-sonnet-20241022',
      realName: 'Claude 3.5 Sonnet Lastest',
      inputPrice: { original: 3.00, discounted: 1.5 },
      outputPrice: { original: 15.00, discounted: 7.5 }
    },
    {
      apiName: 'anthropic:3.5-sonnet',
      realName: 'Claude 3.5 Sonnet',
      inputPrice: { original: 3.00, discounted: 1.5 },
      outputPrice: { original: 15.00, discounted: 7.5 }
    },
    {
      apiName: 'anthropic:3.5-haiku',
      realName: 'claude-3.5-haiku',
      inputPrice: { original: 1.00, discounted: 0.5 },
      outputPrice: { original: 5.00, discounted: 2.5 }
    },
  ],
  "OpenAI Models": [
    {
      apiName: 'openai:gpt-4.1',
      realName: 'OpenAI 4.1',
      inputPrice: { original: 2.00, discounted: 1.00 },
      outputPrice: { original: 8.00, discounted: 8.00 }
    },
    {
      apiName: 'openai:gpt-4.1-mini',
      realName: 'OpenAI 4.1 Mini',
      inputPrice: { original: 2.00, discounted: 1.00 },
      outputPrice: { original: 8.00, discounted: 8.00 }
    },
    {
      apiName: 'openai:o4-mini',
      realName: 'OpenAI o4 mini',
      inputPrice: { original: 1.10, discounted: 0.55 },
      outputPrice: { original: 4.40, discounted: 2.20 }
    },
    {
      apiName: 'openai:gpt-4o',
      realName: 'OpenAI 4o',
      inputPrice: { original: 2.50, discounted: 1.25 },
      outputPrice: { original: 10.00, discounted: 5.00 }
    },
    {
      apiName: 'openai:gpt-4o-mini',
      realName: 'OpenAI 4o mini',
      inputPrice: { original: 0.15, discounted: 0.075 },
      outputPrice: { original: 0.60, discounted: 0.3 }
    },
  ],
  "DeepSeek Models": [
    {
      apiName: 'deepseek:deepseek-v3-0324',
      realName: 'Deepseek v3 03-2024',
      inputPrice: { original: 0.63, discounted: 0.315 },
      outputPrice: { original: 2.50, discounted: 1.25 }
    },
    {
      apiName: 'deepseek:deepseek-r1-0528',
      realName: 'Deepseek Reasoner',
      inputPrice: { original: 1.00, discounted: 0.50 },
      outputPrice: { original: 4.00, discounted: 2.00 }
    }
  ],
  "Grok Models": [
    {
      apiName: 'grok:grok-4',
      realName: 'Grok v4',
      inputPrice: { original: 3.00, discounted: 1.50 },
      outputPrice: { original: 15.00, discounted: 7.50 }
    },
    {
      apiName: 'grok:grok-3',
      realName: 'Grok v3',
      inputPrice: { original: 3.00, discounted: 1.50 },
      outputPrice: { original: 15.00, discounted: 7.50 }
    },
  ],
  "Gemini Models": [
    {
      apiName: 'gemini:gemini-2.5-pro-preview-0605',
      realName: 'Gemini 2.5 Pro Preview 06-05',
      inputPrice: { original: 2.5, discounted: 1.25 },
      outputPrice: { original: 10.00, discounted: 5.00 },
      isNew: true
    },
    {
      apiName: 'gemini:gemini-2.5-pro',
      realName: 'Gemini 2.5 Pro',
      inputPrice: { original: 2.5, discounted: 1.25 },
      outputPrice: { original: 15.00, discounted: 7.50 }
    },
    {
      apiName: 'gemini:gemini-2.5-flash',
      realName: 'Gemini 2.5 Flash',
      inputPrice: { original: 0.3, discounted: 0.15 },
      outputPrice: { original: 1.2, discounted: 0.6 }
    },
  ]
};

export default modelPricing; 