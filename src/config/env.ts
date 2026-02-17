const config = {
  openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  spotifyClientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  
  // Feature flags
  features: {
    aiChatbot: true,
    spotifyIntegration: true,
    pdfExport: true,
    timer: true
  }
};

export default config;