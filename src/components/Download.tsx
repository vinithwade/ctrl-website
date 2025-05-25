"use client";

import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const Download: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    try {
      // Submit to API
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit request');
      }
      
      // Success!
      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
      setFormData({ name: '', email: '', role: '', message: '' });
      
      console.log('Early access request submitted:', result);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  return (
    <section id="download" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-accent/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Join the <span className="text-accent">Revolution</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Be among the first to experience the future of application development with CTRL.
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="max-w-5xl mx-auto glass-effect rounded-2xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <ScrollAnimation direction="left">
              <div>
                <h3 className="text-3xl font-bold mb-4">Get Early Access</h3>
                <p className="text-gray-300 mb-6">
                  Join our early access program and be part of shaping the future of CTRL. 
                  Limited spots available for developers, designers, and product teams.
                </p>
                
                <div className="mb-8">
                  <h4 className="font-bold text-xl mb-4 text-accent">Key Advantages Over Others</h4>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2">Feature</th>
                        <th className="text-center py-2">CTRL</th>
                        <th className="text-center py-2">Others</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400 text-sm">
                      <tr className="border-b border-white/10">
                        <td className="py-3">Bi-directional editing</td>
                        <td className="text-center text-green-400">✓ Full (UI ↔ Code ↔ Logic)</td>
                        <td className="text-center text-red-400">✗ One-way mostly</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3">Code export</td>
                        <td className="text-center text-green-400">✓ Custom, real-time sync</td>
                        <td className="text-center text-yellow-400">△ Less editable</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3">Plugin ecosystem</td>
                        <td className="text-center text-green-400">✓ Open and extensible</td>
                        <td className="text-center text-red-400">✗ Closed</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3">Offline support</td>
                        <td className="text-center text-green-400">✓ Full support</td>
                        <td className="text-center text-red-400">✗ Cloud-only</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-3">Custom backend logic</td>
                        <td className="text-center text-green-400">✓ Node-based + code</td>
                        <td className="text-center text-yellow-400">△ Limited in no-code tools</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="right">
              <div className="glass-effect rounded-xl p-6 border border-white/10">
                <h4 className="text-xl font-bold mb-4">Request Early Access</h4>
                
                {formStatus.isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-accent text-5xl mb-4">✓</div>
                    <h5 className="text-xl font-bold mb-2">Thank You!</h5>
                    <p className="text-gray-300 mb-6">
                      Your request has been submitted successfully. We&apos;ll be in touch soon!
                    </p>
                    <button
                      onClick={() => setFormStatus(prev => ({ ...prev, isSubmitted: false }))}
                      className="px-5 py-2 bg-accent/20 text-accent font-medium rounded-lg hover:bg-accent/30 transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:ring-accent focus:border-accent"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:ring-accent focus:border-accent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="role" className="block text-sm font-medium mb-2">Your Role</label>
                      <select 
                        id="role" 
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:ring-accent focus:border-accent"
                        required
                      >
                        <option value="">Select your role</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="product">Product Manager</option>
                        <option value="founder">Founder/Entrepreneur</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">What would you build with CTRL?</label>
                      <textarea 
                        id="message" 
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:ring-accent focus:border-accent"
                        placeholder="Tell us about your project ideas"
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full px-5 py-3 bg-accent text-black font-medium rounded-lg hover:bg-accent-dark transition-colors neon-border flex justify-center items-center"
                      disabled={formStatus.isSubmitting}
                    >
                      {formStatus.isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
                          Processing...
                        </>
                      ) : 'Request Access'}
                    </button>
                    
                    {formStatus.error && (
                      <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">
                        Error: {formStatus.error}. Please try again.
                      </div>
                    )}
                  </form>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download; 