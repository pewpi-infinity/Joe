/**
 * C13B0 Chat Widget - Universal Component
 * Mongoose OS AI-powered chat widget for all pages
 */

(function() {
  'use strict';

  // Widget configuration
  const config = {
    position: 'bottom-right',
    theme: 'dark',
    mongooseEndpoint: '/router/ask',
    persistSession: true,
    fabText: '🧱💬🧱 CHAT',
    headerTitle: '🧱💬🧱 Mongoose AI',
    placeholder: 'Ask Mongoose AI... (tokenized responses)'
  };

  // Create widget HTML
  function createWidgetHTML() {
    return `
      <style>
        .c13b0-chatfab {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 99999;
          border-radius: 999px;
          padding: 12px 14px;
          font-weight: 700;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          user-select: none;
          background: rgba(0, 0, 0, 0.82);
          color: white;
          border: 1px solid rgba(31, 111, 255, 0.3);
          transition: all 0.2s;
        }
        .c13b0-chatfab:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 35px rgba(31, 111, 255, 0.4);
        }
        .c13b0-chatpanel {
          position: fixed;
          right: 18px;
          bottom: 72px;
          width: min(520px, calc(100vw - 36px));
          height: min(560px, calc(100vh - 120px));
          z-index: 99999;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
          display: none;
          background: rgba(0, 0, 0, 0.90);
          border: 1px solid rgba(31, 111, 255, 0.2);
        }
        .c13b0-chatpanel.open {
          display: flex;
          flex-direction: column;
        }
        .c13b0-chathead {
          padding: 10px 12px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.10);
          color: white;
        }
        .c13b0-chatbody {
          height: calc(100% - 94px);
          overflow: auto;
          padding: 10px 12px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 13px;
          color: white;
        }
        .c13b0-chatline {
          white-space: pre-wrap;
          margin: 8px 0;
          padding: 6px 8px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
        }
        .c13b0-chatline.user {
          background: rgba(31, 111, 255, 0.2);
          border-left: 3px solid #1f6fff;
        }
        .c13b0-chatline.ai {
          background: rgba(37, 99, 235, 0.15);
          border-left: 3px solid #2563eb;
        }
        .c13b0-chatline.token {
          background: rgba(255, 215, 0, 0.1);
          border-left: 3px solid #ffd700;
          font-weight: 600;
        }
        .c13b0-chatbar {
          display: flex;
          gap: 8px;
          padding: 10px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.10);
        }
        .c13b0-chatin {
          flex: 1;
          border-radius: 12px;
          padding: 10px 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          outline: none;
          background: rgba(255, 255, 255, 0.06);
          color: white;
        }
        .c13b0-chatbtn {
          border-radius: 12px;
          padding: 10px 12px;
          font-weight: 800;
          border: 0;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.14);
          color: white;
          transition: all 0.2s;
        }
        .c13b0-chatbtn:hover {
          background: rgba(31, 111, 255, 0.5);
        }
        .c13b0-repo-badge {
          font-size: 11px;
          opacity: 0.8;
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
        }
        @media (max-width: 768px) {
          .c13b0-chatpanel {
            right: 10px;
            bottom: 70px;
            width: calc(100vw - 20px);
            height: calc(100vh - 140px);
          }
        }
      </style>
      
      <div id="c13b0_chat_fab" class="c13b0-chatfab">${config.fabText}</div>
      
      <div id="c13b0_chat_panel" class="c13b0-chatpanel" role="dialog" aria-label="Mongoose AI Chat">
        <div class="c13b0-chathead">
          <div>${config.headerTitle}</div>
          <div style="display:flex;gap:8px;align-items:center">
            <span class="c13b0-repo-badge" id="c13b0_chat_repo">repo: loading...</span>
            <button id="c13b0_chat_close" class="c13b0-chatbtn">✕</button>
          </div>
        </div>
        <div id="c13b0_chat_body" class="c13b0-chatbody"></div>
        <div class="c13b0-chatbar">
          <input id="c13b0_chat_in" class="c13b0-chatin" placeholder="${config.placeholder}" />
          <button id="c13b0_chat_send" class="c13b0-chatbtn">SEND</button>
        </div>
      </div>
    `;
  }

  // Widget functionality
  class C13B0ChatWidget {
    constructor() {
      this.repo = this.detectRepo();
      this.sessionKey = 'c13b0_chat_history_' + this.repo;
      this.init();
    }

    detectRepo() {
      // Try to detect repo from URL or page context
      const pathParts = window.location.pathname.split('/');
      const repo = pathParts[1] || 'Joe';
      return repo.trim() || 'Joe';
    }

    init() {
      // Inject widget HTML
      const container = document.createElement('div');
      container.innerHTML = createWidgetHTML();
      document.body.appendChild(container);

      // Get elements
      this.fab = document.getElementById('c13b0_chat_fab');
      this.panel = document.getElementById('c13b0_chat_panel');
      this.body = document.getElementById('c13b0_chat_body');
      this.input = document.getElementById('c13b0_chat_in');
      this.sendBtn = document.getElementById('c13b0_chat_send');
      this.closeBtn = document.getElementById('c13b0_chat_close');
      this.repoLabel = document.getElementById('c13b0_chat_repo');

      // Update repo label
      this.repoLabel.textContent = `repo: ${this.repo}`;

      // Setup event listeners
      this.setupEventListeners();

      // Load chat history
      this.loadHistory();

      // Welcome message
      if (this.body.children.length === 0) {
        this.addMessage('ai', 'Hello! I\'m Mongoose AI. Ask me anything about this repository!');
      }
    }

    setupEventListeners() {
      this.fab.addEventListener('click', () => this.open());
      this.closeBtn.addEventListener('click', () => this.close());
      this.sendBtn.addEventListener('click', () => this.sendMessage());
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });

      // Close on outside click
      window.addEventListener('click', (e) => {
        if (this.panel.classList.contains('open')) {
          if (!this.panel.contains(e.target) && e.target !== this.fab) {
            this.close();
          }
        }
      });
    }

    open() {
      this.panel.classList.add('open');
      this.input.focus();
    }

    close() {
      this.panel.classList.remove('open');
    }

    addMessage(type, text) {
      const div = document.createElement('div');
      div.className = `c13b0-chatline ${type}`;
      div.textContent = text;
      this.body.appendChild(div);
      this.body.scrollTop = this.body.scrollHeight;
      this.saveHistory();
    }

    async sendMessage() {
      const query = this.input.value.trim();
      if (!query) return;

      // Display user message
      this.addMessage('user', `> ${query}`);
      this.input.value = '';

      // Send to Mongoose OS
      try {
        const response = await fetch(config.mongooseEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            repo: this.repo,
            query: query,
            timestamp: Date.now()
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data && data.ok) {
          // Display AI response
          if (data.answer) {
            this.addMessage('ai', data.answer);
          }
          
          // Display token info
          if (data.token) {
            this.addMessage('token', `🧱 TOKEN: ${JSON.stringify(data.token)}`);
          }
        } else {
          this.addMessage('ai', '⚠️ Error: ' + (data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Chat error:', error);
        this.addMessage('ai', `⚠️ Connection error: ${error.message}. The Mongoose OS backend may be unavailable. Your query was: "${query}"`);
      }
    }

    saveHistory() {
      if (!config.persistSession) return;
      
      const messages = Array.from(this.body.children).map(el => ({
        type: el.className.replace('c13b0-chatline ', ''),
        text: el.textContent
      }));
      
      localStorage.setItem(this.sessionKey, JSON.stringify(messages));
    }

    loadHistory() {
      if (!config.persistSession) return;
      
      try {
        const history = localStorage.getItem(this.sessionKey);
        if (history) {
          const messages = JSON.parse(history);
          messages.forEach(msg => {
            const div = document.createElement('div');
            div.className = `c13b0-chatline ${msg.type}`;
            div.textContent = msg.text;
            this.body.appendChild(div);
          });
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }

    clearHistory() {
      this.body.innerHTML = '';
      localStorage.removeItem(this.sessionKey);
      this.addMessage('ai', 'Chat history cleared. How can I help you?');
    }
  }

  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new C13B0ChatWidget();
    });
  } else {
    new C13B0ChatWidget();
  }

  // Expose globally
  window.C13B0ChatWidget = C13B0ChatWidget;
})();
