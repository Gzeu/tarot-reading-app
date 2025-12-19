import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Sparkles } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen gradient-dark flex items-center justify-center">
      <div className="card-mystical p-12 max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-20 w-20 text-primary glow-gold" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your premium features are now active.
          </p>
        </div>

        <div className="bg-card/50 p-6 rounded-lg space-y-2">
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your registered email address.
          </p>
          <p className="text-sm text-muted-foreground">
            You can now access all premium readings and features.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <Link href="/dashboard">
            <Button className="btn-mystical w-full">
              <Sparkles className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>

          <Link href="/reading/daily">
            <Button variant="outline" className="w-full">
              Start a Reading
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Need help? Contact our support team at support@tarotreading.app
        </p>
      </div>
    </div>
  );
}
