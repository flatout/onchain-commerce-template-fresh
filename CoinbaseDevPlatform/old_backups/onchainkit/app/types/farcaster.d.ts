interface FarcasterShareOptions {
  text: string;
  image?: string;
}

interface FarcasterMessageOptions {
  recipient: string;
  text: string;
}

interface FarcasterPostOptions {
  text: string;
  image?: string;
}

interface FarcasterFrameAction {
  like: () => Promise<void>;
  recast: () => Promise<void>;
  quoteCast: (text?: string) => Promise<void>;
  message: (options: { text: string }) => Promise<void>;
  addToFavorites: () => Promise<void>;
  shareCast: () => Promise<void>;
}

interface FarcasterFrame {
  status: 'connected' | 'disconnected';
  actions: FarcasterFrameAction;
}

interface Farcaster {
  share: (options: FarcasterShareOptions) => Promise<void>;
  message: (options: FarcasterMessageOptions) => Promise<void>;
  post: (options: FarcasterPostOptions) => Promise<void>;
}

declare global {
  interface Window {
    farcaster?: FarcasterFrame;
  }
}

export {}; 