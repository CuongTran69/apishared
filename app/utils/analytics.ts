'use client';

// Analytics utility for tracking user interactions
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

class Analytics {
  private static instance: Analytics;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public init() {
    if (this.isInitialized) return;
    
    // Initialize PostHog if available
    if (typeof window !== 'undefined' && window.posthog) {
      this.isInitialized = true;
      console.log('Analytics initialized');
    }
  }

  public track(event: string, properties?: Record<string, any>) {
    if (typeof window === 'undefined') return;

    try {
      // PostHog tracking
      if (window.posthog) {
        window.posthog.capture(event, properties);
      }

      // Console log for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', { event, properties });
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  public trackPageView(page: string) {
    this.track('page_view', { page });
  }

  public trackApiTest(success: boolean, provider?: string) {
    this.track('api_test', { success, provider });
  }

  public trackModelCopy(modelName: string, provider: string) {
    this.track('model_code_copy', { model_name: modelName, provider });
  }

  public trackLanguageChange(from: string, to: string) {
    this.track('language_change', { from, to });
  }

  public trackSectionView(section: string) {
    this.track('section_view', { section });
  }

  public trackCTAClick(cta: string, location: string) {
    this.track('cta_click', { cta, location });
  }

  public trackError(error: string, context?: string) {
    this.track('error', { error, context });
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance();

// Declare global PostHog type
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
      identify: (userId: string, properties?: Record<string, any>) => void;
    };
  }
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private static marks: Map<string, number> = new Map();

  public static mark(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      const timestamp = window.performance.now();
      this.marks.set(name, timestamp);
      window.performance.mark(name);
    }
  }

  public static measure(name: string, startMark: string, endMark?: string) {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        if (endMark) {
          window.performance.measure(name, startMark, endMark);
        } else {
          window.performance.measure(name, startMark);
        }
        
        const measure = window.performance.getEntriesByName(name, 'measure')[0];
        if (measure) {
          analytics.track('performance_measure', {
            name,
            duration: measure.duration,
            start_time: measure.startTime
          });
        }
      } catch (error) {
        console.warn('Performance measurement failed:', error);
      }
    }
  }

  public static getDuration(startMark: string): number {
    const startTime = this.marks.get(startMark);
    if (startTime && typeof window !== 'undefined' && window.performance) {
      return window.performance.now() - startTime;
    }
    return 0;
  }
}

export default analytics;
