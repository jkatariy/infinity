'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  UserIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EnvelopeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience_level: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary_range: string;
  is_active: boolean;
  created_at: string;
}

interface CareerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position_interested_in: string;
  additional_info: string;
  status: string;
  created_at: string;
}

interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: string;
  experience_level: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  salary_range: string;
  is_active: boolean;
}

export default function HRDashboard() {
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [filteredPositions, setFilteredPositions] = useState<JobPosition[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'positions' | 'applications'>('positions');
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosition | null>(null);
  const [jobFormData, setJobFormData] = useState<JobFormData>({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    experience_level: 'entry',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    salary_range: '',
    is_active: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [clearingApplications, setClearingApplications] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  
  // Job positions filter states
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Applications filter states
  const [applicationStatusFilter, setApplicationStatusFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch job positions
      const { data: jobs, error: jobsError } = await supabase
        .from('job_positions')
        .select('*')
        .order('created_at', { ascending: false });

      if (jobsError) throw jobsError;

      // Fetch applications
      const { data: apps, error: appsError } = await supabase
        .from('career_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (appsError) throw appsError;

      setJobPositions(jobs || []);
      setFilteredPositions(jobs || []);
      setApplications(apps || []);
      setFilteredApplications(apps || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
      setNotification({ type: 'error', message: errorMessage });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleJobFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setJobFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const jobData = {
        ...jobFormData,
        requirements: jobFormData.requirements ? jobFormData.requirements.split('\n').filter(r => r.trim()) : [],
        responsibilities: jobFormData.responsibilities ? jobFormData.responsibilities.split('\n').filter(r => r.trim()) : [],
        benefits: jobFormData.benefits ? jobFormData.benefits.split('\n').filter(b => b.trim()) : []
      };

      if (editingJob) {
        const { error } = await supabase
          .from('job_positions')
          .update(jobData)
          .eq('id', editingJob.id);

        if (error) throw error;
        
        setNotification({ type: 'success', message: 'Job position updated successfully!' });
      } else {
        const { error } = await supabase
          .from('job_positions')
          .insert([jobData]);

        if (error) throw error;
        
        setNotification({ type: 'success', message: 'Job position added successfully!' });
      }

      setShowJobForm(false);
      setEditingJob(null);
      resetJobForm();
      fetchData();
    } catch (error) {
      console.error('Error saving job position:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save job position';
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setSubmitting(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleEditJob = (job: JobPosition) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience_level: job.experience_level,
      description: job.description,
      requirements: job.requirements?.join('\n') || '',
      responsibilities: job.responsibilities?.join('\n') || '',
      benefits: job.benefits?.join('\n') || '',
      salary_range: job.salary_range,
      is_active: job.is_active
    });
    setShowJobForm(true);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job position?')) return;

    try {
      const { error } = await supabase
        .from('job_positions')
        .delete()
        .eq('id', jobId);

      if (error) throw error;
      
      setNotification({ type: 'success', message: 'Job position deleted successfully!' });
      fetchData();
    } catch (error) {
      console.error('Error deleting job position:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete job position';
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setTimeout(() => setNotification(null), 5000);
    }
  };

  // Filter job positions based on status
  const applyFilters = useCallback(() => {
    let filtered = [...jobPositions];

    // Status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(job => job.is_active === isActive);
    }

    setFilteredPositions(filtered);
  }, [statusFilter, jobPositions]);

  // Apply filters whenever any filter changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);



  // Filter applications based on status
  const applyApplicationFilters = useCallback(() => {
    let filtered = [...applications];

    // Status filter
    if (applicationStatusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === applicationStatusFilter);
    }

    setFilteredApplications(filtered);
  }, [applicationStatusFilter, applications]);

  // Apply application filters whenever any filter changes
  useEffect(() => {
    applyApplicationFilters();
  }, [applyApplicationFilters]);

  const handleUpdateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      setUpdatingStatus(applicationId);
      
      console.log('Updating application status:', { applicationId, status });
      
      // Validate inputs
      if (!applicationId || !status) {
        throw new Error('Missing application ID or status');
      }

      // Update application status
      const { data, error } = await supabase
        .from('career_applications')
        .update({ status })
        .eq('id', applicationId)
        .select();

      console.log('Supabase update response:', { data, error });

      if (error) {
        console.error('Supabase update error:', error);
        throw new Error(`Failed to update application: ${error.message}`);
      }

      if (!data || data.length === 0) {
        throw new Error('No application found with the provided ID');
      }

      console.log('Update successful, data:', data);

      // Update the local state immediately for better UX
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: status }
            : app
        )
      );
      
      // Also update filtered applications
      setFilteredApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: status }
            : app
        )
      );
      
      // Show success notification
      setNotification({ type: 'success', message: 'Application status updated successfully!' });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error updating application status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setNotification({ 
        type: 'error', 
        message: `Failed to update application status: ${errorMessage}` 
      });
      setTimeout(() => setNotification(null), 5000);
      
      // Refresh data as fallback if update fails
      console.log('Refreshing data as fallback...');
      fetchData();
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleClearAllApplications = async () => {
    if (!confirm('Are you sure you want to clear all application data? This action cannot be undone.')) return;

    setClearingApplications(true);
    
    try {
      // First, let's check if there are any applications to clear
      const { data: existingApps, error: countError } = await supabase
        .from('career_applications')
        .select('id')
        .limit(1);

      if (countError) throw countError;

      if (!existingApps || existingApps.length === 0) {
        setNotification({ type: 'info', message: 'No applications to clear.' });
        return;
      }

      // Get the count of applications to be deleted
      const { count } = await supabase
        .from('career_applications')
        .select('*', { count: 'exact', head: true });

      // Delete all records from career_applications table
      const { error } = await supabase
        .from('career_applications')
        .delete()
        .not('id', 'is', null); // This will delete all records

      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }
      
      setNotification({ 
        type: 'success', 
        message: `Successfully cleared ${count} application(s)!` 
      });
      
      // Refresh the data immediately
      await fetchData();
    } catch (error) {
      console.error('Error clearing applications:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear applications';
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setClearingApplications(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleContactApplicant = (application: CareerApplication) => {
    const subject = encodeURIComponent('Application Received – Let\'s Connect!');
    const body = encodeURIComponent(`Hi ${application.name},

We found your profile really interesting! We've received your application at Infinity Automated Solutions Pvt. Ltd. and would love to chat more with you.

Looking forward to connecting soon.

Best regards,
HR Team
Infinity Automated Solutions Pvt. Ltd.`);

    const mailtoLink = `mailto:${application.email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'New' },
      reviewed: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Reviewed' },
      shortlisted: { bg: 'bg-green-100', text: 'text-green-800', label: 'Shortlisted' },
      interviewed: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Interviewed' },
      hired: { bg: 'bg-green-100', text: 'text-green-800', label: 'Hired' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const resetJobForm = () => {
    setJobFormData({
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      experience_level: 'entry',
      description: '',
      requirements: '',
      responsibilities: '',
      benefits: '',
      salary_range: '',
      is_active: true
    });
  };

  const getExperienceLevelLabel = (level: string) => {
    switch (level) {
      case 'entry': return 'Entry Level';
      case 'mid': return 'Mid Level';
      case 'senior': return 'Senior Level';
      case 'lead': return 'Lead Level';
      default: return level;
    }
  };

  const getJobTypeLabel = (type: string) => {
    switch (type) {
      case 'full-time': return 'Full Time';
      case 'part-time': return 'Part Time';
      case 'contract': return 'Contract';
      case 'internship': return 'Internship';
      default: return type;
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading HR Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-4 p-4 rounded-md ${
              notification.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : notification.type === 'info'
                ? 'bg-blue-50 border border-blue-200 text-blue-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : notification.type === 'info' ? (
                <ExclamationCircleIcon className="w-5 h-5" />
              ) : (
                <ExclamationCircleIcon className="w-5 h-5" />
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HR Management</h1>
              <p className="text-gray-600 mt-2">Manage job positions and review applications</p>
            </div>
            {activeTab === 'positions' && (
              <button
                onClick={() => {
                  setEditingJob(null);
                  resetJobForm();
                  setShowJobForm(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Position
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('positions')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'positions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Job Positions ({jobPositions.length})
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Applications ({applications.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Job Positions Tab Content */}
        {activeTab === 'positions' && (
          <>
            {/* Filters */}
            <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
              <div className="flex items-center gap-4">
                {/* Status Filter */}
                <div className="flex-1 max-w-xs">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setStatusFilter('all');
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    Clear Filter
                  </button>
                </div>
              </div>
            </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredPositions.length} of {jobPositions.length} positions
          </p>
        </div>

        {/* Job Positions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {filteredPositions.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BriefcaseIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {jobPositions.length === 0 ? 'No job positions found' : 'No positions match your filters'}
              </h3>
              <p className="text-gray-600 mb-6">
                {jobPositions.length === 0 
                  ? 'Get started by adding your first job position.' 
                  : 'Try adjusting your search criteria or clear all filters.'
                }
              </p>
              {jobPositions.length === 0 && (
                <button
                  onClick={() => {
                    setEditingJob(null);
                    resetJobForm();
                    setShowJobForm(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add First Position
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredPositions.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        {job.department && (
                          <div className="flex items-center gap-1">
                            <BriefcaseIcon className="w-4 h-4" />
                            <span>{job.department}</span>
                          </div>
                        )}
                        {job.location && (
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <UserIcon className="w-4 h-4" />
                          <span>{getExperienceLevelLabel(job.experience_level)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        job.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {job.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getJobTypeLabel(job.type)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  {job.salary_range && (
                    <div className="text-sm text-gray-600 mb-4">
                      <strong>Salary Range:</strong> {job.salary_range}
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditJob(job)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PencilIcon className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TrashIcon className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
                      )}
          </motion.div>
          </>
        )}

        {/* Applications Tab Content */}
        {activeTab === 'applications' && (
          <>
            {/* Application Filters */}
            <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
              <div className="flex items-center gap-4">
                {/* Status Filter */}
                <div className="flex-1 max-w-xs">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={applicationStatusFilter}
                    onChange={(e) => setApplicationStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end gap-2">
                  <button
                    onClick={() => {
                      setApplicationStatusFilter('all');
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    Clear Filter
                  </button>
                  <button
                    onClick={handleClearAllApplications}
                    disabled={clearingApplications}
                    className={`px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      clearingApplications ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {clearingApplications ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1 inline"></div>
                        Clearing...
                      </>
                    ) : (
                      <>
                        <XMarkIcon className="w-4 h-4 mr-1 inline" />
                        Clear All Data
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredApplications.length} of {applications.length} applications
              </p>
            </div>

            {/* Applications List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filteredApplications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <UserIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {applications.length === 0 ? 'No applications found' : 'No applications match your filters'}
                  </h3>
                  <p className="text-gray-600">
                    {applications.length === 0 
                      ? 'Applications will appear here when candidates apply for positions.' 
                      : 'Try adjusting your search criteria or clear all filters.'
                    }
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredApplications.map((application) => (
                    <div key={application.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{application.name}</h3>
                          <p className="text-gray-600">{application.email}</p>
                          <p className="text-gray-600">{application.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          <strong>Position:</strong> {application.position_interested_in}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Applied:</strong> {new Date(application.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      {application.additional_info && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Information:</h4>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                            {application.additional_info}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <select
                            value={application.status || 'new'}
                            onChange={(e) => {
                              handleUpdateApplicationStatus(application.id, e.target.value);
                            }}
                            disabled={updatingStatus === application.id}
                            className={`text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              updatingStatus === application.id ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interviewed">Interviewed</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          {updatingStatus === application.id && (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleContactApplicant(application)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <EnvelopeIcon className="w-4 h-4 mr-1" />
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* Job Form Modal */}
        {showJobForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingJob ? 'Edit Job Position' : 'Add New Job Position'}
                </h2>

                <form onSubmit={handleJobSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={jobFormData.title}
                        onChange={handleJobFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={jobFormData.department}
                        onChange={handleJobFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={jobFormData.location}
                        onChange={handleJobFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Type *
                      </label>
                      <select
                        name="type"
                        required
                        value={jobFormData.type}
                        onChange={handleJobFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience Level *
                      </label>
                      <select
                        name="experience_level"
                        required
                        value={jobFormData.experience_level}
                        onChange={handleJobFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="entry">Entry Level</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior Level</option>
                        <option value="lead">Lead Level</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        name="salary_range"
                        value={jobFormData.salary_range}
                        onChange={handleJobFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., $50,000 - $70,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={jobFormData.description}
                      onChange={handleJobFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirements (one per line)
                    </label>
                    <textarea
                      name="requirements"
                      rows={4}
                      value={jobFormData.requirements}
                      onChange={handleJobFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="• Bachelor's degree in Engineering&#10;• 3+ years of experience&#10;• Strong communication skills"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Responsibilities (one per line)
                    </label>
                    <textarea
                      name="responsibilities"
                      rows={4}
                      value={jobFormData.responsibilities}
                      onChange={handleJobFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="• Design and develop automation solutions&#10;• Collaborate with cross-functional teams&#10;• Maintain technical documentation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Benefits (one per line)
                    </label>
                    <textarea
                      name="benefits"
                      rows={4}
                      value={jobFormData.benefits}
                      onChange={handleJobFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="• Competitive salary&#10;• Health insurance&#10;• Professional development opportunities"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={jobFormData.is_active}
                      onChange={handleJobFormChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Active Position
                    </label>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowJobForm(false);
                        setEditingJob(null);
                        resetJobForm();
                      }}
                      className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {submitting ? 'Saving...' : (editingJob ? 'Update Position' : 'Add Position')}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
