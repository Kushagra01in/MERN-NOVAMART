import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Zap, Flame, ShieldCheck } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Great Indian Shopping Carnival',
    subtitle: 'Up to 60% OFF on Flagship Smartphones, M3 Laptops, 4K Smart TVs & Premium Audio',
    tag: 'FESTIVE MEGA DEALS',
    buttonText: 'Explore Electronics Deals',
    link: '/products?category=Electronics',
    bgGradient: 'from-brand-900 via-indigo-950 to-slate-950',
    accentColor: 'from-amber-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    extraBadge: 'Instant 10% Bank Discount on HDFC & SBI Cards'
  },
  {
    id: 2,
    title: 'Festive Fashion & Styles from ₹499',
    subtitle: 'Top Indian & Global Brands in Footwear, Denim, Designer Sunglasses & Apparel',
    tag: 'TRENDING COLLECTIONS',
    buttonText: 'Shop Fashion Fest',
    link: '/products?category=Fashion',
    bgGradient: 'from-rose-950 via-purple-950 to-slate-950',
    accentColor: 'from-rose-400 to-pink-500',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
    extraBadge: 'Flat 50-80% OFF + Assured Easy Exchanges'
  },
  {
    id: 3,
    title: 'Smart Home & Kitchen Makeover',
    subtitle: 'High-Performance Air Fryers, Multi-Cookers, Espresso Machines & Ergonomic Chairs',
    tag: 'UP TO 50% SAVINGS',
    buttonText: 'Upgrade Your Home',
    link: '/products?category=Home+%26+Kitchen',
    bgGradient: 'from-amber-950 via-slate-900 to-zinc-950',
    accentColor: 'from-amber-400 to-yellow-500',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    extraBadge: 'Free Installation & Next-Day Delivery'
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? slides.length - 1 : prev - 1));
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[360px] sm:h-[430px] lg:h-[500px] overflow-hidden select-none bg-slate-950">
      
      {/* Slide Item */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} transition-all duration-700 ease-in-out flex items-center`}
      >
        {/* Background Image Blend */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4 max-w-2xl text-white">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1 bg-gradient-to-r ${slide.accentColor} text-slate-950 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-md`}>
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                {slide.tag}
              </span>
              <span className="bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                {slide.extraBadge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
              {slide.title}
            </h1>

            <p className="text-xs sm:text-sm text-gray-200 drop-shadow max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to={slide.link}
                className={`inline-block bg-gradient-to-r ${slide.accentColor} hover:brightness-110 text-slate-950 font-black px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 text-xs sm:text-sm`}
              >
                {slide.buttonText}
              </Link>
              <div className="flex items-center gap-2 text-xs text-gray-300 font-semibold bg-black/30 px-3 py-2 rounded-xl backdrop-blur-xs">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Zero Cost EMI + UPI Cashback</span>
              </div>
            </div>

          </div>

          {/* Right Product Card Spotlight */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 transform rotate-2 hover:rotate-0 transition duration-500 bg-white/5 backdrop-blur-md p-3">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition border border-white/10"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition border border-white/10"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none z-10" />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroBanner;