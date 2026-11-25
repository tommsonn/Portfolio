import React, { useState, useEffect } from 'react';
import { 
  Upload, Trash2, File, Mail, CheckCircle, XCircle, 
  LogOut, Home, Settings, Download, Search, Filter,
  Bell, User, Calendar, Clock, AlertCircle, Eye,
  Download as DownloadIcon, RefreshCw, ChevronDown,
  PieChart, MessageSquare, FileText, Shield, Activity,
  Info, Lock, TrendingUp, Users, Briefcase, Star,
  Zap, Globe, Coffee, Heart
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
  const [stats, setStats] = useState({
    totalCVs: 0,
    totalMessages: 0,
    unreadMessages: 0,
    thisWeek: 0
  });

  // Use environment variable for API URL or fallback to localhost for development
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

  useEffect(() => {
    if (isAuthenticated && contacts.length > 0 && cvs.length > 0) {
      const thisWeek = contacts.filter(c => {
        const date = new Date(c.createdAt);
        const now = new Date();
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return date > weekAgo;
      }).length;
      
      setStats({
        totalCVs: cvs.length,
        totalMessages: contacts.length,
        unreadMessages: unreadCount,
        thisWeek: thisWeek
      });
    }
  }, [cvs, contacts, unreadCount]);

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

    const formData = new FormData();
    formData.append('cv', file);

    try {
      setUploading(true);
      const response = await fetch(`${API_BASE_URL}/cv/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        showNotification('CV uploaded successfully!', 'success');
        fetchCVs();
        resetSessionTimer();
        if (e.target) e.target.value = '';
      } else {
        const error = await response.json();
        showNotification(error.error || 'Upload failed', 'error');
      }
    } catch (error) {
      console.error('Upload error:', error);
      showNotification('Error uploading file. Please try again.', 'error');
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
        showNotification(error.error || 'Failed to delete CV', 'error');
      }
    } catch (error) {
      showNotification('Error deleting CV', 'error');
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleViewCV = (cv) => {
    try {
      window.open(`${API_BASE_URL}/cv/download/${cv._id}`, '_blank');
    } catch (error) {
      showNotification('Error opening CV', 'error');
      console.error(error);
    }
  };

  const handleDownloadCV = (cv) => {
    try {
      showNotification('Downloading CV...', 'info');
      window.open(`${API_BASE_URL}/cv/download/${cv._id}`, '_blank');
    } catch (error) {
      showNotification('Error downloading CV', 'error');
      console.error(error);
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

  // Handle user activity to reset session timer
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

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg animate-pulse">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
              <p className="text-slate-400">Secure access to your portfolio dashboard</p>
            </div>
            
            <form onSubmit={handleAuthenticate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    autoFocus
                  />
                  <Lock className="absolute right-4 top-3.5 w-5 h-5 text-slate-400" />
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
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Sign In
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                ⚡ Secure admin area • Unauthorized access is monitored
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" onClick={resetSessionTimer}>
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transform transition-all duration-300 animate-slide-in backdrop-blur-sm ${
              notification.type === 'success' 
                ? 'bg-emerald-500/90 text-white border-l-4 border-emerald-300'
                : notification.type === 'error'
                ? 'bg-red-500/90 text-white border-l-4 border-red-300'
                : 'bg-indigo-500/90 text-white border-l-4 border-indigo-300'
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
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">Portfolio Admin</span>
              </div>
              <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-full font-medium animate-pulse">
                Live
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Stats Badge */}
              <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stats.totalCVs}</span>
                </div>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stats.totalMessages}</span>
                </div>
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  )}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-slideDown">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                      <p className="text-xs text-gray-500 mt-1">Latest updates from your portfolio</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {contacts.slice(0, 5).map(contact => (
                        <div key={contact._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium text-gray-900 dark:text-white">{contact.name}</span> sent a message
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{formatDate(contact.createdAt)}</p>
                            </div>
                            {!contact.read && (
                              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                            )}
                          </div>
                        </div>
                      ))}
                      {contacts.length === 0 && (
                        <div className="p-8 text-center">
                          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">No recent activity</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Super Administrator</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total CVs</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCVs}</p>
                <p className="text-xs text-gray-500 mt-2">Uploaded documents</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalMessages}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stats.thisWeek} this week
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Unread Messages</p>
                <p className="text-3xl font-bold text-indigo-600">{stats.unreadMessages}</p>
                <p className="text-xs text-gray-500 mt-2">Waiting for response</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-sm p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-100 mb-1">Active Session</p>
                <p className="text-3xl font-bold">Live</p>
                <p className="text-xs text-indigo-200 mt-2">Activity resets timer</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('cvs')}
                className={`px-6 py-4 font-medium text-sm transition-colors relative flex items-center gap-2 ${
                  activeTab === 'cvs'
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500'
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
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Contact Messages
                {unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-indigo-500 text-white text-xs rounded-full animate-pulse">
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
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-indigo-500" />
                    Upload New CV
                  </h3>
                  
                  <input
                    type="file"
                    id="cv-upload-input"
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  
                  <label
                    htmlFor="cv-upload-input"
                    className={`flex flex-col items-center justify-center w-full min-h-[240px] border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                      uploading 
                        ? 'border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800 cursor-not-allowed opacity-60'
                        : 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 dark:border-gray-600 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/10 group'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                      <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        uploading 
                          ? 'bg-gray-200 dark:bg-gray-700' 
                          : 'bg-indigo-100 dark:bg-indigo-900/30 group-hover:scale-110'
                      }`}>
                        <Upload className={`w-8 h-8 ${uploading ? 'text-gray-400' : 'text-indigo-500'}`} />
                      </div>
                      <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {uploading ? 'Uploading...' : 'Click to upload your CV'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF files only (Max 5MB)
                      </p>
                      {!uploading && (
                        <p className="mt-2 text-xs text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          Click or drag and drop
                        </p>
                      )}
                    </div>
                  </label>
                  
                  {uploading && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center gap-2 text-indigo-500">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Uploading your CV...</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Upload your CV in PDF format. The file will be automatically saved and users can download it from the homepage.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CV List */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-500" />
                      Uploaded CVs
                    </h3>
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
                      <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Loading CVs...</p>
                    </div>
                  ) : cvs.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <File className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">No CVs uploaded yet</p>
                      <p className="text-xs text-gray-400">Upload your first CV using the form on the left</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                      {cvs.map((cv) => (
                        <div
                          key={cv._id}
                          className="group bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:border-indigo-500"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <File className="w-5 h-5 text-indigo-500" />
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
                                onClick={() => handleViewCV(cv)}
                                className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                                title="View CV"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
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
                      placeholder="Search messages by name, email, or subject..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">All Messages</option>
                      <option value="unread">Unread Only</option>
                      <option value="read">Read Only</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
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
                        className={`group bg-white dark:bg-gray-800 rounded-xl p-6 border-2 transition-all hover:shadow-lg ${
                          !contact.read 
                            ? 'border-indigo-500 shadow-lg' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-indigo-500" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {contact.name}
                                </h3>
                              </div>
                              {!contact.read && (
                                <span className="px-2 py-1 bg-indigo-500 text-white text-xs rounded-full font-medium animate-pulse">
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
                                className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors disabled:opacity-50"
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <a 
            href="/"
            className="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition-all text-left block hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Home className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">View Site</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Return to portfolio homepage</p>
              </div>
            </div>
          </a>
          
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-200 dark:bg-indigo-800/30 rounded-lg flex items-center justify-center">
                <Coffee className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Stay Productive</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Keep up the great work!</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-200 dark:bg-blue-800/30 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Portfolio Active</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">All systems operational</p>
              </div>
            </div>
          </div>
        </div>

        {/* Session Indicator */}
        <div className="fixed bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Session active • Activity resets timer</span>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4f46e5;
        }
        
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
        }
      `}</style>
    </div>
  );
}

export default Admin;
