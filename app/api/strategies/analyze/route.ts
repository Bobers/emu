import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { processStrategy } from '@/lib/ai-pipeline';
import { CreateStrategySchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
  try {
    // Get user
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validatedData = CreateStrategySchema.parse(body);
    
    // Process strategy in background
    // In production, this should be a queue/job system
    const strategy = await processStrategy(
      validatedData.prdContent,
      validatedData.title,
      user.id
    );
    
    return NextResponse.json({ 
      success: true, 
      strategyId: strategy.id,
      message: 'Strategy processing started. This may take 5-10 minutes.'
    });
    
  } catch (error) {
    console.error('Strategy analysis error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process strategy' },
      { status: 500 }
    );
  }
}