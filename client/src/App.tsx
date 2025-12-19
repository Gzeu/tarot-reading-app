import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import DailyReading from "./pages/reading/Daily";
import Spreads from "./pages/Spreads";
import ThreeCardSpread from "./pages/spreads/ThreeCard";
import LoveReading from "./pages/spreads/LoveReading";
import CareerReading from "./pages/spreads/CareerReading";
import CelticCross from "./pages/spreads/CelticCross";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/payment-success"} component={PaymentSuccess} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/reading/daily"} component={DailyReading} />
      <Route path={"/spreads"} component={Spreads} />
      <Route path={"/spreads/three-card"} component={ThreeCardSpread} />
      <Route path={"/spreads/love-reading"} component={LoveReading} />
      <Route path={"/spreads/career-reading"} component={CareerReading} />
      <Route path={"/spreads/celtic-cross"} component={CelticCross} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
