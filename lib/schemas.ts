import { z } from 'zod';

export const PRDAnalysisSchema = z.object({
  productType: z.string().min(3),
  targetAudience: z.string().min(10),
  complexity: z.enum(['Low', 'Medium', 'High']),
  constraints: z.array(z.string()).min(1),
  positioning: z.string().min(20),
  keyFeatures: z.array(z.string()).min(1),
  businessModel: z.string().min(10)
});

export const ChannelRecommendationSchema = z.array(z.object({
  channel: z.string(),
  fitScore: z.number().min(0).max(100),
  rationale: z.string().min(50),
  resources: z.object({
    budget: z.number().min(0),
    timeWeeks: z.number().min(1),
    expertise: z.enum(['Low', 'Medium', 'High'])
  }),
  probability: z.enum(['Low', 'Medium', 'High']),
  tactics: z.array(z.string()).min(2)
}));

export const CreateStrategySchema = z.object({
  title: z.string().min(1).max(255),
  prdContent: z.string().min(100).max(100000), // Allow up to ~60 pages
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});