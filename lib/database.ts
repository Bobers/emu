import { createServerSupabaseClient } from './supabase-server';
import { createClient } from './supabase';
import { Strategy, CreateStrategyData } from '@/types';

// Server-side database operations
export async function createStrategy(data: CreateStrategyData): Promise<Strategy> {
  const supabase = await createServerSupabaseClient();
  
  const { data: strategy, error } = await supabase
    .from('strategies')
    .insert({
      user_id: data.userId,
      title: data.title,
      prd_content: data.prdContent,
      status: 'processing'
    })
    .select()
    .single();

  if (error || !strategy) {
    throw new Error(error?.message || 'Failed to create strategy');
  }

  return {
    id: strategy.id,
    userId: strategy.user_id,
    title: strategy.title,
    prdContent: strategy.prd_content,
    analysis: strategy.analysis,
    channels: strategy.channels,
    strategy: strategy.strategy,
    status: strategy.status,
    createdAt: strategy.created_at,
    updatedAt: strategy.updated_at
  };
}

export async function getStrategy(id: string, userId: string): Promise<Strategy | null> {
  const supabase = await createServerSupabaseClient();
  
  const { data: strategy, error } = await supabase
    .from('strategies')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error || !strategy) {
    return null;
  }

  return {
    id: strategy.id,
    userId: strategy.user_id,
    title: strategy.title,
    prdContent: strategy.prd_content,
    analysis: strategy.analysis,
    channels: strategy.channels,
    strategy: strategy.strategy,
    status: strategy.status,
    createdAt: strategy.created_at,
    updatedAt: strategy.updated_at
  };
}

export async function getUserStrategies(userId: string): Promise<Strategy[]> {
  const supabase = await createServerSupabaseClient();
  
  const { data: strategies, error } = await supabase
    .from('strategies')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (strategies || []).map(s => ({
    id: s.id,
    userId: s.user_id,
    title: s.title,
    prdContent: s.prd_content,
    analysis: s.analysis,
    channels: s.channels,
    strategy: s.strategy,
    status: s.status,
    createdAt: s.created_at,
    updatedAt: s.updated_at
  }));
}

export async function updateStrategy(id: string, updates: Partial<Strategy>): Promise<Strategy> {
  const supabase = await createServerSupabaseClient();
  
  const updateData: Record<string, unknown> = {};
  
  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.prdContent !== undefined) updateData.prd_content = updates.prdContent;
  if (updates.analysis !== undefined) updateData.analysis = updates.analysis;
  if (updates.channels !== undefined) updateData.channels = updates.channels;
  if (updates.strategy !== undefined) updateData.strategy = updates.strategy;
  if (updates.status !== undefined) updateData.status = updates.status;
  
  const { data: strategy, error } = await supabase
    .from('strategies')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error || !strategy) {
    throw new Error(error?.message || 'Failed to update strategy');
  }

  return {
    id: strategy.id,
    userId: strategy.user_id,
    title: strategy.title,
    prdContent: strategy.prd_content,
    analysis: strategy.analysis,
    channels: strategy.channels,
    strategy: strategy.strategy,
    status: strategy.status,
    createdAt: strategy.created_at,
    updatedAt: strategy.updated_at
  };
}

export async function deleteStrategy(id: string, userId: string): Promise<void> {
  const supabase = await createServerSupabaseClient();
  
  const { error } = await supabase
    .from('strategies')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }
}

// Client-side database operations
export async function getClientStrategies(): Promise<Strategy[]> {
  const supabase = createClient();
  
  const { data: strategies, error } = await supabase
    .from('strategies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (strategies || []).map(s => ({
    id: s.id,
    userId: s.user_id,
    title: s.title,
    prdContent: s.prd_content,
    analysis: s.analysis,
    channels: s.channels,
    strategy: s.strategy,
    status: s.status,
    createdAt: s.created_at,
    updatedAt: s.updated_at
  }));
}

export async function getClientStrategy(id: string): Promise<Strategy | null> {
  const supabase = createClient();
  
  const { data: strategy, error } = await supabase
    .from('strategies')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !strategy) {
    return null;
  }

  return {
    id: strategy.id,
    userId: strategy.user_id,
    title: strategy.title,
    prdContent: strategy.prd_content,
    analysis: strategy.analysis,
    channels: strategy.channels,
    strategy: strategy.strategy,
    status: strategy.status,
    createdAt: strategy.created_at,
    updatedAt: strategy.updated_at
  };
}