
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, Home, Plus, Users, Settings, Menu, X, Moon, Sun, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { speak, pause, resume, stop, isSpeaking, isPaused, isSupported } = useTextToSpeech();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/create-agent', label: 'Create Agent', icon: Plus },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleReadPage = () => {
    const content = document.body.innerText;
    speak(content);
  };

  const handleSpeechControl = () => {
    if (!isSpeaking) {
      handleReadPage();
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AgentCore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-colors text-sm lg:text-base ${
                  isActive(path)
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {/* Text-to-Speech Controls */}
            {isSupported && (
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSpeechControl}
                  className="hidden lg:flex"
                >
                  {!isSpeaking ? (
                    <Volume2 className="w-4 h-4 mr-2" />
                  ) : isPaused ? (
                    <Play className="w-4 h-4 mr-2" />
                  ) : (
                    <Pause className="w-4 h-4 mr-2" />
                  )}
                  <span className="hidden xl:inline">
                    {!isSpeaking ? 'Read Page' : isPaused ? 'Resume' : 'Pause'}
                  </span>
                </Button>
                {isSpeaking && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={stop}
                    className="hidden lg:flex"
                  >
                    <VolumeX className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}

            <Button variant="outline" size="sm" className="hidden lg:flex">
              <Users className="w-4 h-4 mr-2" />
              <span className="hidden xl:inline">Teams</span>
            </Button>

            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    isActive(path)
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              
              <div className="flex flex-col gap-2 px-4 pt-2">
                {/* Mobile Text-to-Speech */}
                {isSupported && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSpeechControl}
                      className="flex-1"
                    >
                      {!isSpeaking ? (
                        <Volume2 className="w-4 h-4 mr-2" />
                      ) : isPaused ? (
                        <Play className="w-4 h-4 mr-2" />
                      ) : (
                        <Pause className="w-4 h-4 mr-2" />
                      )}
                      {!isSpeaking ? 'Read Page' : isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    {isSpeaking && (
                      <Button variant="outline" size="sm" onClick={stop}>
                        <VolumeX className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="w-4 h-4 mr-2" />
                    Teams
                  </Button>
                  
                  {/* Mobile Theme Toggle */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
