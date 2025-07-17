'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CreateStrategySchema } from '@/lib/schemas';
import { Loader2 } from 'lucide-react';

type FormData = z.infer<typeof CreateStrategySchema>;

export function PRDUpload() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(CreateStrategySchema),
    defaultValues: {
      title: '',
      prdContent: ''
    }
  });

  const prdContent = watch('prdContent');
  const characterCount = prdContent?.length || 0;

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/strategies/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to process strategy');
      }

      toast({
        title: 'Success',
        description: 'Your strategy is being processed. This may take 5-10 minutes.',
      });

      router.push('/dashboard');
      router.refresh();
      
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit PRD',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Your PRD</CardTitle>
        <CardDescription>
          Paste your Product Requirements Document to generate a comprehensive marketing strategy
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Strategy Title
            </label>
            <Input
              id="title"
              placeholder="e.g., Q1 2024 Product Launch Strategy"
              {...register('title')}
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="prdContent" className="text-sm font-medium">
                PRD Content
              </label>
              <span className="text-sm text-muted-foreground">
                {characterCount.toLocaleString()} / 100,000 characters
              </span>
            </div>
            <Textarea
              id="prdContent"
              placeholder="Paste your complete Product Requirements Document here..."
              className="min-h-[400px] font-mono text-sm"
              {...register('prdContent')}
              disabled={isLoading}
            />
            {errors.prdContent && (
              <p className="text-sm text-destructive">{errors.prdContent.message}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Supports PRDs up to ~60 pages (100,000 characters)
            </p>
          </div>
        </CardContent>
        
        <CardContent>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || characterCount < 100}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Strategy...
              </>
            ) : (
              'Generate Marketing Strategy'
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}