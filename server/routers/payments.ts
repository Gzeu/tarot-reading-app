import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import Stripe from "stripe";
import { ENV } from "../_core/env";
import { getProductById } from "../products";

const stripe = new Stripe(ENV.stripeSecretKey || "");

export const paymentsRouter = router({
  /**
   * Create a Stripe Checkout Session for one-time purchases or subscriptions
   */
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        successUrl: z.string(),
        cancelUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const product = getProductById(input.productId);
        if (!product) {
          throw new Error("Product not found");
        }

        // Prepare line items
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
          {
            price: product.priceId,
            quantity: 1,
          },
        ];

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
          mode: product.type === "recurring" ? "subscription" : "payment",
          customer_email: ctx.user.email || undefined,
          client_reference_id: ctx.user.id.toString(),
          line_items: lineItems,
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
          allow_promotion_codes: true,
          metadata: {
            user_id: ctx.user.id.toString(),
            customer_email: ctx.user.email || "",
            customer_name: ctx.user.name || "",
            product_id: product.id,
          },
        });

        if (!session.url) {
          throw new Error("Failed to create checkout session");
        }

        return {
          checkoutUrl: session.url,
          sessionId: session.id,
        };
      } catch (error) {
        console.error("Error creating checkout session:", error);
        throw new Error("Failed to create checkout session");
      }
    }),

  /**
   * Get user's payment history
   */
  getPaymentHistory: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        // Get customer ID from database or create new customer
        // This is a placeholder - you'll need to store stripe_customer_id in your database
        const customerId = ctx.user.id.toString(); // Replace with actual Stripe customer ID

        // Fetch payment intents for this customer
        const paymentIntents = await stripe.paymentIntents.list({
          limit: input.limit + 1,
          starting_after: input.offset > 0 ? undefined : undefined,
        });

        return paymentIntents.data.map((intent: Stripe.PaymentIntent) => ({
          id: intent.id,
          amount: intent.amount,
          currency: intent.currency,
          status: intent.status,
          created: new Date(intent.created * 1000),
          description: intent.description,
        }));
      } catch (error) {
        console.error("Error fetching payment history:", error);
        return [];
      }
    }),

  /**
   * Get subscription details
   */
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    try {
      // This is a placeholder - you'll need to store stripe_subscription_id in your database
      // For now, return null if no subscription found
      return null;
    } catch (error) {
      console.error("Error fetching subscription:", error);
      return null;
    }
  }),

  /**
   * Cancel subscription
   */
  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      // This is a placeholder - you'll need to retrieve the actual subscription ID from your database
      // For now, return an error
      throw new Error("No active subscription found");
    } catch (error) {
      console.error("Error canceling subscription:", error);
      throw new Error("Failed to cancel subscription");
    }
  }),

  /**
   * Update payment method
   */
  updatePaymentMethod: protectedProcedure
    .input(
      z.object({
        paymentMethodId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // This is a placeholder - implement based on your subscription management needs
        return {
          success: true,
          message: "Payment method updated successfully",
        };
      } catch (error) {
        console.error("Error updating payment method:", error);
        throw new Error("Failed to update payment method");
      }
    }),

  /**
   * Get available products
   */
  getProducts: publicProcedure
    .input(
      z.object({
        type: z.enum(["one_time", "recurring", "all"]).default("all"),
      })
    )
    .query(async ({ input }) => {
      try {
        const { ONE_TIME_PRODUCTS, SUBSCRIPTION_PRODUCTS, formatPrice } = await import(
          "../products"
        );

        let products = [];
        if (input.type === "one_time") {
          products = ONE_TIME_PRODUCTS;
        } else if (input.type === "recurring") {
          products = SUBSCRIPTION_PRODUCTS;
        } else {
          products = [...ONE_TIME_PRODUCTS, ...SUBSCRIPTION_PRODUCTS];
        }

        return products.map((p) => ({
          ...p,
          displayPrice: formatPrice(p.amount, p.currency),
          monthlyPrice:
            p.interval === "month"
              ? formatPrice(p.amount, p.currency)
              : p.interval === "year"
                ? formatPrice(Math.floor(p.amount / 12), p.currency)
                : undefined,
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    }),
});
