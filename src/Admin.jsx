import React, { useState, useEffect } from 'react';
import { Database, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/contacts');
        if (!response.ok) {
          throw new Error('Failed to fetch contact submissions');
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container flex-header">
          <div className="admin-title">
            <Database className="admin-icon" size={28} />
            <h1>Admin Dashboard</h1>
          </div>
          <Link to="/" className="btn btn-secondary back-btn">
            <ArrowLeft size={18} /> Back to Website
          </Link>
        </div>
      </div>

      <div className="container admin-content">
        <div className="admin-panel glass">
          <div className="panel-header">
            <h2>Contact Submissions {contacts.length > 0 && `(${contacts.length})`}</h2>
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search contacts..." className="search-input" />
            </div>
          </div>

          <div className="table-responsive">
            {loading ? (
              <div className="admin-state">Loading submissions...</div>
            ) : error ? (
              <div className="admin-state error">{error}</div>
            ) : contacts.length === 0 ? (
              <div className="admin-state">No contacts found in the database.</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td className="time-col">{new Date(contact.created_at).toLocaleString()}</td>
                      <td className="strong">{contact.name}</td>
                      <td><a href={`mailto:${contact.email}`} className="email-link">{contact.email}</a></td>
                      <td>{contact.company || <span className="text-muted">-</span>}</td>
                      <td className="message-col">{contact.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
