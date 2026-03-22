import React, { useState, useEffect } from 'react';
import { 
  Upload, Trash2, File, Mail, CheckCircle, XCircle, 
  LogOut, Home, Settings, Download, Search, Filter,
  Bell, User, Calendar, Clock, AlertCircle, Eye,
  Download as DownloadIcon, RefreshCw, ChevronDown,
  PieChart, MessageSquare, FileText, Shield, Activity,
  Info, Lock
} from 'lucide-react';

function Admin() {
  const [cvs, setCVs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('cvs');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isMarkingRead, setIsMarkingRead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
  const SESSION_TIMEOUT = 30 * 60 * 1000;

  useEffect(() => {
    if (isAuthenticated) {
      fetchCVs();
      fetchContacts();
      startSessionTimer();
    }
    return () => {
      if (sessionTimeout) clearTimeout(sessionTimeout);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        checkNewMessages();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, unreadCount]);

  const startSessionTimer = () => {
    if (sessionTimeout) clearTimeout(sessionTimeout);
    const timeout = setTimeout(() => {
      handleLogout();
      showNotification('Session expired due to inactivity', 'info');
    }, SESSION_TIMEOUT);
    setSessionTimeout(timeout);
  };

  const resetSessionTimer = () => {
    startSessionTimer();
  };

  const handleAuthenticate = (e) => {
    e.preventDefault();
    
    try {
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setPassword('');
        setMessage('');
        showNotification('Welcome back! Login successful', 'success');
      } else {
        setMessage('Invalid password');
        showNotification('Login failed', 'error');
      }
    } catch (error) {
      setMessage('Authentication failed');
      showNotification('Authentication error', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCVs([]);
    setContacts([]);
    setUnreadCount(0);
    if (sessionTimeout) clearTimeout(sessionTimeout);
    showNotification('Logged out successfully', 'info');
  };

  const fetchCVs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cv/list`);
      if (response.ok) {
        const data = await response.json();
        setCVs(data);
      }
    } catch (error) {
      showNotification('Failed to fetch CVs', 'error');
      console.error(error);
    }
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/contact/list`);
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
        setUnreadCount(data.filter(c => !c.read).length);
      }
    } catch (error) {
      showNotification('Failed to fetch contacts', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkNewMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/unread-count`);
      if (response.ok) {
        const data = await response.json();
        if (data.count && data.count > unreadCount) {
          showNotification(`${data.count - unreadCount} new message(s) received`, 'info');
          fetchContacts();
        }
      }
    } catch (error) {
      console.error('Error checking new messages:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      showNotification('Please select a file', 'error');
      return;
    }

    if (file.type !== 'application/pdf') {
      showNotification('Only PDF files are allowed', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification('File size must be less than 5MB', 'error');
      return;
    }

    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    const formData = new FormData();
    formData.append('cv', file, sanitizedFilename);

    try {
      setUploading(true);
      const response = await fetch(`${API_BASE_URL}/cv/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        showNotification('CV uploaded successfully', 'success');
        fetchCVs();
        resetSessionTimer();
        if (e.target) e.target.value = '';
      } else {
        const error = await response.json();
        showNotification(error.message || 'Upload failed', 'error');
      }
    } catch (error) {
      showNotification('Error uploading file', 'error');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCV = async (id) => {
    if (!window.confirm('Are you sure you want to delete this CV? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(id);
      const response = await fetch(`${API_BASE_URL}/cv/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showNotification('CV deleted successfully', 'success');
        setCVs(prev => prev.filter(cv => cv._id !== id));
        resetSessionTimer();
      } else {
        const error = await response.json();
        showNotification(error.message || 'Failed to delete CV', 'error');
      }
    } catch (error) {
      showNotification('Error deleting CV', 'error');
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      setIsMarkingRead(id);
      const response = await fetch(`${API_BASE_URL}/contact/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setContacts(prevContacts => 
          prevContacts.map(contact => 
            contact._id === id ? { ...contact, read: true } : contact
          )
        );
        
        setUnreadCount(prev => Math.max(0, prev - 1));
        showNotification('Message marked as read', 'success');
        resetSessionTimer();
      } else {
        showNotification(data.message || 'Failed to mark as read', 'error');
      }
    } catch (error) {
      console.error('Error updating message:', error);
      showNotification('Error updating message', 'error');
    } finally {
      setIsMarkingRead(null);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(id);
      const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const deletedContact = contacts.find(c => c._id === id);
        if (deletedContact && !deletedContact.read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
        
        setContacts(prevContacts => prevContacts.filter(c => c._id !== id));
        showNotification('Message deleted successfully', 'success');
        resetSessionTimer();
      } else {
        const error = await response.json();
        showNotification(error.message || 'Failed to delete message', 'error');
      }
    } catch (error) {
      showNotification('Error deleting message', 'error');
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleDownloadCV = async (cv) => {
    try {
      showNotification('Downloading CV...', 'info');
      window.open(`${API_BASE_URL}/cv/download/${cv._id}`, '_blank');
    } catch (error) {
      showNotification('Error downloading CV', 'error');
    }
  };

  const showNotification = (msg, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message: msg, type }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'unread') return matchesSearch && !contact.read;
    if (filterStatus === 'read') return matchesSearch && contact.read;
    return matchesSearch;
  });

  useEffect(() => {
    if (isAuthenticated) {
      const events = ['mousedown', 'keydown', 'scroll', 'mousemove'];
      const resetTimer = () => resetSessionTimer();
      
      events.forEach(event => {
        window.addEventListener(event, resetTimer);
      });

      return () => {
        events.forEach(event => {
          window.removeEventListener(event, resetTimer);
        });
      };
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff8c42] rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#ff8c42] to-[#ff6b2b] rounded-2xl mb-4 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
              <p className="text-gray-300">Secure access to your portfolio dashboard</p>
            </div>
            
            <form onSubmit={handleAuthenticate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff8c42] focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    autoFocus
                  />
                  <Lock className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              {message && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400 text-sm">{message}</p>
                </div>
              )}
              
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#ff8c42] to-[#ff6b2b] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#ff8c42]/25 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Sign In
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                ⚡ Secure admin area • Unauthorized access is monitored
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" onClick={resetSessionTimer}>
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transform transition-all duration-300 animate-slide-in backdrop-blur-sm ${
              notification.type === 'success' 
                ? 'bg-green-500/90 text-white border-l-4 border-green-300'
                : notification.type === 'error'
                ? 'bg-red-500/90 text-white border-l-4 border-red-300'
                : 'bg-blue-500/90 text-white border-l-4 border-blue-300'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : notification.type === 'error' ? (
              <XCircle className="w-5 h-5" />
            ) : (
              <Bell className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        ))}
      </div>

      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ff8c42] to-[#ff6b2b] rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">Portfolio Admin</span>
              </div>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full font-medium">
                Live
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-[#ff8c42] to-[#ff6b2b] rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('cvs')}
                className={`px-6 py-4 font-medium text-sm transition-colors relative flex items-center gap-2 ${
                  activeTab === 'cvs'
                    ? 'text-[#ff8c42] border-b-2 border-[#ff8c42]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                CV Management
                {cvs.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                    {cvs.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 font-medium text-sm transition-colors relative flex items-center gap-2 ${
                  activeTab === 'contacts'
                    ? 'text-[#ff8c42] border-b-2 border-[#ff8c42]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Contact Messages
                {unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-[#ff8c42] text-white text-xs rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'cvs' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload CV Card */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload New CV</h3>
                  
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-[#ff8c42] transition-colors group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#ff8c42]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-[#ff8c42]" />
                    </div>
                    <label className="cursor-pointer">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        PDF only (max 5MB)
                      </span>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {uploading && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center gap-2 text-[#ff8c42]">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Upload your CV in PDF format. The file will be automatically optimized and made available for download.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CV List */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Uploaded CVs</h3>
                    <button 
                      onClick={fetchCVs}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Refresh"
                    >
                      <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <RefreshCw className="w-8 h-8 text-[#ff8c42] animate-spin mb-4" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Loading CVs...</p>
                    </div>
                  ) : cvs.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <File className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">No CVs uploaded yet</p>
                      <p className="text-xs text-gray-400">Upload your first CV to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                      {cvs.map((cv) => (
                        <div
                          key={cv._id}
                          className="group bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:border-[#ff8c42]"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="w-10 h-10 bg-[#ff8c42]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <File className="w-5 h-5 text-[#ff8c42]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white truncate" title={cv.originalName}>
                                  {cv.originalName}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(cv.uploadedAt).toLocaleDateString()}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(cv.uploadedAt).toLocaleTimeString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleDownloadCV(cv)}
                                className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                title="Download CV"
                              >
                                <DownloadIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCV(cv._id)}
                                disabled={isDeleting === cv._id}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                                title="Delete CV"
                              >
                                {isDeleting === cv._id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Contacts Tab */
              <div>
                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c42] dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c42] dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">All Messages</option>
                      <option value="unread">Unread Only</option>
                      <option value="read">Read Only</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 text-[#ff8c42] animate-spin mb-4" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Loading messages...</p>
                  </div>
                ) : filteredContacts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Mail className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">No messages found</p>
                    <p className="text-xs text-gray-400">Try adjusting your search or filter</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact._id}
                        className={`group bg-white dark:bg-gray-800 rounded-xl p-6 border-2 transition-all ${
                          !contact.read 
                            ? 'border-[#ff8c42] shadow-lg' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#ff8c42]/10 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-[#ff8c42]" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {contact.name}
                                </h3>
                              </div>
                              {!contact.read && (
                                <span className="px-2 py-1 bg-[#ff8c42] text-white text-xs rounded-full font-medium">
                                  New
                                </span>
                              )}
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {contact.email}
                              </span>
                            </div>
                            
                            <div className="mb-3">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject:</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{contact.subject}</span>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mb-3">
                              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {contact.message}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(contact.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {contact.read ? 'Read' : 'Unread'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex lg:flex-col gap-2 justify-end">
                            {!contact.read && (
                              <button
                                onClick={() => handleMarkAsRead(contact._id)}
                                disabled={isMarkingRead === contact._id}
                                className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors disabled:opacity-50"
                                title="Mark as read"
                              >
                                {isMarkingRead === contact._id ? (
                                  <RefreshCw className="w-5 h-5 animate-spin" />
                                ) : (
                                  <CheckCircle className="w-5 h-5" />
                                )}
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteContact(contact._id)}
                              disabled={isDeleting === contact._id}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete message"
                            >
                              {isDeleting === contact._id ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                              ) : (
                                <Trash2 className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions - Clean version */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => window.location.href = '/'}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#ff8c42] transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ff8c42]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Home className="w-5 h-5 text-[#ff8c42]" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">View Site</h4>
              </div>
            </div>
          </button>
        </div>

        {/* Session Indicator */}
        <div className="fixed bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Session active</span>
        </div>
      </div>
    </div>
  );
}

export default Admin;