export {};

declare global {
  interface Telegram {
    WebApp: any
  }

  interface Window {
    Telegram: Telegram;
  }
}