// Google Gemini AI Service for DawnTactics AI
// Enables live Grandmaster-level MLBB Esports Draft Coaching & Oracle Consultations
import { OracleChatMessage } from '../types/mlbb';

const STORAGE_KEY = 'dawntactics_gemini_api_key';
const FALLBACK_MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];

export class GeminiService {
  private static cachedKey: string | null = null;

  public static getApiKey(): string {
    if (this.cachedKey) return this.cachedKey;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored.trim()) {
        this.cachedKey = stored.trim();
        return this.cachedKey;
      }
    }
    return '';
  }

  public static setApiKey(key: string): void {
    const cleaned = key.trim();
    this.cachedKey = cleaned;
    if (typeof window !== 'undefined') {
      if (cleaned) {
        localStorage.setItem(STORAGE_KEY, cleaned);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  public static hasKey(): boolean {
    return Boolean(this.getApiKey());
  }

  public static async testConnection(apiKey: string): Promise<{ success: boolean; message: string }> {
    const key = apiKey.trim();
    if (!key) {
      return { success: false, message: 'API key cannot be empty.' };
    }

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`);
      if (res.ok) {
        return { success: true, message: 'Google Gemini connected successfully!' };
      }
      const data = await res.json().catch(() => ({}));
      const errMsg = data.error?.message || `HTTP ${res.status}: ${res.statusText}`;
      return { success: false, message: errMsg };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Network error: Please check your internet connection.'
      };
    }
  }

  public static async askOracle(
    userPrompt: string,
    context?: { blueHeroes?: string[]; redHeroes?: string[] }
  ): Promise<OracleChatMessage> {
    const key = this.getApiKey();
    if (!key) {
      throw new Error('NO_API_KEY');
    }

    const systemInstruction = `You are DawnOracle AI, the premier Mobile Legends: Bang Bang (MLBB) Mythical Immortal Esports Tactical Coach.
You possess complete master-level knowledge of:
1. Current MLBB Meta, Hero Counters, and Synergy Drafting (e.g., neutralizing Fanny, Estes counter-itemization, flex picks).
2. Reactive Itemization Triage (Radiant Armor vs Athena's Shield, Dominance Ice vs Glowing Wand vs Sea Halberd, Malefic Roar penetration curves, Winter Crown / Immortality / Wind of Nature swap rotations).
3. Modular Emblem Configurations & Talents (Thrill, Rupture, Seasoned Hunter, Quantum Charge, Brave Smite, etc.).
4. Battle Spell Cooldown Windows & Tactical Exploit (Flicker 120s, Purify 90s, Retribution smite timing).
5. Macro Lane Dynamics & Objectives (Wave Freezing, Slow Pushes, Fast Crashes, 0:45 Lithowanderer, 2:00 Turtle, 8:00 Lord, 12:00 Enhanced Lord).

RULES:
- Answer authoritatively, concisely, and format in clean GitHub Markdown with bolding and bullet points.
- If asked about anything outside MLBB, Mobile Legends, esports, or MOBA mechanics, politely decline stating you are strictly domain-locked to the Land of Dawn.
${context?.blueHeroes?.length ? `Current Blue (Ally) Team: ${context.blueHeroes.join(', ')}` : ''}
${context?.redHeroes?.length ? `Current Red (Enemy) Team: ${context.redHeroes.join(', ')}` : ''}`;

    let lastError = '';

    for (const model of FALLBACK_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
        const body = {
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nCommander Inquiry: ${userPrompt}` }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        };

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          lastError = errData.error?.message || `HTTP ${res.status}`;
          continue; // Try next fallback model
        }

        const data = await res.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (responseText) {
          return {
            id: 'gemini-' + Date.now(),
            sender: 'oracle',
            text: responseText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tactical_tags: ['Gemini 2.5 Flash', 'Live AI Intelligence']
          };
        }
      } catch (err: any) {
        lastError = err.message || 'Fetch failed';
      }
    }

    throw new Error(lastError || 'Failed to reach Google Gemini API');
  }

  public static async analyzeDraft(
    blueHeroes: string[],
    redHeroes: string[],
    bans: { blue: string[]; red: string[] }
  ): Promise<string> {
    const key = this.getApiKey();
    if (!key) throw new Error('NO_API_KEY');

    const prompt = `Analyze this competitive Mobile Legends: Bang Bang 5v5 draft breakdown:
Blue (Ally) Team: ${blueHeroes.join(', ') || 'None selected'}
Red (Enemy) Team: ${redHeroes.join(', ') || 'None selected'}
Blue Bans: ${bans.blue.join(', ') || 'None'}
Red Bans: ${bans.red.join(', ') || 'None'}

Provide a 3-part tactical esports coaching summary:
1. **Draft Advantage & Win Condition**: Who holds early vs late tempo?
2. **Key Threat Analysis**: The biggest enemy power spike and counter-item priority.
3. **5v5 Teamfight Execution**: How the team should position in Turtle and Lord contests.`;

    const result = await this.askOracle(prompt, { blueHeroes, redHeroes });
    return result.text;
  }
}
