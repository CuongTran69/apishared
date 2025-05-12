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

const modelPricing = {
  "Anthropic Models": [
    {
      apiName: 'anthropic:3.7-sonnet-search',
      realName: 'Claude 3.7 Search',
      inputPrice: { original: 3.75, discounted: 1.88 },
      outputPrice: { original: 18.75, discounted: 9.38 }
    },
    {
      apiName: 'anthropic:3.7-sonnet-thinking-search',
      realName: 'Claude 3.7 Thinking Search',
      inputPrice: { original: 5.00, discounted: 2.50 },
      outputPrice: { original: 25.00, discounted: 12.5 }
    },
    {
      apiName: 'anthropic:3.7-sonnet',
      realName: 'Claude 3.7 Sonnet',
      inputPrice: { original: 3.75, discounted: 1.88 },
      outputPrice: { original: 18.75, discounted: 9.38 }
    },
    {
      apiName: 'anthropic:3.7-sonnet-thinking',
      realName: 'Claude 3.7 Thinking Mode Extended',
      inputPrice: { original: 5.00, discounted: 2.50 },
      outputPrice: { original: 25.00, discounted: 12.5 }
    },
    {
      apiName: 'anthropic:3.5-sonnet-search',
      realName: 'claude-3.5-sonnet-20241022',
      inputPrice: { original: 3.00, discounted: 1.5 },
      outputPrice: { original: 15.00, discounted: 7.5 }
    },
    {
      apiName: 'anthropic:3.5-sonnet-20241022',
      realName: 'claude-3.5-sonnet-20241022',
      inputPrice: { original: 3.00, discounted: 1.5 },
      outputPrice: { original: 15.00, discounted: 7.5 }
    },
    {
      apiName: 'anthropic:3.5-sonnet-20241022-think-exp',
      realName: 'claude-3.5-sonnet-20241022-think-exp',
      inputPrice: { original: 3.00, discounted: 1.5 },
      outputPrice: { original: 15.00, discounted: 7.5 }
    },
    {
      apiName: 'anthropic:3-opus',
      realName: 'Claude-3-opus',
      inputPrice: { original: 15.00, discounted: 7.5 },
      outputPrice: { original: 75.00, discounted: 37.5 }
    },
    {
      apiName: 'anthropic:3-opus-think-exp',
      realName: 'Claude-3-opus-think-exp',
      inputPrice: { original: 15.00, discounted: 7.5 },
      outputPrice: { original: 75.00, discounted: 37.5 }
    },
    {
      apiName: 'anthropic:3.5-sonnet',
      realName: 'claude-3.5-sonnet',
      inputPrice: { original: 3.00, discounted: 1.5 },
      outputPrice: { original: 15.00, discounted: 7.5 }
    },
    {
      apiName: 'anthropic:3.5-sonnet-think-exp',
      realName: 'claude-3.5-sonnet-think-exp',
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
      apiName: 'openai:o4-mini',
      realName: 'OpenAI o4 mini',
      inputPrice: { original: 1.10, discounted: 0.55 },
      outputPrice: { original: 4.40, discounted: 2.20 }
    },
    {
      apiName: 'openai:gpt-4.1',
      realName: 'OpenAI 4.1',
      inputPrice: { original: 2.00, discounted: 1.00 },
      outputPrice: { original: 8.00, discounted: 8.00 }
    },
    {
      apiName: 'openai:o1',
      realName: 'OpenAI o1',
      inputPrice: { original: 15.00, discounted: 7.50 },
      outputPrice: { original: 60.00, discounted: 30.00 }
    },
    {
      apiName: 'openai:o3-mini',
      realName: 'OpenAI o3-mini',
      inputPrice: { original: 2.20, discounted: 1.10 },
      outputPrice: { original: 8.80, discounted: 4.40 }
    },
    {
      apiName: 'openai:o3-mini-think-exp',
      realName: 'OpenAI o3-mini',
      inputPrice: { original: 2.20, discounted: 1.10 },
      outputPrice: { original: 8.80, discounted: 4.40 }
    },
    {
      apiName: 'openai:gpt-4o',
      realName: 'OpenAI 4o',
      inputPrice: { original: 2.50, discounted: 1.25 },
      outputPrice: { original: 10.00, discounted: 5.00 }
    },
    {
      apiName: 'openai:gpt-4o-search',
      realName: 'OpenAI 4o search',
      inputPrice: { original: 2.50, discounted: 1.25 },
      outputPrice: { original: 10.00, discounted: 5.00 }
    },
    {
      apiName: 'openai:gpt-4o-mini',
      realName: 'OpenAI 4o-mini',
      inputPrice: { original: 0.15, discounted: 0.075 },
      outputPrice: { original: 0.60, discounted: 0.3 }
    },
    {
      apiName: 'openai:gpt-4o-2024-08-06',
      realName: 'OpenAI 4o-2024-08-06',
      inputPrice: { original: 2.50, discounted: 1.25 },
      outputPrice: { original: 10.00, discounted: 5.00 }
    },
    {
      apiName: 'openai:o1-mini',
      realName: 'OpenAI o1-mini',
      inputPrice: { original: 3.00, discounted: 1.5 },
      outputPrice: { original: 12.00, discounted: 6.00 }
    },
    {
      apiName: 'openai:gpt-4',
      realName: 'OpenAI gpt-4',
      inputPrice: { original: 30.00, discounted: 15.00 },
      outputPrice: { original: 60.00, discounted: 30.00 }
    },
    {
      apiName: 'openai:gpt-4-turbo-2024-04-09',
      realName: 'OpenAI gpt-4-turbo-2024-04-09',
      inputPrice: { original: 10.00, discounted: 5.00 },
      outputPrice: { original: 30.00, discounted: 15.00 }
    }
  ],
  "DeepSeek Models": [
    // {
    //   apiName: 'deepseek:deepseek-v3-0324',
    //   realName: 'Deepseek v3 03-2024',
    //   inputPrice: { original: 0.5, discounted: 0.25 },
    //   outputPrice: { original: 1.5, discounted: 0.75 }
    // },
    {
      apiName: 'deepseek:deepseek-r1-search',
      realName: 'Deepseek R1 search',
      inputPrice: { original: 0.80, discounted: 0.40 },
      outputPrice: { original: 2.40, discounted: 1.20 }
    },
    {
      apiName: 'deepseek:deepseek-r1',
      realName: 'Deepseek Reasoner',
      inputPrice: { original: 0.80, discounted: 0.40 },
      outputPrice: { original: 2.40, discounted: 1.20 }
    }
  ],
  "Grok Models": [
    {
      apiName: 'grok:grok-3',
      realName: 'Grok v3',
      inputPrice: { original: 3.00, discounted: 1.50 },
      outputPrice: { original: 15.00, discounted: 7.50 }
    },
    {
      apiName: 'grok-3-deepsearch',
      realName: 'Grok v3 Deep search',
      inputPrice: { original: 1.50, discounted: 0.75 },
      outputPrice: { original: 7.50, discounted: 3.75 }
    }
    // ,
    // {
    //   apiName: 'grok-3-reasoner',
    //   realName: 'Grok v3 reasoner',
    //   inputPrice: { original: 1.50, discounted: 0.75 },
    //   outputPrice: { original: 7.50, discounted: 3.75 }
    // }
  ],
  "Gemini Models": [
    {
      apiName: 'gemini:gemini-2.5-pro-exp-03-25',
      realName: 'Gemini 2.5 Pro',
      inputPrice: { original: 2.5, discounted: 1.25 },
      outputPrice: { original: 10.00, discounted: 5.00 }
    },
    {
      apiName: 'gemini:gemini-2.5-pro-exp-03-25-search',
      realName: 'Gemini 2.5 Pro Search',
      inputPrice: { original: 2.5, discounted: 1.25 },
      outputPrice: { original: 10.00, discounted: 5.00 }
    },
    {
      apiName: 'gemini:gemini-2.0-pro-exp',
      realName: 'Gemini 2.0',
      inputPrice: { original: 2.5, discounted: 1.25 },
      outputPrice: { original: 10.00, discounted: 5.00 }
    },
    {
      apiName: 'gemini:gemini-2.0-pro-exp-search',
      realName: 'Gemini 2.0 Pro Search',
      inputPrice: { original: 2.5, discounted: 1.25 },
      outputPrice: { original: 10.00, discounted: 5.00 }
    },
    {
      apiName: 'gemini:gemini-2.0-pro-exp-think-exp',
      realName: 'Gemini 2.0 Deep Think',
      inputPrice: { original: 2.5, discounted: 1.25 },
      outputPrice: { original: 10.00, discounted: 5.00 }
    },
  ]
};

export default modelPricing; 