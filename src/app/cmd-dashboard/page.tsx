'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

interface ApprovalItem {
  id: string;
  content_type: string;
  content_id: string;
  submitted_by: string;
  submitted_at: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  content_data?: any;
  submitter_email?: string;
  action_type?: 'create' | 'edit' | 'delete';
  original_content_id?: string;
}

export default function CMDDashboardPage() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshLoading(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
                        // Fetch content approvals
                  const { data: contentApprovals, error: contentError } = await supabase
                    .from('content_approvals')
                    .select('*')
                    .order('submitted_at', { ascending: false });

      if (contentError) throw contentError;

                        // Fetch ticker approvals
                  const { data: tickerApprovals, error: tickerError } = await supabase
                    .from('ticker_approvals')
                    .select('*')
                    .order('submitted_at', { ascending: false });

      if (tickerError) throw tickerError;

                        // Fetch submitter emails for all approvals
                  const submitterEmails = new Map();
                  const allUserIds = new Set();
                  
                  if (contentApprovals && contentApprovals.length > 0) {
                    contentApprovals.forEach(item => allUserIds.add(item.submitted_by));
                  }
                  
                  if (tickerApprovals && tickerApprovals.length > 0) {
                    tickerApprovals.forEach(item => allUserIds.add(item.submitted_by));
                  }
                  
                  if (allUserIds.size > 0) {
                    const { data: profiles } = await supabase
                      .from('profiles')
                      .select('id, email')
                      .in('id', Array.from(allUserIds));
                    if (profiles) {
                      profiles.forEach(profile => {
                        submitterEmails.set(profile.id, profile.email);
                      });
                    }
                  }

                  // Combine and format approvals
                  const formattedContentApprovals = contentApprovals?.map(item => ({
                    ...item,
                    content_type: item.content_type,
                    submitter_email: submitterEmails.get(item.submitted_by) || 'Unknown'
                  })) || [];

                  const formattedTickerApprovals = tickerApprovals?.map(item => ({
                    ...item,
                    content_type: 'ticker',
                    content_id: item.id,
                    submitter_email: submitterEmails.get(item.submitted_by) || 'Unknown'
                  })) || [];

      const allApprovals = [...formattedContentApprovals, ...formattedTickerApprovals];
      setApprovals(allApprovals);
    } catch (error) {
      console.error('Error fetching approvals:', error);
      setError('Failed to load approvals. Please try again.');
    } finally {
      setLoading(false);
      setRefreshLoading(false);
    }
  };

  const handleApproval = async (id: string, status: 'approved' | 'rejected', contentType: string, contentId: string) => {
    try {
      setProcessingId(id);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      if (contentType === 'ticker') {
        // Handle ticker approval
        const { error } = await supabase
          .from('ticker_approvals')
          .update({
            status,
            approved_by: user.id,
            approved_at: new Date().toISOString()
          })
          .eq('id', contentId);

        if (error) throw error;

        if (status === 'approved') {
          // Update the actual ticker content
          const { data: tickerData } = await supabase
            .from('ticker_approvals')
            .select('ticker_text')
            .eq('id', contentId)
            .single();

          if (tickerData) {
            // Split ticker text by ' | ' and insert each message
            const tickerMessages = tickerData.ticker_text.split(' | ');
            const messagesToInsert = tickerMessages.map((text: string, index: number) => ({
              position: index + 1,
              text: text.trim(),
              updated_at: new Date().toISOString(),
              updated_by: user.id
            }));

            // Insert ticker messages
            const { error: tickerError } = await supabase
              .from('ticker_messages')
              .upsert(messagesToInsert, { onConflict: 'position' });

            if (tickerError) throw tickerError;
          }
        }
      } else {
        // Handle content approval (blog, events)
        const { error } = await supabase
          .from('content_approvals')
          .update({
            status,
            approved_by: user.id,
            approved_at: new Date().toISOString()
          })
          .eq('id', id);

        if (error) throw error;

        if (status === 'approved') {
          // Update the actual content to be published
          const { error: updateError } = await supabase
            .from(contentType === 'blog_post' ? 'blog_posts' : 'events')
            .update({ 
              approval_required: false,
              published: true,
              published_at: new Date().toISOString()
            })
            .eq('id', contentId);

          if (updateError) throw updateError;
        }
      }

      // Refresh the approvals list
      await fetchApprovals();
    } catch (error) {
      console.error('Error processing approval:', error);
      alert('Error processing approval. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredApprovals = approvals.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

                const getContentTypeLabel = (type: string) => {
                switch (type) {
                  case 'blog_post': return 'Blog Post';
                  case 'event': return 'Event';
                  case 'ticker': return 'Ticker';
                  default: return type;
                }
              };

              const getActionTypeLabel = (action: string) => {
                switch (action) {
                  case 'create': return 'Create';
                  case 'edit': return 'Edit';
                  case 'delete': return 'Delete';
                  default: return action;
                }
              };

              const getActionTypeColor = (action: string) => {
                switch (action) {
                  case 'create': return 'bg-green-100 text-green-800';
                  case 'edit': return 'bg-blue-100 text-blue-800';
                  case 'delete': return 'bg-red-100 text-red-800';
                  default: return 'bg-gray-100 text-gray-800';
                }
              };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading approvals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Approvals</h1>
          <p className="mt-1 text-sm text-gray-600">
            Review and approve content submitted by admin users
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => fetchApprovals(true)}
            disabled={refreshLoading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {refreshLoading ? (
              <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            {refreshLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <div className="mt-4">
                <button
                  onClick={() => fetchApprovals(true)}
                  className="text-sm font-medium text-red-800 hover:text-red-900 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'All', count: approvals.length },
            { key: 'pending', label: 'Pending', count: approvals.filter(a => a.status === 'pending').length },
            { key: 'approved', label: 'Approved', count: approvals.filter(a => a.status === 'approved').length },
            { key: 'rejected', label: 'Rejected', count: approvals.filter(a => a.status === 'rejected').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {filteredApprovals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No approvals found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' ? 'No content has been submitted for approval yet.' : `No ${filter} approvals found.`}
            </p>
          </motion.div>
        ) : (
          filteredApprovals.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {getContentTypeLabel(item.content_type)}
                                </span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionTypeColor(item.action_type || 'create')}`}>
                                  {getActionTypeLabel(item.action_type || 'create')}
                                </span>
                              </div>
                  
                                                <div className="space-y-2">
                                <div>
                                  <span className="text-sm font-medium text-gray-900">Submitted by:</span>
                                  <span className="ml-2 text-sm text-gray-600">{item.submitter_email || 'Unknown'}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-900">Submitted:</span>
                                  <span className="ml-2 text-sm text-gray-600">
                                    {new Date(item.submitted_at).toLocaleDateString()} at {new Date(item.submitted_at).toLocaleTimeString()}
                                  </span>
                                </div>
                                {item.comments && (
                                  <div>
                                    <span className="text-sm font-medium text-gray-900">Comments:</span>
                                    <span className="ml-2 text-sm text-gray-600">{item.comments}</span>
                                  </div>
                                )}
                                
                                {/* Content Preview */}
                                {item.content_data && (
                                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Content Preview:</h4>
                                    {item.content_type === 'blog_post' && (
                                      <div>
                                        <p className="text-sm font-medium text-gray-700">Title: {item.content_data.title}</p>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{item.content_data.content}</p>
                                      </div>
                                    )}
                                    {item.content_type === 'event' && (
                                      <div>
                                        <p className="text-sm font-medium text-gray-700">Title: {item.content_data.title}</p>
                                        <p className="text-sm text-gray-600">Date: {new Date(item.content_data.event_date).toLocaleDateString()}</p>
                                        <p className="text-sm text-gray-600">Location: {item.content_data.is_virtual ? 'Virtual' : item.content_data.location}</p>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.content_data.details}</p>
                                      </div>
                                    )}
                                    {item.content_type === 'ticker' && (
                                      <div>
                                        <p className="text-sm font-medium text-gray-700">Ticker Messages:</p>
                                        <p className="text-sm text-gray-600">{item.content_data.ticker_messages?.join(' | ')}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                </div>

                {item.status === 'pending' && (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleApproval(item.id, 'approved', item.content_type, item.content_id)}
                      disabled={processingId === item.id}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                      {processingId === item.id ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                      ) : (
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(item.id, 'rejected', item.content_type, item.content_id)}
                      disabled={processingId === item.id}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                      {processingId === item.id ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                      ) : (
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
