import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Get base path from environment or Vite config
const BASE_PATH = import.meta.env.BASE_URL || "/";

function Router() {
  const [location] = useLocation();
  
  // Handle root path and GitHub Pages subpath
  const isHome = location === "/" || location === BASE_PATH || location === BASE_PATH.replace(/\/$/, "");
  
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={BASE_PATH} component={Home} />
      <Route path={BASE_PATH.replace(/\/$/, "")} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={isHome ? Home : NotFound} />
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
        defaultTheme="light"
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
