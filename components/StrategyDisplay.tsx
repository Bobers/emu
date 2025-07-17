'use client';

import { Strategy } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Clock, DollarSign, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StrategyDisplayProps {
  strategy: Strategy;
}

export function StrategyDisplay({ strategy }: StrategyDisplayProps) {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: `${label} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const generateMarkdown = () => {
    let markdown = `# ${strategy.title}\n\n`;
    markdown += `Generated on: ${new Date(strategy.createdAt).toLocaleDateString()}\n\n`;

    if (strategy.analysis) {
      markdown += `## Product Analysis\n\n`;
      markdown += `**Product Type:** ${strategy.analysis.productType}\n`;
      markdown += `**Target Audience:** ${strategy.analysis.targetAudience}\n`;
      markdown += `**Complexity:** ${strategy.analysis.complexity}\n`;
      markdown += `**Positioning:** ${strategy.analysis.positioning}\n`;
      markdown += `**Business Model:** ${strategy.analysis.businessModel}\n\n`;
      
      markdown += `### Key Features\n`;
      strategy.analysis.keyFeatures.forEach(feature => {
        markdown += `- ${feature}\n`;
      });
      
      markdown += `\n### Constraints\n`;
      strategy.analysis.constraints.forEach(constraint => {
        markdown += `- ${constraint}\n`;
      });
    }

    if (strategy.channels) {
      markdown += `\n\n## Recommended Channels\n\n`;
      strategy.channels.forEach((channel, index) => {
        markdown += `### ${index + 1}. ${channel.channel} (${channel.fitScore}% fit)\n`;
        markdown += `**Rationale:** ${channel.rationale}\n`;
        markdown += `**Probability of Success:** ${channel.probability}\n`;
        markdown += `**Resources Required:**\n`;
        markdown += `- Budget: $${channel.resources.budget.toLocaleString()}/month\n`;
        markdown += `- Time to Results: ${channel.resources.timeWeeks} weeks\n`;
        markdown += `- Expertise Level: ${channel.resources.expertise}\n`;
        markdown += `**Key Tactics:**\n`;
        channel.tactics.forEach(tactic => {
          markdown += `- ${tactic}\n`;
        });
        markdown += '\n';
      });
    }

    if (strategy.strategy) {
      markdown += `\n## Go-to-Market Strategy\n\n`;
      markdown += `### Executive Summary\n${strategy.strategy.executiveSummary}\n\n`;
      
      if (strategy.strategy.sixMonthPlan) {
        markdown += `### 6-Month Implementation Plan\n\n`;
        Object.entries(strategy.strategy.sixMonthPlan).forEach(([month, plan]) => {
          const monthPlan = plan as { goals?: string[]; activities?: string[]; metrics?: string[] };
          markdown += `#### ${month.charAt(0).toUpperCase() + month.slice(1)}\n`;
          markdown += `**Goals:**\n`;
          monthPlan.goals?.forEach((goal: string) => markdown += `- ${goal}\n`);
          markdown += `**Activities:**\n`;
          monthPlan.activities?.forEach((activity: string) => markdown += `- ${activity}\n`);
          markdown += `**Metrics:**\n`;
          monthPlan.metrics?.forEach((metric: string) => markdown += `- ${metric}\n`);
          markdown += '\n';
        });
      }
    }

    return markdown;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{strategy.title}</h2>
          <p className="text-muted-foreground">
            Created {new Date(strategy.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(generateMarkdown(), 'Strategy')}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      </div>

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-4">
          {strategy.analysis && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Product Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Product Type</h4>
                    <p>{strategy.analysis.productType}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Complexity</h4>
                    <Badge variant={
                      strategy.analysis.complexity === 'Low' ? 'success' :
                      strategy.analysis.complexity === 'Medium' ? 'secondary' : 'destructive'
                    }>
                      {strategy.analysis.complexity}
                    </Badge>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-2">Target Audience</h4>
                    <p>{strategy.analysis.targetAudience}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-2">Market Positioning</h4>
                    <p>{strategy.analysis.positioning}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-2">Business Model</h4>
                    <p>{strategy.analysis.businessModel}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1">
                      {strategy.analysis.keyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Constraints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1">
                      {strategy.analysis.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          {strategy.channels && strategy.channels.map((channel, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{channel.channel}</CardTitle>
                    <CardDescription>{channel.rationale}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {channel.fitScore}% fit
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="font-semibold">${channel.resources.budget.toLocaleString()}/mo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time to Results</p>
                      <p className="font-semibold">{channel.resources.timeWeeks} weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Success Probability</p>
                      <Badge variant={
                        channel.probability === 'High' ? 'success' :
                        channel.probability === 'Medium' ? 'secondary' : 'destructive'
                      }>
                        {channel.probability}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Key Tactics</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {channel.tactics.map((tactic, tacticIndex) => (
                      <li key={tacticIndex}>{tactic}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          {strategy.strategy && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{strategy.strategy.executiveSummary}</p>
                </CardContent>
              </Card>

              {strategy.strategy.budgetAllocation && (
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Allocation</CardTitle>
                    <CardDescription>
                      Total Budget: ${strategy.strategy.budgetAllocation.total.toLocaleString()}/month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.values(strategy.strategy.budgetAllocation.breakdown).map((item, index) => {
                        const budgetItem = item as { name: string; amount: number; percentage: number };
                        return (
                        <div key={index} className="flex justify-between items-center">
                          <span>{budgetItem.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">${budgetItem.amount.toLocaleString()}</span>
                            <Badge variant="outline">{budgetItem.percentage}%</Badge>
                          </div>
                        </div>
                      )})}
                    </div>
                  </CardContent>
                </Card>
              )}

              {strategy.strategy.nextSteps && (
                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2">
                      {strategy.strategy.nextSteps.map((step: string, index: number) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}