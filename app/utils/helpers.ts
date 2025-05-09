import { ModelInfo } from '@/app/data/modelPricing';

// Filter models based on search text
export const filterModels = (models: ModelInfo[], filter: string): ModelInfo[] => {
  if (!filter) return models;
  
  return models.filter(model =>
    model.apiName.toLowerCase().includes(filter.toLowerCase()) ||
    model.realName.toLowerCase().includes(filter.toLowerCase())
  );
};

// Copy text to clipboard with fallback
export const copyToClipboard = (text: string, onSuccess: (text: string) => void, onError: (error: any) => void): void => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => onSuccess(text))
      .catch(err => onError(err));
  } else {
    // Fallback for browsers without clipboard API
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      onSuccess(text);
    } catch (err) {
      onError(err);
    }
  }
};

// Scroll to section helper
export const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement | null>, callback?: () => void): void => {
  if (callback) callback();
  
  if (sectionRef.current) {
    const yOffset = -80; // Adjust this value based on header height
    const element = sectionRef.current;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}; 