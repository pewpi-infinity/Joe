// Mongoose OS AI Firmware Client Library
// Handles communication with Mongoose OS for AI-powered features

class MongooseClient {
  constructor(config = {}) {
    this.config = {
      endpoint: config.endpoint || '/mongoose/api',
      mode: config.mode || 'passive',
      operator: config.operator || 'Unknown',
      ...config
    };
    
    this.loadConfig();
  }

  // Load Mongoose configuration
  async loadConfig() {
    try {
      const response = await fetch('/mongoose/mongoose.json');
      const config = await response.json();
      this.config = { ...this.config, ...config };
    } catch (error) {
      console.warn('Could not load Mongoose config, using defaults:', error);
    }
  }

  // Authenticate with Mongoose OS
  async authenticate(credentials) {
    try {
      const response = await fetch(`${this.config.endpoint}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Mongoose-Operator': this.config.operator
        },
        body: JSON.stringify({
          ...credentials,
          mode: this.config.mode,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        return { success: false, error: 'Authentication failed' };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Mongoose authentication error:', error);
      return { success: false, error: error.message };
    }
  }

  // Query Mongoose AI
  async query(message, context = {}) {
    try {
      const authToken = window.InfinityAuth?.getAuthToken();
      
      const response = await fetch(`${this.config.endpoint}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': authToken || '',
          'X-Mongoose-Operator': this.config.operator
        },
        body: JSON.stringify({
          query: message,
          context: {
            ...context,
            user: window.InfinityAuth?.getUserInfo(),
            timestamp: new Date().toISOString()
          },
          mode: this.config.mode
        })
      });

      if (!response.ok) {
        return { 
          ok: false, 
          error: 'Query failed',
          answer: 'Mongoose OS connection error. Using fallback response.'
        };
      }

      const data = await response.json();
      return { ok: true, ...data };
    } catch (error) {
      console.error('Mongoose query error:', error);
      return {
        ok: false,
        error: error.message,
        answer: 'Mongoose OS is currently unavailable. Please try again later.'
      };
    }
  }

  // Get token from Mongoose
  async getToken(repo, action = 'query') {
    try {
      const response = await fetch(`${this.config.endpoint}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Mongoose-Operator': this.config.operator
        },
        body: JSON.stringify({
          repo,
          action,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Mongoose token error:', error);
      return null;
    }
  }

  // Chat with Mongoose OS (combines query + token)
  async chat(repo, query, context = {}) {
    const queryResult = await this.query(query, { ...context, repo });
    
    if (queryResult.ok && !queryResult.token) {
      // Get token separately if not included
      const token = await this.getToken(repo, 'chat');
      if (token) {
        queryResult.token = token;
      }
    }

    return queryResult;
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.config.endpoint}/health`, {
        method: 'GET',
        headers: {
          'X-Mongoose-Operator': this.config.operator
        }
      });

      if (!response.ok) {
        return { healthy: false, status: 'unreachable' };
      }

      const data = await response.json();
      return { healthy: true, ...data };
    } catch (error) {
      return { healthy: false, status: 'error', error: error.message };
    }
  }

  // Offline fallback response
  getOfflineFallback(query) {
    const responses = {
      'hello': 'Hello! Mongoose OS is in offline mode.',
      'help': 'Mongoose OS provides AI-powered responses. Currently in offline mode.',
      'status': 'Mongoose OS is operating in passive mode.'
    };

    const q = query.toLowerCase().trim();
    for (const [key, value] of Object.entries(responses)) {
      if (q.includes(key)) {
        return value;
      }
    }

    return `I received your message: "${query}". Mongoose OS is currently in ${this.config.mode} mode.`;
  }
}

// Create singleton instance
window.MongooseClient = new MongooseClient();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MongooseClient;
}
