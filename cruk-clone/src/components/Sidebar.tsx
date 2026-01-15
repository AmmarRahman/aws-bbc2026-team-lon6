import React from 'react';
import { useContent } from '../contexts/ContentContext';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const { content, generateAllContent, suggestedLinks, currentUser, isLoading, error } = useContent();

  const handleGenerate = () => {
    generateAllContent();
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">AI Personalization</h2>
        <p className="sidebar-description">
          Click "Generate Content" to get personalized recommendations from our AI agent.
        </p>
      </div>
      
      <div className="sidebar-actions">
        <button 
          className="btn-generate" 
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Generate Content'}
        </button>
        <button className="btn-reset" onClick={handleReset}>
          Reset to Original
        </button>
      </div>

      {error && (
        <div style={{ 
          padding: '10px', 
          background: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginBottom: '15px',
          fontSize: '14px',
          color: '#c00'
        }}>
          Error: {error}
        </div>
      )}

      {currentUser && (
        <div style={{ 
          padding: '10px', 
          background: '#e8f5e9', 
          border: '1px solid #4caf50',
          borderRadius: '4px',
          marginBottom: '15px',
          fontSize: '14px'
        }}>
          <strong>Current User:</strong> {currentUser}
        </div>
      )}

      {suggestedLinks.length > 0 && (
        <div className="suggested-links">
          <h3>Suggested Links</h3>
          {suggestedLinks.map((link, index) => (
            <div key={index} className="suggested-link-item">
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="suggested-link-title"
              >
                {link.title}
              </a>
              <p className="suggested-link-description">{link.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="content-preview">
        <h3>Active Content ({Object.keys(content).length} items)</h3>
        {Object.entries(content).slice(0, 5).map(([key, value]) => (
          <div key={key} className="content-item">
            <span className="content-item-id">{key}</span>
            <span className="content-item-text">
              {value.length > 50 ? `${value.substring(0, 50)}...` : value}
            </span>
          </div>
        ))}
        {Object.keys(content).length > 5 && (
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            ...and {Object.keys(content).length - 5} more
          </p>
        )}
      </div>
    </div>
  );
};
