import { analyzeWithAI } from './openai';
import { prdAnalysisPrompt, channelRecommendationPrompt, strategyGenerationPrompt } from './prompts';
import { PRDAnalysisSchema, ChannelRecommendationSchema } from './schemas';
import { Strategy } from '@/types';
import { createServerSupabaseClient } from './supabase-server';

export async function processStrategy(
  prd: string, 
  title: string,
  userId: string
): Promise<Strategy> {
  const supabase = await createServerSupabaseClient();
  
  // Create initial strategy record
  const { data: strategy, error: createError } = await supabase
    .from('strategies')
    .insert({
      user_id: userId,
      title,
      prd_content: prd,
      status: 'processing'
    })
    .select()
    .single();

  if (createError || !strategy) {
    throw new Error('Failed to create strategy');
  }

  try {
    // Stage 1: PRD Analysis
    console.log('Stage 1: Analyzing PRD...');
    const analysisResponse = await analyzeWithAI(
      prdAnalysisPrompt(prd),
      'You are a senior marketing strategist. Analyze the PRD and return only valid JSON.'
    );
    
    const analysis = JSON.parse(analysisResponse);
    const validatedAnalysis = PRDAnalysisSchema.parse(analysis);
    
    // Update with analysis
    await supabase
      .from('strategies')
      .update({ analysis: validatedAnalysis })
      .eq('id', strategy.id);

    // Stage 2: Channel Recommendations
    console.log('Stage 2: Generating channel recommendations...');
    const channelsResponse = await analyzeWithAI(
      channelRecommendationPrompt(validatedAnalysis),
      'You are a marketing channel expert. Return only a JSON array of channel recommendations.'
    );
    
    const channels = JSON.parse(channelsResponse);
    const validatedChannels = ChannelRecommendationSchema.parse(channels);
    
    // Update with channels
    await supabase
      .from('strategies')
      .update({ channels: validatedChannels })
      .eq('id', strategy.id);

    // Stage 3: Strategy Generation
    console.log('Stage 3: Generating comprehensive strategy...');
    const strategyResponse = await analyzeWithAI(
      strategyGenerationPrompt(validatedAnalysis, validatedChannels),
      'You are a go-to-market strategy expert. Return only a JSON object with the complete strategy.'
    );
    
    const fullStrategy = JSON.parse(strategyResponse);
    
    // Final update
    const { data: finalStrategy, error: updateError } = await supabase
      .from('strategies')
      .update({ 
        strategy: fullStrategy,
        status: 'complete'
      })
      .eq('id', strategy.id)
      .select()
      .single();

    if (updateError || !finalStrategy) {
      throw new Error('Failed to update strategy');
    }

    return {
      id: finalStrategy.id,
      userId: finalStrategy.user_id,
      title: finalStrategy.title,
      prdContent: finalStrategy.prd_content,
      analysis: finalStrategy.analysis,
      channels: finalStrategy.channels,
      strategy: finalStrategy.strategy,
      status: finalStrategy.status,
      createdAt: finalStrategy.created_at,
      updatedAt: finalStrategy.updated_at
    };

  } catch (error) {
    // Update status to error
    await supabase
      .from('strategies')
      .update({ status: 'error' })
      .eq('id', strategy.id);
    
    throw error;
  }
}