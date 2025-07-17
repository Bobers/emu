export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface PRDAnalysis {
  productType: string;
  targetAudience: string;
  complexity: 'Low' | 'Medium' | 'High';
  constraints: string[];
  positioning: string;
  keyFeatures: string[];
  businessModel: string;
}

export interface ChannelRecommendation {
  channel: string;
  fitScore: number;
  rationale: string;
  resources: {
    budget: number;
    timeWeeks: number;
    expertise: 'Low' | 'Medium' | 'High';
  };
  probability: 'Low' | 'Medium' | 'High';
  tactics: string[];
}

export interface Strategy {
  id: string;
  userId: string;
  title: string;
  prdContent: string;
  analysis: PRDAnalysis | null;
  channels: ChannelRecommendation[] | null;
  strategy: any | null;
  status: 'processing' | 'complete' | 'error';
  createdAt: string;
  updatedAt: string;
}

export interface CreateStrategyData {
  title: string;
  prdContent: string;
  userId: string;
}