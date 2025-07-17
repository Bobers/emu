'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
// Remove direct database import
import { Strategy } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, Loader2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function StrategyList() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadStrategies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadStrategies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/strategies');
      if (!response.ok) throw new Error('Failed to fetch');
      const { strategies } = await response.json();
      setStrategies(strategies);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load strategies',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'complete':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'default';
      case 'complete':
        return 'success';
      case 'error':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (strategies.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground mb-4">
            No strategies yet. Create your first one!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {strategies.map((strategy) => (
        <Card key={strategy.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="line-clamp-1">{strategy.title}</CardTitle>
              <Badge variant={getStatusColor(strategy.status)}>
                <span className="flex items-center gap-1">
                  {getStatusIcon(strategy.status)}
                  {strategy.status}
                </span>
              </Badge>
            </div>
            <CardDescription>
              Created {formatDate(strategy.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {strategy.prdContent.substring(0, 150)}...
            </p>
            <div className="flex gap-2">
              {strategy.status === 'complete' && (
                <Link href={`/dashboard/strategies/${strategy.id}`} className="flex-1">
                  <Button variant="default" className="w-full" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Strategy
                  </Button>
                </Link>
              )}
              {strategy.status === 'processing' && (
                <Button variant="secondary" className="flex-1" size="sm" disabled>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </Button>
              )}
              {strategy.status === 'error' && (
                <Button variant="destructive" className="flex-1" size="sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  View Error
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}