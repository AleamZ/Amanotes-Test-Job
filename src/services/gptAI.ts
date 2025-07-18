// API Configuration for ChatGPT
export const API_CONFIG = {
    OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
    CHATGPT_MODEL: 'gpt-3.5-turbo',
    MAX_TOKENS: 500,
    TEMPERATURE: 0.7
}; 