'use client';

import { useState } from 'react';
import { PRDUpload } from '@/components/PRDUpload';
import { StrategyList } from '@/components/StrategyList';
import { Button } from '@/components/ui/button';
import { Plus, List } from 'lucide-react';

export default function DashboardPage() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to EMU - Your AI Marketing Strategy Engine
          </p>
        </div>
        <Button
          onClick={() => setShowUpload(!showUpload)}
          variant={showUpload ? "secondary" : "default"}
        >
          {showUpload ? (
            <>
              <List className="h-4 w-4 mr-2" />
              View Strategies
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              New Strategy
            </>
          )}
        </Button>
      </div>
      
      {showUpload ? <PRDUpload /> : <StrategyList />}
    </div>
  );
}