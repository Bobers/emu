import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Get user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's strategies
    const { data: strategies, error } = await supabase
      .from('strategies')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Transform database response to match frontend types
    const transformedStrategies = (strategies || []).map(s => ({
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

    return NextResponse.json({ strategies: transformedStrategies });
    
  } catch (error) {
    console.error('Get strategies error:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch strategies' },
      { status: 500 }
    );
  }
}