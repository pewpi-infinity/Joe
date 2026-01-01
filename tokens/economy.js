/**
 * Token Economy System
 * Implements Mario-themed token tracking (🧱 base + 🍄 growth + ⭐ acceleration)
 */

class TokenEconomy {
  constructor() {
    this.storageKey = 'infinity_token_economy';
    this.config = {
      baseValue: 10,        // 🧱 Base value
      growthMultiplier: 2,  // 🍄 Growth multiplier
      starMultiplier: 3,    // ⭐ Star multiplier
      pageUsageWeight: 0.5,
      featureWeight: 1.0,
      aiInteractionCost: 1
    };
    this.loadState();
  }

  /**
   * Load token state from localStorage
   */
  loadState() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      this.state = stored ? JSON.parse(stored) : this.getDefaultState();
    } catch (error) {
      console.error('Error loading token state:', error);
      this.state = this.getDefaultState();
    }
  }

  /**
   * Get default token state
   */
  getDefaultState() {
    return {
      pages: {},
      userTokens: 0,
      totalInteractions: 0,
      lastUpdate: Date.now()
    };
  }

  /**
   * Save token state to localStorage
   */
  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (error) {
      console.error('Error saving token state:', error);
    }
  }

  /**
   * Initialize or get page token data
   */
  getPageData(pageName) {
    if (!this.state.pages[pageName]) {
      this.state.pages[pageName] = {
        name: pageName,
        baseValue: this.config.baseValue,
        views: 0,
        interactions: 0,
        aiQueries: 0,
        features: [],
        createdAt: Date.now(),
        lastAccessed: Date.now()
      };
      this.saveState();
    }
    return this.state.pages[pageName];
  }

  /**
   * Calculate token value for a page
   * Formula: (base 🧱 + growth 🍄 + acceleration ⭐)
   */
  calculatePageValue(pageName) {
    const page = this.getPageData(pageName);
    
    // Base value (🧱)
    const base = page.baseValue;
    
    // Growth value (🍄) - based on usage
    const growth = Math.floor(
      (page.views * this.config.pageUsageWeight) + 
      (page.interactions * this.config.featureWeight)
    );
    
    // Star value (⭐) - acceleration based on AI interactions
    const star = Math.floor(page.aiQueries * this.config.aiInteractionCost);
    
    return {
      total: base + growth + star,
      breakdown: {
        base: base,
        growth: growth,
        star: star
      },
      emoji: `🧱${base} + 🍄${growth} + ⭐${star}`
    };
  }

  /**
   * Record page view
   */
  recordPageView(pageName) {
    const page = this.getPageData(pageName);
    page.views++;
    page.lastAccessed = Date.now();
    this.saveState();
    return this.calculatePageValue(pageName);
  }

  /**
   * Record page interaction (feature use)
   */
  recordInteraction(pageName, feature = '') {
    const page = this.getPageData(pageName);
    page.interactions++;
    if (feature && !page.features.includes(feature)) {
      page.features.push(feature);
    }
    page.lastAccessed = Date.now();
    this.saveState();
    return this.calculatePageValue(pageName);
  }

  /**
   * Record AI query
   */
  recordAIQuery(pageName) {
    const page = this.getPageData(pageName);
    page.aiQueries++;
    this.state.totalInteractions++;
    page.lastAccessed = Date.now();
    this.saveState();
    return this.calculatePageValue(pageName);
  }

  /**
   * Get all page values
   */
  getAllPageValues() {
    const pages = {};
    for (const pageName in this.state.pages) {
      pages[pageName] = this.calculatePageValue(pageName);
    }
    return pages;
  }

  /**
   * Add tokens to user balance
   */
  addUserTokens(amount) {
    this.state.userTokens += amount;
    this.saveState();
    return this.state.userTokens;
  }

  /**
   * Deduct tokens from user balance
   */
  deductUserTokens(amount) {
    if (this.state.userTokens >= amount) {
      this.state.userTokens -= amount;
      this.saveState();
      return { success: true, balance: this.state.userTokens };
    }
    return { success: false, balance: this.state.userTokens, error: 'Insufficient tokens' };
  }

  /**
   * Get user token balance
   */
  getUserBalance() {
    return this.state.userTokens;
  }

  /**
   * Check if user can afford page access
   */
  canAffordPage(pageName) {
    const pageValue = this.calculatePageValue(pageName);
    return this.state.userTokens >= pageValue.total;
  }

  /**
   * Purchase page access
   */
  purchasePageAccess(pageName) {
    const pageValue = this.calculatePageValue(pageName);
    const result = this.deductUserTokens(pageValue.total);
    if (result.success) {
      const page = this.getPageData(pageName);
      page.purchased = true;
      page.purchaseDate = Date.now();
      this.saveState();
      return { success: true, value: pageValue, balance: result.balance };
    }
    return { success: false, error: result.error };
  }

  /**
   * Check if user has designer access
   * Designer access granted when user purchases tokens
   */
  hasDesignerAccess() {
    return this.state.userTokens > 0 || this.isAdmin();
  }

  /**
   * Check if user is admin
   * Admins bypass all token requirements
   */
  isAdmin() {
    // Check if user has admin role
    try {
      const session = sessionStorage.getItem('infinity_user_session');
      if (session) {
        const userData = JSON.parse(session);
        return userData.role === 'admin';
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
    return false;
  }

  /**
   * Get statistics
   */
  getStats() {
    const pageValues = this.getAllPageValues();
    const totalValue = Object.values(pageValues).reduce(
      (sum, page) => sum + page.total, 0
    );

    return {
      totalPages: Object.keys(this.state.pages).length,
      totalValue: totalValue,
      userBalance: this.state.userTokens,
      totalInteractions: this.state.totalInteractions,
      isAdmin: this.isAdmin(),
      hasDesignerAccess: this.hasDesignerAccess()
    };
  }

  /**
   * Reset all data (admin only)
   */
  reset() {
    if (this.isAdmin()) {
      this.state = this.getDefaultState();
      this.saveState();
      return { success: true };
    }
    return { success: false, error: 'Admin access required' };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TokenEconomy;
}

// Make available globally
if (typeof window !== 'undefined') {
  window.TokenEconomy = TokenEconomy;
}
