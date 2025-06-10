
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LeaderboardPage from "./pages/LeaderboardPage";
import TablesPage from "./pages/TablesPage";
import TournamentsPage from "./pages/TournamentsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import MatchesPage from "./pages/MatchesPage";
import MatchDetailsPage from "./pages/MatchDetailsPage";
import TournamentDetailsPage from "./pages/TournamentDetailsPage";
import CreateTournamentPage from "./pages/CreateTournamentPage";
import CreateMatchPage from "./pages/CreateMatchPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/tables" element={<TablesPage />} />
                <Route path="/tournaments" element={<TournamentsPage />} />
                <Route path="/tournaments/create" element={<CreateTournamentPage />} />
                <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
                <Route path="/matches" element={<MatchesPage />} />
                <Route path="/matches/create" element={<CreateMatchPage />} />
                <Route path="/matches/:id" element={<MatchDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
