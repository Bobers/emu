export const prdAnalysisPrompt = (prd: string) => `
You are a senior marketing strategist analyzing a Product Requirements Document using the Traction Framework.

CRITICAL: Respond with ONLY valid JSON matching this exact structure:
{
  "productType": "string (B2B SaaS, B2C App, Developer Tool, etc.)",
  "targetAudience": "string (specific audience description)",
  "complexity": "Low|Medium|High",
  "constraints": ["array", "of", "constraint", "strings"],
  "positioning": "string (market position summary)",
  "keyFeatures": ["array", "of", "main", "features"],
  "businessModel": "string (how the product makes money)"
}

PRD Content:
${prd}

Remember: ONLY return the JSON object above. No additional text, explanations, or markdown formatting.
`;

export const channelRecommendationPrompt = (analysis: Record<string, unknown>) => `
Based on this product analysis, recommend the top 5 marketing channels using the Traction framework.

Product Analysis:
${JSON.stringify(analysis, null, 2)}

Return ONLY a JSON array of exactly 5 channel recommendations:
[
  {
    "channel": "string (channel name)",
    "fitScore": number (0-100),
    "rationale": "string (detailed explanation, min 50 chars)",
    "resources": {
      "budget": number (estimated monthly budget in USD),
      "timeWeeks": number (time to see results),
      "expertise": "Low|Medium|High"
    },
    "probability": "Low|Medium|High",
    "tactics": ["array", "of", "specific", "tactics", "min 2"]
  }
]

Consider these 19 traction channels:
1. Viral Marketing
2. Public Relations (PR)
3. Unconventional PR
4. Search Engine Marketing (SEM)
5. Social & Display Ads
6. Offline Ads
7. Search Engine Optimization (SEO)
8. Content Marketing
9. Email Marketing
10. Engineering as Marketing
11. Target Market Blogs
12. Business Development
13. Sales
14. Affiliate Programs
15. Existing Platforms
16. Trade Shows
17. Offline Events
18. Speaking Engagements
19. Community Building

ONLY return the JSON array. No explanations or additional text.
`;

export const strategyGenerationPrompt = (analysis: Record<string, unknown>, channels: unknown[]) => `
Create a comprehensive go-to-market strategy based on this analysis and channel recommendations.

Product Analysis:
${JSON.stringify(analysis, null, 2)}

Recommended Channels:
${JSON.stringify(channels, null, 2)}

Return a JSON object with this structure:
{
  "executiveSummary": "string (2-3 paragraph summary)",
  "sixMonthPlan": {
    "month1": {
      "goals": ["array", "of", "goals"],
      "activities": ["array", "of", "activities"],
      "metrics": ["array", "of", "KPIs"]
    },
    "month2": { "same structure" },
    "month3": { "same structure" },
    "month4": { "same structure" },
    "month5": { "same structure" },
    "month6": { "same structure" }
  },
  "budgetAllocation": {
    "total": number,
    "breakdown": {
      "channel1": { "name": "string", "amount": number, "percentage": number },
      "channel2": { "same structure" },
      "channel3": { "same structure" },
      "channel4": { "same structure" },
      "channel5": { "same structure" }
    }
  },
  "successMetrics": {
    "primary": ["array", "of", "primary", "KPIs"],
    "secondary": ["array", "of", "secondary", "KPIs"],
    "targets": {
      "month3": { "metric": "value" },
      "month6": { "metric": "value" }
    }
  },
  "risks": [
    {
      "risk": "string",
      "mitigation": "string"
    }
  ],
  "nextSteps": ["array", "of", "immediate", "action", "items"]
}

ONLY return the JSON object. Be specific and actionable.
`;