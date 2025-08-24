declare global {
  interface Window {
    grecaptcha: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: string | ((token: string) => void);
          'error-callback'?: string | (() => void);
          'expired-callback'?: string | (() => void);
        }
      ) => number;
      reset: (widgetId: number) => void;
    };
  }
}

export {};
