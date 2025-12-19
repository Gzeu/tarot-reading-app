import { Request, Response } from "express";
import Stripe from "stripe";
import { ENV } from "./env";

const stripe = new Stripe(ENV.stripeSecretKey || "");

/**
 * Stripe Webhook Handler
 * 
 * This handler processes Stripe webhook events.
 * It verifies the webhook signature and processes events like:
 * - checkout.session.completed
 * - invoice.paid
 * - customer.subscription.updated
 * - customer.subscription.deleted
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;

  if (!sig) {
    console.error("[Webhook] Missing stripe-signature header");
    return res.status(400).json({ error: "Missing stripe-signature header" });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      ENV.stripeWebhookSecret || ""
    );
  } catch (err: any) {
    console.error("[Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle test events for development/testing
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({
      verified: true,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("[Webhook] Checkout session completed:", session.id);

        // Extract metadata
        const userId = session.metadata?.user_id;
        const productId = session.metadata?.product_id;
        const customerEmail = session.metadata?.customer_email;

        console.log(`[Webhook] Processing payment for user ${userId}, product ${productId}`);

        // TODO: Update database with payment information
        // - Save stripe_customer_id if new customer
        // - Save stripe_subscription_id if subscription
        // - Record payment in payments table
        // - Grant access to premium features

        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("[Webhook] Invoice paid:", invoice.id);

        // TODO: Handle subscription payment
        // - Update subscription status
        // - Send confirmation email
        // - Log payment

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("[Webhook] Subscription updated:", subscription.id);

        // TODO: Handle subscription updates
        // - Update subscription status in database
        // - Handle plan changes
        // - Handle billing issues

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("[Webhook] Subscription deleted:", subscription.id);

        // TODO: Handle subscription cancellation
        // - Update subscription status
        // - Revoke premium access
        // - Send cancellation confirmation

        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("[Webhook] Payment intent succeeded:", paymentIntent.id);

        // TODO: Handle successful payment
        // - Update payment status
        // - Grant access to purchased items
        // - Send receipt email

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("[Webhook] Payment intent failed:", paymentIntent.id);

        // TODO: Handle failed payment
        // - Update payment status
        // - Send retry notification
        // - Log failure reason

        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    // Return success response
    res.json({ received: true });
  } catch (error: any) {
    console.error("[Webhook] Error processing event:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
