"use client";

import React, { useState, useEffect } from 'react';
import ScrollAnimation from './ScrollAnimation';

interface Review {
  id: string | number;
  name: string;
  title?: string;
  rating: number;
  comment: string;
  created_at: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    name: '',
    title: '',
    rating: 5,
    comment: '',
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null,
    message: ''
  });

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/reviews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Fallback to sample reviews if API fails
        setReviews([
          {
            id: '1',
            name: 'Alex Thompson',
            title: 'Product Designer',
            rating: 5,
            comment: 'CTRL revolutionized our workflow. The seamless integration between design and code has cut our development time in half.',
            created_at: '2023-06-15T10:30:00Z'
          },
          {
            id: '2',
            name: 'Sarah Chen',
            title: 'Frontend Developer',
            rating: 5,
            comment: 'As someone who codes, I was skeptical. But CTRL generates clean, maintainable code that I can actually work with. Game changer!',
            created_at: '2023-07-22T14:20:00Z'
          },
          {
            id: '3',
            name: 'Marcus Johnson',
            title: 'Startup Founder',
            rating: 4,
            comment: 'We launched our MVP in weeks instead of months. The visual programming features are intuitive enough for our non-technical team members.',
            created_at: '2023-08-10T09:15:00Z'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.name || !newReview.comment) {
      setFormStatus({
        ...formStatus,
        error: 'Please fill out all required fields',
        message: ''
      });
      return;
    }
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null,
      message: ''
    });
    
    try {
      // Submit to API
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit review');
      }
      
      // Success!
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null,
        message: result.message || 'Thank you for your review! It will be displayed after approval.'
      });
      
      setNewReview({
        name: '',
        title: '',
        rating: 5,
        comment: '',
      });
      
    } catch (error) {
      console.error('Error submitting review:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: ''
      });
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <section id="reviews" className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Developer <span className="text-accent">Testimonials</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hear from designers, developers, and product teams who are building with CTRL.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Reviews List */}
          <ScrollAnimation direction="left">
            <div>
              <h3 className="text-2xl font-bold mb-6 border-b border-border pb-4">What Our Users Say</h3>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full"></div>
                </div>
              ) : reviews.length === 0 ? (
                <div className="p-6 rounded-lg glass-effect text-center">
                  <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <ScrollAnimation 
                      key={review.id} 
                      direction="left" 
                      delay={index * 100}
                    >
                      <div className="p-6 rounded-lg glass-effect">
                        <div className="flex justify-between mb-3">
                          <div>
                            <h4 className="font-bold">{review.name}</h4>
                            {review.title && (
                              <div className="text-sm text-gray-400">{review.title}</div>
                            )}
                          </div>
                          <span className="text-gray-400 text-sm">{formatDate(review.created_at)}</span>
                        </div>
                        <div className="flex mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < review.rating ? 'text-accent' : 'text-gray-600'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>
              )}
            </div>
          </ScrollAnimation>

          {/* Review Form */}
          <ScrollAnimation direction="right">
            <div>
              <h3 className="text-2xl font-bold mb-6 border-b border-border pb-4">Share Your Experience</h3>
              
              {formStatus.isSubmitted ? (
                <div className="p-6 rounded-lg glass-effect text-center">
                  <div className="text-accent text-5xl mb-4">✓</div>
                  <h5 className="text-xl font-bold mb-2">Thank You!</h5>
                  <p className="text-gray-300 mb-6">
                    {formStatus.message}
                  </p>
                  <button
                    onClick={() => setFormStatus(prev => ({ ...prev, isSubmitted: false }))}
                    className="px-5 py-2 bg-accent/20 text-accent font-medium rounded-lg hover:bg-accent/30 transition-colors"
                  >
                    Submit Another Review
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-lg glass-effect">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newReview.name}
                        onChange={handleInputChange}
                        className="bg-black border border-border text-white rounded-lg block w-full p-2.5 focus:ring-accent focus:border-accent outline-none"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="title" className="block mb-2 text-sm font-medium">
                        Your Title or Role
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={newReview.title}
                        onChange={handleInputChange}
                        className="bg-black border border-border text-white rounded-lg block w-full p-2.5 focus:ring-accent focus:border-accent outline-none"
                        placeholder="Developer, Designer, etc."
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium">
                        Rating <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleRatingChange(i + 1)}
                            className="mr-1"
                          >
                            <svg
                              className={`w-8 h-8 ${i < newReview.rating ? 'text-accent' : 'text-gray-600'} hover:text-accent-dark transition-colors`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="comment" className="block mb-2 text-sm font-medium">
                        Your Review <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows={5}
                        value={newReview.comment}
                        onChange={handleInputChange}
                        className="bg-black border border-border text-white rounded-lg block w-full p-2.5 focus:ring-accent focus:border-accent outline-none"
                        placeholder="Share your experience with CTRL..."
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-accent text-black font-bold rounded-lg hover:bg-accent-dark transition-colors flex justify-center items-center"
                      disabled={formStatus.isSubmitting}
                    >
                      {formStatus.isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
                          Submitting...
                        </>
                      ) : (
                        'Submit Review'
                      )}
                    </button>
                    
                    {formStatus.error && (
                      <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">
                        Error: {formStatus.error}
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Reviews; 