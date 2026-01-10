import React from 'react';
import { Instagram, Linkedin, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#5d4437] text-white">
            <div className="max-w-7xl mx-auto px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Newsletter Section */}
                    <div className="lg:col-span-1">
                        <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>Logo</h3>
                        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                            Suspendisse quis sodales nunc. Sed ligula enim, mattis ut sem id, mollis sagittis sapien.
                        </p>

                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-6 py-3 rounded-full bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                            />
                            <button className="bg-white text-[#5d4437] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                                Subscribe
                            </button>
                        </div>

                        <p className="text-gray-400 text-xs mt-4 leading-relaxed">
                            By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.
                        </p>
                    </div>

                    {/* Main Page Links */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6">Main Page</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Category</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shop</a></li>
                        </ul>
                    </div>

                    {/* Utility Page Links */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6">Utility Page</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">License</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Style Guide</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Changelog</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">404 not found</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6">Contact Us :-</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <span className="text-gray-300">033368850528</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                <span className="text-gray-300">manvykavin@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 flex-shrink-0" />
                                <span className="text-gray-300">Manchester 13078</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}

                <div className="flex mt-8 flex-col md:flex-row justify-between items-center gap-4">
                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-300 transition-colors">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="#" className="hover:text-gray-300 transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="#" className="hover:text-gray-300 transition-colors">
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a href="#" className="hover:text-gray-300 transition-colors">
                            <Twitter className="w-6 h-6" />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}