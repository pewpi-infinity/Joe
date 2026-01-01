// Infinity AI-to-AI Encrypted Authentication Library
// Shared across all pages for consistent authentication

const STORAGE_KEYS = {
  USER_DATA: 'infinity_user_encrypted',
  USER_SESSION: 'infinity_session',
  ENCRYPTION_SALT: 'infinity_salt',
  AUTH_TOKEN: 'infinity_auth_token'
};

// Infinity Authentication Module
const InfinityAuth = {
  // Derive encryption key from passphrase
  async deriveKey(passphrase, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(passphrase),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );
    
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode(salt),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
    
    return key;
  },

  // Encrypt data with AES-GCM
  async encryptData(data, key) {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encryptedContent = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encoder.encode(data)
    );
    
    const encryptedArray = new Uint8Array(iv.length + encryptedContent.byteLength);
    encryptedArray.set(iv, 0);
    encryptedArray.set(new Uint8Array(encryptedContent), iv.length);
    
    return btoa(String.fromCharCode(...encryptedArray));
  },

  // Decrypt data with AES-GCM
  async decryptData(encryptedBase64, key) {
    const encryptedArray = new Uint8Array(
      atob(encryptedBase64).split('').map(char => char.charCodeAt(0))
    );
    
    const iv = encryptedArray.slice(0, 12);
    const encryptedContent = encryptedArray.slice(12);
    
    const decryptedContent = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encryptedContent
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decryptedContent);
  },

  // Generate auth token
  async generateAuthToken(userData) {
    const tokenData = {
      userId: userData.userId,
      email: userData.email,
      timestamp: Date.now(),
      random: Math.random().toString(36)
    };
    
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(tokenData));
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  },

  // Generate user ID
  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Generate salt
  generateSalt() {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  // Create user session
  async createSession(userData) {
    const sessionData = {
      userId: userData.userId,
      email: userData.email,
      username: userData.username,
      role: userData.role,
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      settings: userData.settings
    };
    
    sessionStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(sessionData));
    
    const authToken = await this.generateAuthToken(userData);
    sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
    
    localStorage.setItem('infinity_user', JSON.stringify({
      email: userData.email,
      username: userData.username,
      lastLogin: new Date().toISOString()
    }));
  },

  // Get current session
  getSession() {
    const session = sessionStorage.getItem(STORAGE_KEYS.USER_SESSION);
    return session ? JSON.parse(session) : null;
  },

  // Get auth token
  getAuthToken() {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // Check if authenticated
  isAuthenticated() {
    const session = this.getSession();
    if (!session) return false;
    
    const expiresAt = new Date(session.expiresAt);
    return expiresAt > new Date();
  },

  // Logout
  logout() {
    sessionStorage.clear();
    window.location.href = '/';
  },

  // Get user info
  getUserInfo() {
    const session = this.getSession();
    if (!session) return null;
    
    return {
      userId: session.userId,
      email: session.email,
      username: session.username,
      role: session.role,
      settings: session.settings
    };
  },

  // Sign up new user
  async signup(email, username, passphrase) {
    const salt = this.generateSalt();
    localStorage.setItem(STORAGE_KEYS.ENCRYPTION_SALT, salt);
    
    const encryptionKey = await this.deriveKey(passphrase, salt);
    
    const userData = {
      email: email,
      username: username,
      createdAt: new Date().toISOString(),
      userId: this.generateUserId(),
      role: 'user',
      settings: {
        theme: 'auto',
        notifications: true
      }
    };
    
    const encryptedData = await this.encryptData(JSON.stringify(userData), encryptionKey);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, encryptedData);
    
    await this.createSession(userData);
    
    return { success: true, user: userData };
  },

  // Login existing user
  async login(email, username, passphrase) {
    const encryptedData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    const salt = localStorage.getItem(STORAGE_KEYS.ENCRYPTION_SALT);
    
    if (!encryptedData || !salt) {
      return { success: false, error: 'No account found' };
    }
    
    try {
      const encryptionKey = await this.deriveKey(passphrase, salt);
      const decryptedData = await this.decryptData(encryptedData, encryptionKey);
      const userData = JSON.parse(decryptedData);
      
      if (userData.email !== email) {
        return { success: false, error: 'Invalid credentials' };
      }
      
      await this.createSession(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: 'Invalid credentials or passphrase' };
    }
  },

  // Require authentication - redirect to login if not authenticated
  requireAuth(redirectUrl = null) {
    if (!this.isAuthenticated()) {
      const currentUrl = redirectUrl || window.location.href;
      const loginUrl = `/index.html?redirect=${encodeURIComponent(currentUrl)}`;
      window.location.href = loginUrl;
      return false;
    }
    return true;
  }
};

// Expose globally
window.InfinityAuth = InfinityAuth;
