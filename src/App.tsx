import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { SplashScreen } from './components/SplashScreen';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AuthForm from './components/AuthForm';

function AppContent() {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = () => setShowSplash(false);
  if (showSplash) return <SplashScreen onComplete={handleSplashComplete} />;
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <AuthForm />;
  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground dark">
      <ChatInterface />
    </div>
  );
}
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
