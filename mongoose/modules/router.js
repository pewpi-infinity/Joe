/**
 * Mongoose OS AI Router Module
 * Handles AI query routing and token-based metering
 */

class MongooseRouter {
  constructor(config) {
    this.config = config || {};
    this.endpoints = this.config.endpoints || {
      ask: '/router/ask',
      auth: '/router/auth'
    };
    this.tokenSystem = this.config.tokenSystem || {
      enabled: true,
      costPerQuery: 1
    };
  }

  /**
   * Send AI query to Mongoose OS
   * @param {string} repo - Repository name
   * @param {string} query - User query
   * @returns {Promise<Object>} Response with answer and token info
   */
  async ask(repo, query) {
    try {
      const response = await fetch(this.endpoints.ask, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          repo: repo,
          query: query,
          timestamp: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Track token usage if enabled
      if (this.tokenSystem.enabled && data.token) {
        this.trackTokenUsage(data.token);
      }

      return {
        ok: true,
        repo: repo,
        answer: data.answer || 'No response from Mongoose OS',
        token: data.token || null
      };
    } catch (error) {
      console.error('Mongoose Router Error:', error);
      return {
        ok: false,
        error: error.message,
        fallbackAnswer: this.getFallbackResponse(query)
      };
    }
  }

  /**
   * Authenticate user with Mongoose OS backend
   * @param {Object} credentials - User credentials
   * @returns {Promise<Object>} Authentication result
   */
  async authenticate(credentials) {
    try {
      const response = await fetch(this.endpoints.auth, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status}`);
      }

      const data = await response.json();
      return {
        ok: true,
        ...data
      };
    } catch (error) {
      console.error('Mongoose Auth Error:', error);
      return {
        ok: false,
        error: error.message
      };
    }
  }

  /**
   * Track token usage for queries
   * @param {Object} tokenInfo - Token information from response
   */
  trackTokenUsage(tokenInfo) {
    const usage = this.getTokenUsage() || [];
    usage.push({
      ...tokenInfo,
      timestamp: Date.now()
    });
    
    // Keep last 100 entries
    if (usage.length > 100) {
      usage.shift();
    }
    
    localStorage.setItem('mongoose_token_usage', JSON.stringify(usage));
  }

  /**
   * Get token usage history
   * @returns {Array} Token usage history
   */
  getTokenUsage() {
    try {
      const usage = localStorage.getItem('mongoose_token_usage');
      return usage ? JSON.parse(usage) : [];
    } catch (error) {
      console.error('Error reading token usage:', error);
      return [];
    }
  }

  /**
   * Calculate total tokens used
   * @returns {number} Total tokens used
   */
  getTotalTokensUsed() {
    const usage = this.getTokenUsage();
    return usage.reduce((total, entry) => {
      return total + (entry.value || this.tokenSystem.costPerQuery);
    }, 0);
  }

  /**
   * Get fallback response when Mongoose OS is unavailable
   * @param {string} query - User query
   * @returns {string} Fallback response
   */
  getFallbackResponse(query) {
    return `I received your query: "${query}". However, the Mongoose OS AI backend is currently unavailable. Please try again later or check your connection.`;
  }

  /**
   * Check if Mongoose OS is available
   * @returns {Promise<boolean>} Availability status
   */
  async checkAvailability() {
    try {
      const response = await fetch(this.endpoints.ask, {
        method: 'HEAD'
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MongooseRouter;
}

// Make available globally for browser
if (typeof window !== 'undefined') {
  window.MongooseRouter = MongooseRouter;
}
