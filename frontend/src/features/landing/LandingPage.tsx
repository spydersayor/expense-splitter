import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { useTheme } from '../../hooks/useTheme';
import { 
  IndianRupee, 
  Users, 
  PieChart, 
  Zap, 
  Shield, 
  Smartphone,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Group Management',
      description: 'Create and manage multiple groups for different occasions - trips, roommates, or events.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <PieChart className="h-8 w-8" />,
      title: 'Smart Splitting',
      description: 'Automatically calculate who owes what with intelligent expense tracking and fair splits.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Real-time Updates',
      description: 'See changes instantly as group members add expenses and settle balances.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and protected with industry-standard security.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Mobile Friendly',
      description: 'Access your expenses anywhere with our responsive design that works on all devices.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Expense Analytics',
      description: 'Track spending patterns and visualize where your money goes with detailed insights.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const benefits = [
    'Split bills fairly and transparently',
    'Track shared expenses in real-time',
    'Settle debts with one click',
    'Export expense reports anytime',
    'No hidden fees or charges'
  ];

  return (
    <div className="min-h-screen">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="shadow-lg"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Animated background with geometric patterns */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dark architectural image overlay on left */}
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-red-950/30 via-red-900/20 to-transparent">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIyMCwzOCw1MCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
          </div>
          
          {/* Blue gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
          
          {/* Animated diagonal lines - blue theme */}
          <div className="absolute top-0 right-0 w-1/2 h-full">
            <div className="absolute top-1/4 right-0 w-0.5 h-64 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-30 animate-slide-down"></div>
            <div className="absolute top-1/3 right-20 w-0.5 h-48 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-30 animate-slide-down" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-10 w-0.5 h-56 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-30 animate-slide-down" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-2/3 right-32 w-0.5 h-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-30 animate-slide-down" style={{animationDelay: '3s'}}></div>
          </div>
          
          {/* Geometric angular shapes */}
          <div className="absolute top-20 right-40 w-32 h-32 border border-blue-500/20 rotate-45"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 border border-cyan-500/20 rotate-12"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-up">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                {/* Pulsing ring */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl animate-pulse-ring"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-400 p-6 rounded-3xl shadow-2xl shadow-blue-500/20 animate-float group-hover:scale-110 transition-transform duration-500">
                  <IndianRupee className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="inline-block bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 dark:from-cyan-400 dark:via-blue-400 dark:to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                Split Expenses
              </span>
              <br />
              <span className="inline-block text-gray-900 dark:text-white animate-fade-in" style={{animationDelay: '0.3s'}}>
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{animationDelay: '0.5s'}}>
              Track shared expenses, split bills fairly, and settle up with friends and roommates. 
              The easiest way to manage group finances.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-scale-in" style={{animationDelay: '0.7s'}}>
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-4 shadow-2xl shadow-blue-500/30 group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500">
                  <span className="relative z-10 flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4 group bg-white/10 hover:bg-white/20 border-white/20 text-white">
                  <span className="flex items-center">
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Benefits badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full border border-gray-300 dark:border-white/20">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-cyan-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">100% Free</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full border border-gray-300 dark:border-white/20">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-cyan-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full border border-gray-300 dark:border-white/20">
                <Sparkles className="h-5 w-5 text-yellow-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Instant Setup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make splitting expenses effortless and transparent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:scale-105 hover:-translate-y-2 cursor-pointer animate-slide-up relative overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardBody className="p-8 relative">
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-cyan-400 dark:group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { step: '1', title: 'Create a Group', description: 'Invite friends, roommates, or travel companions to join your expense group.' },
              { step: '2', title: 'Add Expenses', description: 'Log shared costs as they happen. Everyone in the group can see and add expenses.' },
              { step: '3', title: 'Settle Up', description: 'See who owes what at a glance and settle balances with a single tap.' }
            ].map((item, index) => (
              <div key={index} className="text-center animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white text-3xl font-bold mb-6 shadow-2xl shadow-blue-500/30">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Why Choose Expense Splitter?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join thousands of users who trust us to manage their shared expenses fairly and transparently.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <Users className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold animate-pulse-slow">10K+</div>
                      <div className="text-white/80">Active Users</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <IndianRupee className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold animate-pulse-slow" style={{animationDelay: '0.5s'}}>$1M+</div>
                      <div className="text-white/80">Expenses Tracked</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <TrendingUp className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold animate-pulse-slow" style={{animationDelay: '1s'}}>99.9%</div>
                      <div className="text-white/80">Uptime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up relative">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              Ready to Simplify Your Expenses?
            </span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Join thousands of users who have already simplified their group finances
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg px-12 py-4 shadow-2xl shadow-blue-500/30 group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500">
              <span className="relative z-10 flex items-center">
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            No credit card required • Free forever
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-slate-950 border-t border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-xl shadow-lg shadow-blue-500/30">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                {import.meta.env.VITE_APP_NAME || 'Expense Splitter'}
              </span>
            </div>
            <div className="text-center md:text-right">
              <p>&copy; 2024 Expense Splitter. All rights reserved.</p>
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-500">Made with ❤️ for better financial management</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
