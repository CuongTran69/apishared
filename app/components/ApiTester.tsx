'use client';

import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaCopy } from 'react-icons/fa';

interface ApiTesterProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'vi';
}

const translations = {
  en: {
    title: 'Test Your API Key',
    description: 'Test your API key to ensure it works correctly with our service',
    apiKeyLabel: 'Enter API Key',
    baseUrlLabel: 'Enter Base URL',
    modelLabel: 'Enter Model Name (leave empty for default - anthropic:3.7-sonnet)',
    testButton: 'Test API',
    closeButton: 'Close',
    copyCode: 'Copy Code',
    testingMessage: 'Testing API...',
    copySuccess: 'Code copied!',
    pythonScript: 'Python Test Script',
  },
  vi: {
    title: 'Kiểm Tra API Key',
    description: 'Kiểm tra API key của bạn để đảm bảo nó hoạt động đúng với dịch vụ của chúng tôi',
    apiKeyLabel: 'Nhập API Key',
    baseUrlLabel: 'Nhập Base URL',
    modelLabel: 'Nhập Model Name (bỏ trống để dùng mặc định - anthropic:3.7-sonnet)',
    testButton: 'Kiểm Tra API',
    closeButton: 'Đóng',
    copyCode: 'Sao Chép Mã',
    testingMessage: 'Đang kiểm tra API...',
    copySuccess: 'Đã sao chép mã!',
    pythonScript: 'Mã Python Kiểm Tra',
  }
};

const pythonScript = `
import openai
import requests
import sys

def test_openai_api(api_key, base_url, model_name=None):
    try:
        # Cấu hình OpenAI client
        if base_url:
            client = openai.OpenAI(api_key=api_key, base_url=base_url)
        else:
            client = openai.OpenAI(api_key=api_key)
        
        # Xác định model_name để sử dụng
        effective_model_name = model_name if model_name else "anthropic:3.7-sonnet"
        
        # Thử gọi API đơn giản
        response = client.chat.completions.create(
            model=effective_model_name,
            messages=[{"role": "user", "content": "Hello"}],
            max_tokens=10
        )
        print("✅ API hoạt động tốt!")
        print(f"Response: {response.choices[0].message.content}")
        
    except Exception as e:
        print("❌ OpenAI API lỗi:")
        print(f"Error: {str(e)}")

def main():
    # OpenAI test
    openai_api_key = input("Nhập API key: ").strip()
    if openai_api_key:
        base_url = input("Nhập baseURL: ").strip()
        model_name = input("Nhập model name (bỏ trống để dùng mặc định 'anthropic:3.7-sonnet'): ").strip()
        print("\\nĐang test API...")
        test_openai_api(
            openai_api_key, 
            base_url, 
            model_name if model_name else None # Truyền model_name hoặc None nếu người dùng bỏ trống
        )

if __name__ == "__main__":
    main()
`;

const ApiTester: React.FC<ApiTesterProps> = ({ isOpen, onClose, language }) => {
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [modelName, setModelName] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key];
  };

  const testApi = () => {
    setIsTesting(true);
    setTestResult(null);
    
    // Simulate API testing - in a real-world scenario, you'd make an actual API call
    setTimeout(() => {
      setIsTesting(false);
      // Just a simulation - in a real app you would make the actual API call
      if (apiKey) {
        setTestResult({
          success: true,
          message: 'API key valid! Connection successful.'
        });
      } else {
        setTestResult({
          success: false,
          message: 'API key cannot be empty.'
        });
      }
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F2442] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto border border-blue-500/30 shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{t('title')}</h2>
          <p className="text-gray-300 mb-6">{t('description')}</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-300 mb-2">{t('apiKeyLabel')}</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-[#1A2F50] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="sk-..."
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">{t('baseUrlLabel')}</label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full bg-[#1A2F50] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="https://api.sv2.llm.ai.vn/v1"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">{t('modelLabel')}</label>
              <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full bg-[#1A2F50] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="anthropic:3.7-sonnet"
              />
            </div>
          </div>

          {testResult && (
            <div className={`p-4 rounded-lg mb-6 ${testResult.success ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
              <div className="flex items-center">
                {testResult.success ? (
                  <FaCheckCircle className="text-green-400 mr-2" />
                ) : (
                  <FaTimesCircle className="text-red-400 mr-2" />
                )}
                <p className="text-white">{testResult.message}</p>
              </div>
            </div>
          )}

          <div className="flex space-x-4 mb-6">
            <button
              onClick={testApi}
              disabled={isTesting}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTesting ? t('testingMessage') : t('testButton')}
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {t('closeButton')}
            </button>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{t('pythonScript')}</h3>
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-lg transition-colors text-sm"
              >
                <FaCopy className="mr-1" />
                <span>{copySuccess ? t('copySuccess') : t('copyCode')}</span>
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                <code>{pythonScript}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTester; 