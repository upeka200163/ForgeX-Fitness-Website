const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Only models confirmed working for this API key
const ENDPOINTS = [
  { url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', label: 'gemini-2.0-flash' },
  { url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite-preview-02-05:generateContent', label: 'gemini-2.0-flash-lite' },
  { url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', label: 'gemini-1.5-flash' },
  { url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent', label: 'gemini-1.5-flash-8b' },
  { url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent', label: 'gemini-1.5-pro' },
];




const buildPrompt = (userData) => `You are a professional fitness coach. Create a personalized fitness and nutrition plan for this person.

Details:
Name: ${userData.name} | Age: ${userData.age} | Gender: ${userData.gender}
Height: ${userData.height}cm | Weight: ${userData.weight}kg | Body Fat: ${userData.bodyFat || 'unknown'}%
Goal: ${userData.goal} | Timeline: ${userData.timeline} | Target Weight: ${userData.targetWeight || 'not set'}kg
Fitness Level: ${userData.fitnessLevel} | Days/Week: ${userData.daysPerWeek} | Duration: ${userData.sessionDuration}
Equipment: ${userData.equipment} | Diet: ${userData.dietType} | Allergies: ${userData.allergies.join(', ') || 'none'}
Daily Calories: ${userData.calorieTarget || 'auto-calculate'}

Return ONLY valid JSON with NO markdown formatting, NO code fences, starting directly with {

{
  "summary": "2-3 sentence plan overview mentioning ${userData.name} and their ${userData.goal} goal",
  "weeklyWorkout": [
    {"day": "Monday", "focus": "Push - Chest & Triceps", "isRest": false, "exercises": [{"name": "Bench Press", "sets": 4, "reps": "8-10", "rest": "90s", "notes": "Control the descent"}]},
    {"day": "Tuesday", "focus": "Pull - Back & Biceps", "isRest": false, "exercises": [{"name": "Deadlift", "sets": 3, "reps": "6-8", "rest": "120s", "notes": "Keep spine neutral"}]},
    {"day": "Wednesday", "focus": "Rest & Recovery", "isRest": true, "exercises": []},
    {"day": "Thursday", "focus": "Legs & Glutes", "isRest": false, "exercises": [{"name": "Squats", "sets": 4, "reps": "8-10", "rest": "90s", "notes": "Depth below parallel"}]},
    {"day": "Friday", "focus": "Shoulders & Core", "isRest": false, "exercises": [{"name": "Overhead Press", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Brace core throughout"}]},
    {"day": "Saturday", "focus": "Cardio & Conditioning", "isRest": false, "exercises": [{"name": "HIIT Sprint Intervals", "sets": 8, "reps": "30s on/30s off", "rest": "0s", "notes": "Max effort sprints"}]},
    {"day": "Sunday", "focus": "Complete Rest", "isRest": true, "exercises": []}
  ],
  "mealPlan": [
    {"meal": "Breakfast", "time": "7:00 AM", "calories": 500, "foods": ["Oatmeal 80g", "2 whole eggs", "Banana", "Black coffee"], "macros": {"protein": 30, "carbs": 65, "fats": 12}},
    {"meal": "Lunch", "time": "12:30 PM", "calories": 650, "foods": ["Grilled chicken 180g", "Brown rice 150g", "Broccoli", "Olive oil drizzle"], "macros": {"protein": 50, "carbs": 70, "fats": 15}},
    {"meal": "Dinner", "time": "7:00 PM", "calories": 600, "foods": ["Salmon 200g", "Sweet potato 200g", "Mixed greens salad"], "macros": {"protein": 45, "carbs": 55, "fats": 20}},
    {"meal": "Snacks", "time": "3:00 PM & pre-bed", "calories": 350, "foods": ["Greek yogurt 200g", "Mixed nuts 30g", "Whey protein shake"], "macros": {"protein": 35, "carbs": 25, "fats": 14}}
  ],
  "macros": {"protein": 160, "carbs": 215, "fats": 61, "calories": 2100},
  "tips": [
    "Drink at least 3 liters of water daily — hydration directly impacts performance and recovery",
    "Sleep 7 to 9 hours every night — this is when your muscles actually grow and repair",
    "Track your food intake using an app like MyFitnessPal for the first 4 weeks",
    "Warm up for 10 minutes before every session to prevent injury and improve performance",
    "Progressive overload is key — increase weight or reps every 1 to 2 weeks to keep making gains"
  ]
}

Replace ALL placeholder values above with personalized values that match this specific user's profile, goal (${userData.goal}), diet type (${userData.dietType}), and equipment (${userData.equipment}). Keep exactly the same JSON structure.`;

const parseJSON = (text) => {
  let clean = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  const start = clean.indexOf('{');
  const end = clean.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No valid JSON in response');
  return JSON.parse(clean.slice(start, end + 1));
};

const wait = (ms) => new Promise(res => setTimeout(res, ms));

export const generateFitnessPlan = async (userData) => {
  if (!API_KEY) {
    console.error('[Gemini] VITE_GEMINI_API_KEY is undefined in environment.');
    throw new Error('Gemini API Key is missing. Please ensure VITE_GEMINI_API_KEY is set in your .env file and restart the dev server.');
  }
  
  console.log('[Gemini] Starting generation with key prefix:', API_KEY.substring(0, 8));

  const body = {
    contents: [{ role: 'user', parts: [{ text: buildPrompt(userData) }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
  };

  let lastErrorMsg = '';
  let hitRateLimit = false;

  // Shuffle endpoints to spread load
  const shuffledEndpoints = [...ENDPOINTS].sort(() => Math.random() - 0.5);

  for (const { url, label } of shuffledEndpoints) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`[Gemini] Requesting ${label} (Attempt ${attempt}/2)...`);
        
        const res = await fetch(`${url}?key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (res.status === 429) {
          console.warn(`[Gemini] ${label} returned 429 (Rate Limit).`);
          hitRateLimit = true;
          await wait(attempt * 2500); // Wait slightly longer
          continue; 
        }

        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          lastErrorMsg = errJson?.error?.message || `HTTP ${res.status}`;
          console.error(`[Gemini] ${label} error:`, lastErrorMsg);
          break; 
        }

        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
          // Check if it was blocked
          const reason = data?.promptFeedback?.blockReason || 'Empty response';
          console.warn(`[Gemini] ${label} blocked/empty:`, reason);
          lastErrorMsg = `Response blocked: ${reason}`;
          break;
        }

        console.log(`[Gemini] Success!`);
        return parseJSON(text);

      } catch (err) {
        lastErrorMsg = err.message;
        console.error(`[Gemini] ${label} exception:`, err.message);
        if (err.message?.includes('rate limit') || err.message?.includes('429')) {
          hitRateLimit = true;
          await wait(attempt * 2500);
          continue;
        }
        break;
      }
    }
  }

  if (hitRateLimit) {
    throw new Error(`AI is overloaded (Rate Limit). Last error: ${lastErrorMsg}. Please wait 20 seconds and try again. This usually happens when the free quota is temporarily exhausted.`);
  }
  
  throw new Error(`Could not generate plan. (${lastErrorMsg || 'All models failed'})`);
};



export const generateChatResponse = async (userMessage, userProfile) => {
  const msg = (userMessage || '').toLowerCase().trim();
  const firstName = userProfile?.name ? userProfile.name.split(' ')[0] : 'Athlete';
  
  // Local Intent Detection (Smart Fallbacks)
  if (msg === 'hi' || msg === 'hello' || msg === 'hey' || msg.includes('hello') || msg.includes('hey')) {
    return `Hello ${firstName}! I'm ForgeBot, your AI fitness coach. How can I help you crush your goals today?`;
  }

  if (msg === 'hi' || msg.includes('hi ')) {
     return `Hello ${firstName}! I'm ForgeBot, your AI fitness coach. How can I help you crush your goals today?`;
  }
  
  if (msg.includes('kohomada') || msg.includes('how are you') || msg.includes('how r u')) {
    return `I'm doing great and ready to help you get stronger, ${firstName}! How are you feeling today?`;
  }
  
  if (msg.includes('tired') || msg.includes('exhausted') || msg.includes('no energy')) {
    return `I hear you, ${firstName}. But remember: the hardest part is showing up! Give me 10 minutes of effort, and if you still feel gassed, we'll pivot. You've got this!`;
  }

  if (msg.includes('thanks') || msg.includes('thank you') || msg.includes('sthuthi')) {
    return `You're welcome, ${firstName}! Now let's get back to work!`;
  }

  const FALLBACKS = [
    "Keep pushing, Athlete! Consistency is the only secret to success.",
    "The iron never lies. Stay focused and hit your goals today!",
    "No pain, no gain! ForgeX is where legends are made.",
    "Your future self will thank you for today's effort. Don't quit!",
    "Success starts with discipline. Get back to the grind!"
  ];

  if (!API_KEY || API_KEY === 'undefined') {
    return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  }

  const body = {
    contents: [{ role: 'user', parts: [{ text: `You are ForgeBot, a high-performance AI fitness coach. 
      Tone: motivating, professional, intense.
      User: ${firstName}
      Message: ${userMessage}` }] }],
    generationConfig: { temperature: 0.8, maxOutputTokens: 200 },
  };

  const shuffledEndpoints = [...ENDPOINTS].sort(() => Math.random() - 0.5);

  for (const { url, label } of shuffledEndpoints) {
    try {
      const res = await fetch(`${url}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      console.warn(`[Gemini Chat] ${label} failed`, err);
    }
  }
  
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
};
