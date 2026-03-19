import { useState, useEffect } from 'react';
import { Upload, Trash2, File, Mail, CheckCircle, XCircle } from 'lucide-react';

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

  useEffect(() => {
    if (isAuthenticated) {
      fetchCVs();
      fetchContacts();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        checkNewMessages();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleAuthenticate = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setPassword('');
      setMessage('');
    } else {
      setMessage('Invalid password');
    }
  };

  const fetchCVs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cv/list');
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
      const response = await fetch('http://localhost:5000/api/contact/list');
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
      const response = await fetch('http://localhost:5000/api/contact/unread-count');
      if (response.ok) {
        const data = await response.json();
        if (data.count > unreadCount) {
          showNotification(`${data.count - unreadCount} new message(s) received`, 'info');
          fetchContacts();
        }
      }
    } catch (error) {
      console.error('Error checking new messages:', error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

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
      const response = await fetch('http://localhost:5000/api/cv/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        showNotification('CV uploaded successfully', 'success');
        fetchCVs();
        e.target.value = '';
      } else {
        showNotification('Upload failed', 'error');
      }
    } catch (error) {
      showNotification('Error uploading file', 'error');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCV = async (id) => {
    if (window.confirm('Are you sure you want to delete this CV?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/cv/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          showNotification('CV deleted successfully', 'success');
          fetchCVs();
        } else {
          showNotification('Failed to delete CV', 'error');
        }
      } catch (error) {
        showNotification('Error deleting CV', 'error');
        console.error(error);
      }
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      console.log('Marking message as read. ID:', id);
      
      const response = await fetch(`http://localhost:5000/api/contact/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (response.ok && data.success) {
        setContacts(prevContacts => 
          prevContacts.map(contact => 
            contact._id === id ? { ...contact, read: true } : contact
          )
        );
        
        setUnreadCount(prev => Math.max(0, prev - 1));
        showNotification('Message marked as read', 'success');
      } else {
        showNotification(data.message || 'Failed to mark as read', 'error');
      }
    } catch (error) {
      console.error('Error updating message:', error);
      showNotification('Error updating message', 'error');
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/contact/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          const deletedContact = contacts.find(c => c._id === id);
          if (deletedContact && !deletedContact.read) {
            setUnreadCount(prev => Math.max(0, prev - 1));
          }
          
          setContacts(prevContacts => prevContacts.filter(c => c._id !== id));
          showNotification('Message deleted successfully', 'success');
        } else {
          showNotification('Failed to delete message', 'error');
        }
      } catch (error) {
        showNotification('Error deleting message', 'error');
        console.error(error);
      }
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
    return date.toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1a1a1a] py-24">
        <div className="max-w-md w-full mx-auto px-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Access</h1>
          <form onSubmit={handleAuthenticate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8c42] dark:bg-[#2a2a2a] dark:text-white"
                placeholder="Enter password"
              />
            </div>
            {message && <p className="text-red-500 text-sm">{message}</p>}
            <button
              type="submit"
              className="w-full px-6 py-2 bg-[#ff8c42] text-white rounded-lg hover:bg-[#ff7a28] transition-all duration-300"
            >
              Sign In
            </button>
          </form>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Default password: admin123
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-[#1a1a1a] py-24 relative">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in ${
              notification.type === 'success' 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border-l-4 border-green-500'
                : notification.type === 'error'
                ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border-l-4 border-red-500'
                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-l-4 border-blue-500'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : notification.type === 'error' ? (
              <XCircle className="w-5 h-5" />
            ) : (
              <Mail className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 bg-[#ff8c42] text-white px-3 py-1 rounded-full text-sm">
                <Mail className="w-4 h-4" />
                <span>{unreadCount} unread</span>
              </div>
            )}
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setCVs([]);
                setContacts([]);
              }}
              className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('cvs')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'cvs'
                ? 'text-[#ff8c42] border-b-2 border-[#ff8c42]'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            CV Management
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 font-medium transition-colors relative flex items-center gap-2 ${
              activeTab === 'contacts'
                ? 'text-[#ff8c42] border-b-2 border-[#ff8c42]'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Contact Messages
            {unreadCount > 0 && (
              <span className="bg-[#ff8c42] text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'cvs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 dark:bg-[#2a2a2a] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Upload CV</h2>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <label className="cursor-pointer">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Click to upload or drag and drop
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">PDF up to 5MB</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploading && (
                  <div className="text-center text-gray-600 dark:text-gray-400">
                    Uploading...
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-[#2a2a2a] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Uploaded CVs</h2>

              {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
              ) : cvs.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No CVs uploaded yet</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {cvs.map((cv) => (
                    <div
                      key={cv._id}
                      className="flex items-center justify-between p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <File className="w-5 h-5 text-[#ff8c42]" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {cv.originalName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(cv.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCV(cv._id)}
                        className="ml-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete CV"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-[#2a2a2a] p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              Contact Messages
              {unreadCount > 0 && (
                <span className="text-sm bg-[#ff8c42] text-white px-2 py-1 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </h2>

            {loading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : contacts.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No messages yet</p>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className={`p-6 bg-white dark:bg-[#1a1a1a] rounded-lg border ${
                      !contact.read 
                        ? 'border-[#ff8c42] dark:border-[#ff8c42]' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {contact.name}
                          </h3>
                          {!contact.read && (
                            <span className="bg-[#ff8c42] text-white text-xs px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {contact.email}
                        </p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Subject: {contact.subject}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                          {contact.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                          {formatDate(contact.createdAt)}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {!contact.read && (
                          <button
                            onClick={() => handleMarkAsRead(contact._id)}
                            className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-5 h-5" />
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
    </section>
  );
}

export default Admin;