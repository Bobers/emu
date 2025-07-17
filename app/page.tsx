import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <main className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
          EMU - AI Marketing Strategy Engine
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Transform your Product Requirements Document into a comprehensive, 
          actionable marketing strategy powered by AI.
        </p>
        <div className="mb-12 space-y-4">
          <p className="text-lg">
            Upload your PRD and receive:
          </p>
          <ul className="mx-auto max-w-2xl space-y-2 text-left">
            <li className="flex items-start">
              <ArrowRight className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span>In-depth product analysis with market positioning</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span>Data-driven channel recommendations based on the Traction framework</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span>Complete go-to-market strategy with actionable tactics</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/login">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
