import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStrategy } from '@/lib/database';
import { getServerUser } from '@/lib/auth-server';
import { StrategyDisplay } from '@/components/StrategyDisplay';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function StrategyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getServerUser();
  
  if (!user) {
    notFound();
  }

  const strategy = await getStrategy(id, user.id);
  
  if (!strategy) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <StrategyDisplay strategy={strategy} />
    </div>
  );
}