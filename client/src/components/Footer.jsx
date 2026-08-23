import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Globe, ShieldCheck, Truck, RotateCcw, CreditCard, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white text-xs font-sans mt-16 select-none border-t border-white/10">
      
      {/* Back to top smooth scroll */}
      <button
        onClick={scrollToTop}
        className="w-full bg-slate-900 hover:bg-slate-800 py-3.5 text-center text-xs font-black text-gray-300 hover:text-amber-400 transition flex items-center justify-center gap-2 border-b border-white/5"
      >
        <ArrowUp className="w-4 h-4" />
        <span>Back to top</span>
      </button>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        <div>
          <h4 className="font-black text-sm text-white mb-3 tracking-wide">ABOUT NOVAMART</h4>
          <ul className="space-y-2 text-gray-400 font-medium">
            <li><a href="#" className="hover:text-amber-400 transition">About NovaMart India</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Careers at NovaMart</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">NovaMart Wholesale India</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Corporate Information & GST</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-sm text-white mb-3 tracking-wide">HELP & SUPPORT</h4>
          <ul className="space-y-2 text-gray-400 font-medium">
            <li><Link to="/orders" className="hover:text-amber-400 transition">Track Your Shipment</Link></li>
            <li><Link to="/orders" className="hover:text-amber-400 transition">Returns & Replacements</Link></li>
            <li><a href="#" className="hover:text-amber-400 transition">100% Purchase Protection</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Customer Care 24x7</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-sm text-white mb-3 tracking-wide">SELL & PARTNER</h4>
          <ul className="space-y-2 text-gray-400 font-medium">
            <li><a href="#" className="hover:text-amber-400 transition">Sell on NovaMart India</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Become a Logistics Partner</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">NovaMart Affiliate Program</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Advertise Your Products</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-sm text-white mb-3 tracking-wide">PAYMENT & SECURITY</h4>
          <div className="space-y-2.5 text-gray-400 font-medium">
            <p className="text-[11px] leading-relaxed">
              We support all major Indian payment methods:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-black text-slate-950">
              <span className="bg-amber-400 px-2 py-0.5 rounded">UPI</span>
              <span className="bg-purple-200 px-2 py-0.5 rounded">PhonePe</span>
              <span className="bg-blue-200 px-2 py-0.5 rounded">GPay</span>
              <span className="bg-cyan-200 px-2 py-0.5 rounded">Paytm</span>
              <span className="bg-emerald-200 px-2 py-0.5 rounded">RuPay</span>
              <span className="bg-gray-200 px-2 py-0.5 rounded">NetBanking</span>
              <span className="bg-orange-200 px-2 py-0.5 rounded">COD</span>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>256-Bit SSL Encrypted & PCI-DSS Compliant</span>
            </div>
          </div>
        </div>

      </div>

      <hr className="border-white/10" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          <Link to="/" className="font-black text-2xl tracking-tight text-white flex items-center">
            <span>Nova</span>
            <span className="text-amber-400">Mart</span>
            <span className="text-xs text-orange-400 ml-1 font-bold">.in</span>
          </Link>

          <div className="flex items-center gap-1.5 border border-white/20 rounded-xl px-3 py-1 text-gray-300 font-bold">
            <span>🇮🇳 India (English / हिन्दी)</span>
          </div>
        </div>

        <div className="text-[11px] text-gray-400 text-center sm:text-right space-y-1">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-end font-semibold">
            <a href="#" className="hover:text-amber-400">Terms of Use</a>
            <a href="#" className="hover:text-amber-400">Privacy Notice</a>
            <a href="#" className="hover:text-amber-400">GST Compliance</a>
            <a href="#" className="hover:text-amber-400">Grievance Officer</a>
          </div>
          <div>
            © 2026 NovaMart India Retail Pvt. Ltd. Registered in Bengaluru & Mumbai. All rights reserved.
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;