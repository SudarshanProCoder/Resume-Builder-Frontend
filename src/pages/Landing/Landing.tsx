import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSun,
  FiMoon,
  FiFileText,
  FiDownload,
  FiEdit,
  FiZap,
  FiCheck,
  FiArrowRight
} from 'react-icons/fi';

const Landing = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage?.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      window.localStorage?.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage?.setItem('theme', 'light');
    }
  };

  const features = [
    {
      icon: <FiEdit className="w-8 h-8" />,
      title: 'Easy to Use',
      description: 'Intuitive interface that makes resume building simple.'
    },
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: 'Professional Templates',
      description: 'Choose from ATS-friendly templates crafted by experts.'
    },
    {
      icon: <FiDownload className="w-8 h-8" />,
      title: 'Export Anywhere',
      description: 'Download in PDF, DOCX, or share with a custom link.'
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: 'AI-Powered',
      description: 'Smart suggestions and optimization with AI.'
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Modern Pro',
      color: 'from-blue-600 to-indigo-600',
      images: '/Images/Resume/resume_template1.svg'
    },
    {
      id: 2,
      name: 'Classic Elite',
      color: 'from-indigo-500 to-blue-600',
      images: '/Images/Resume/resume_template1.svg'
    },
    {
      id: 3,
      name: 'Creative Edge',
      color: 'from-blue-500 to-purple-600',
      images: '/Images/Resume/resume_template1.svg'
    },
    {
      id: 4,
      name: 'Minimal Clean',
      color: 'from-gray-600 to-gray-800',
      images: '/Images/Resume/resume_template1.svg'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      features: ['1 Resume', 'Basic Templates', 'PDF Export', 'Email Support'],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '₹199',
      period: '/month',
      features: [
        'Unlimited Resumes',
        'All Premium Templates',
        'PDF & DOCX Export',
        'AI Content Writer',
        'Priority Support',
        'Custom Domain'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₹3999',
      period: '/month',
      features: [
        'Everything in Pro',
        'Team Collaboration',
        'Custom Branding',
        'API Access',
        'Dedicated Manager',
        'SLA Support'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'dark bg-[#0D1117]' : 'bg-[#F5F7FA]'
      }`}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#161B22]/70 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FiFileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? (
                  <FiSun className="w-5 h-5 text-yellow-300" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
              >
                Login
              </button>

              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass shadow-xl">
            <FiZap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI-Powered Resume Builder
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
              Build Your Dream Resume
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              In Minutes, Not Hours
            </span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
            Create ATS-friendly, professional resumes with AI-powered
            optimization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2"
            >
              <span>Start Building Free</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-8 py-4 glass text-gray-900 dark:text-gray-300 rounded-xl font-semibold hover:shadow-xl hover:scale-105">
              View Templates
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-16">
            Why Choose ResumeAI?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group glass rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-white">{feature.icon}</div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-[#161B22]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-16">
            Beautiful Templates
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template) => (
              <div key={template.id} className="group cursor-pointer">
                <div className="glass rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all">
                  <div
                    className={`h-64 bg-gradient-to-br ${template.color} rounded-xl 
              flex items-center justify-center group-hover:scale-105 transition-transform mb-4`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={template.images}
                        alt={template.name}
                        className="max-w-[80%] max-h-[80%] object-contain opacity-80"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all">
              View All Templates
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-8 transition-all hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl scale-105'
                  : 'glass'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-yellow-400 text-gray-900 text-sm font-bold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <h3
                className={`text-2xl font-bold mb-2 ${
                  plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}
              >
                {plan.name}
              </h3>

              <div className="flex items-baseline justify-center mb-8">
                <span
                  className={`text-5xl font-bold ${
                    plan.popular
                      ? 'text-white'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`ml-2 ${
                    plan.popular
                      ? 'text-white/80'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center space-x-3">
                    <FiCheck
                      className={`w-5 h-5 flex-shrink-0 ${
                        plan.popular
                          ? 'text-white'
                          : 'text-blue-600 dark:text-indigo-400'
                      }`}
                    />
                    <span
                      className={
                        plan.popular
                          ? 'text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('/register')}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="backdrop-blur-md bg-white/70 dark:bg-[#161B22]/70 border-t border-gray-200 dark:border-gray-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <FiFileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ResumeAI
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Build professional resumes that get you hired faster.
              </p>
            </div>

            {['Product', 'Company', 'Support'].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                  {section}
                </h4>

                <ul className="space-y-2">
                  {['Link 1', 'Link 2', 'Link 3', 'Link 4'].map(
                    (link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href="#"
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-indigo-400 text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 ResumeAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
