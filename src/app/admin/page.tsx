"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface EarlyAccessRequest {
  id: number;
  name: string;
  email: string;
  role: string;
  message: string;
  created_at: string;
}

interface Review {
  id: number;
  name: string;
  title?: string;
  rating: number;
  comment: string;
  created_at: string;
  is_approved: boolean;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState<EarlyAccessRequest[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [actionStatus, setActionStatus] = useState<{
    message: string;
    type: 'success' | 'error' | null;
  }>({ message: '', type: null });

  // Fetch early access requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoadingRequests(true);
        const response = await fetch('/api/early-access');
        
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setActionStatus({
          message: 'Failed to load early access requests',
          type: 'error'
        });
      } finally {
        setIsLoadingRequests(false);
      }
    };
    
    fetchRequests();
  }, []);

  // Fetch all reviews (including unapproved ones)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const response = await fetch('/api/reviews/admin');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setActionStatus({
          message: 'Failed to load reviews',
          type: 'error'
        });
      } finally {
        setIsLoadingReviews(false);
      }
    };
    
    fetchReviews();
  }, []);

  const handleDeleteRequest = async (id: number) => {
    if (confirm('Are you sure you want to delete this request?')) {
      try {
        const response = await fetch(`/api/early-access/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete request');
        }
        
        setRequests(requests.filter(req => req.id !== id));
        setActionStatus({
          message: 'Request deleted successfully',
          type: 'success'
        });
      } catch (error) {
        console.error('Error deleting request:', error);
        setActionStatus({
          message: 'Failed to delete request',
          type: 'error'
        });
      }
    }
  };

  const handleApproveReview = async (id: number) => {
    try {
      const response = await fetch(`/api/reviews/${id}/approve`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        throw new Error('Failed to approve review');
      }
      
      // Update the review in the local state
      setReviews(reviews.map(review => 
        review.id === id ? { ...review, is_approved: true } : review
      ));
      
      setActionStatus({
        message: 'Review approved successfully',
        type: 'success'
      });
    } catch (error) {
      console.error('Error approving review:', error);
      setActionStatus({
        message: 'Failed to approve review',
        type: 'error'
      });
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await fetch(`/api/reviews/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete review');
        }
        
        setReviews(reviews.filter(review => review.id !== id));
        setActionStatus({
          message: 'Review deleted successfully',
          type: 'success'
        });
      } catch (error) {
        console.error('Error deleting review:', error);
        setActionStatus({
          message: 'Failed to delete review',
          type: 'error'
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/" className="text-accent hover:underline">
            Back to Home
          </Link>
        </div>

        {actionStatus.message && (
          <div className={`mb-6 p-4 rounded-lg ${
            actionStatus.type === 'success' 
              ? 'bg-green-900/30 text-green-300 border border-green-700/50' 
              : 'bg-red-900/30 text-red-300 border border-red-700/50'
          }`}>
            <div className="flex items-center">
              <span className="mr-2">
                {actionStatus.type === 'success' ? '✓' : '✗'}
              </span>
              {actionStatus.message}
              <button 
                className="ml-auto text-sm opacity-70 hover:opacity-100"
                onClick={() => setActionStatus({ message: '', type: null })}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex border-b border-white/10">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'requests'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('requests')}
            >
              Early Access Requests
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'reviews'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>

        {activeTab === 'requests' && (
          <div className="glass-effect border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Early Access Requests</h2>
            </div>

            {isLoadingRequests ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Loading requests...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No early access requests have been submitted yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4">{request.name}</td>
                        <td className="py-3 px-4">{request.email}</td>
                        <td className="py-3 px-4">{request.role}</td>
                        <td className="py-3 px-4">{formatDate(request.created_at)}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteRequest(request.id)}
                              className="px-2 py-1 bg-red-900/20 text-red-400 text-xs rounded hover:bg-red-900/40"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => alert(`Message: ${request.message || 'No message provided'}`)}
                              className="px-2 py-1 bg-accent/20 text-accent text-xs rounded hover:bg-accent/40"
                            >
                              View Message
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="glass-effect border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">User Reviews</h2>
            </div>

            {isLoadingReviews ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No reviews have been submitted yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex gap-4 mb-4">
                  <span className="px-2 py-1 rounded-full bg-green-900/30 text-green-300 text-xs border border-green-700/50">
                    Approved
                  </span>
                  <span className="px-2 py-1 rounded-full bg-yellow-900/30 text-yellow-300 text-xs border border-yellow-700/50">
                    Pending Approval
                  </span>
                </div>
                
                {reviews.map((review) => (
                  <div 
                    key={review.id} 
                    className={`p-4 rounded-lg border ${
                      review.is_approved 
                        ? 'border-green-700/30 bg-green-900/10' 
                        : 'border-yellow-700/30 bg-yellow-900/10'
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-bold">{review.name}</h3>
                        {review.title && <p className="text-sm text-gray-400">{review.title}</p>}
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatDate(review.created_at)}
                      </div>
                    </div>
                    
                    <div className="flex mb-2">
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
                    
                    <p className="text-gray-300 mb-4">{review.comment}</p>
                    
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="px-3 py-1 bg-red-900/20 text-red-400 text-sm rounded hover:bg-red-900/40"
                      >
                        Delete
                      </button>
                      
                      {!review.is_approved && (
                        <button
                          onClick={() => handleApproveReview(review.id)}
                          className="px-3 py-1 bg-green-900/20 text-green-400 text-sm rounded hover:bg-green-900/40"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="glass-effect border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Admin Information</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              This admin panel connects to your SQLite database to manage early access requests and user reviews.
            </p>
            <p>
              <strong>Reviews:</strong> By default, all submitted reviews require approval before they appear on the public site.
              Use the Reviews tab to approve or delete user submissions.
            </p>
            <p>
              <strong>Note:</strong> In a production environment, you should implement proper authentication
              for this admin interface to ensure only authorized users can access it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 