import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Utensils } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Utensils className="text-yellow-400" size={24} />
              <span className="text-xl font-bold">
                <span className="text-yellow-400">Taste</span>
                <span className="text-white">Bite</span>
              </span>
            </div>
            <p className="mb-4">Bringing the best local flavors right to your doorstep.</p>
            <div className="flex space-x-4">
              <Facebook className="hover:text-yellow-400 cursor-pointer" />
              <Twitter className="hover:text-yellow-400 cursor-pointer" />
              <Instagram className="hover:text-yellow-400 cursor-pointer" />
              <Mail className="hover:text-yellow-400 cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
              <li><Link to="/menu" className="hover:text-yellow-400">Our Menu</Link></li>
              <li><Link to="/offers" className="hover:text-yellow-400">Special Offers</Link></li>
              <li><Link to="/gift-cards" className="hover:text-yellow-400">Gift Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-yellow-400">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-yellow-400">FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-yellow-400">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p>1234 Food Street</p>
              <p>Cuisine City, CC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: hello@tastebite.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 TasteBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}