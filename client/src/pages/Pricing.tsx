import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Pricing() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const { data: products, isLoading } = trpc.payments.getProducts.useQuery({
    type: "all",
  });

  const createCheckoutMutation = trpc.payments.createCheckoutSession.useMutation();

  const handleCheckout = async (productId: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to purchase");
      return;
    }

    setLoading(productId);
    try {
      const result = await createCheckoutMutation.mutateAsync({
        productId,
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/pricing`,
      });

      // Open checkout in new tab
      window.open(result.checkoutUrl, "_blank");
      toast.success("Redirecting to checkout...");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to create checkout session");
    } finally {
      setLoading(null);
    }
  };

  const subscriptionProducts = products?.filter((p) => p.type === "recurring") || [];
  const oneTimeProducts = products?.filter((p) => p.type === "one_time") || [];

  return (
    <div className="min-h-screen gradient-dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              ← Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gradient">Pricing Plans</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container py-20">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl font-bold text-gradient">Choose Your Path</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock unlimited readings and premium features with our flexible pricing plans
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Subscription Plans */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold mb-8 text-center">Subscription Plans</h3>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {subscriptionProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`card-mystical p-8 space-y-6 flex flex-col ${
                      product.name === "Premium Plan" ? "ring-2 ring-secondary" : ""
                    }`}
                  >
                    {product.name === "Premium Plan" && (
                      <div className="text-center">
                        <span className="text-xs font-bold text-secondary bg-secondary/20 px-3 py-1 rounded-full">
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xl font-bold mb-2">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>

                    <div>
                      <div className="text-3xl font-bold text-gradient">
                        {product.monthlyPrice}
                        <span className="text-sm text-muted-foreground">/month</span>
                      </div>
                      {product.interval === "year" && (
                        <p className="text-xs text-secondary mt-1">Save 20% with annual billing</p>
                      )}
                    </div>

                    <ul className="space-y-3 flex-grow">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleCheckout(product.id)}
                      disabled={loading === product.id}
                      className={
                        product.name === "Premium Plan" ? "btn-gold w-full" : "btn-mystical w-full"
                      }
                    >
                      {loading === product.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Get Started"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* One-Time Purchases */}
            {oneTimeProducts.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-8 text-center">One-Time Readings</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {oneTimeProducts.map((product) => (
                    <div key={product.id} className="card-mystical p-6 space-y-4 flex flex-col">
                      <div>
                        <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>

                      <div>
                        <div className="text-2xl font-bold text-gradient">{product.displayPrice}</div>
                      </div>

                      <ul className="space-y-2 flex-grow">
                        {product.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-xs">
                            <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => handleCheckout(product.id)}
                        disabled={loading === product.id}
                        className="btn-mystical w-full"
                      >
                        {loading === product.id ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Purchase"
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* FAQ Section */}
        <div className="mt-20 space-y-8">
          <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-mystical p-6 space-y-3">
              <h4 className="font-bold">Can I change my plan?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your subscription at any time. Changes take effect on your next billing cycle.
              </p>
            </div>

            <div className="card-mystical p-6 space-y-3">
              <h4 className="font-bold">Is there a free trial?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! Get 3 free readings with your account. Upgrade anytime to unlock unlimited readings.
              </p>
            </div>

            <div className="card-mystical p-6 space-y-3">
              <h4 className="font-bold">What payment methods do you accept?</h4>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, Apple Pay, Google Pay, and other payment methods through Stripe.
              </p>
            </div>

            <div className="card-mystical p-6 space-y-3">
              <h4 className="font-bold">Can I cancel anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Absolutely! Cancel your subscription anytime with no penalties. You'll keep access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
