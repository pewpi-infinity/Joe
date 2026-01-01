/**
 * Shared Navigation Component for Infinity Portal
 * Provides consistent header across all pages
 */

function createInfinityHeader() {
  return `
    <style>
      :root {
        --bg: #0c1420;
        --bg2: #0f1a2a;
        --card: #101e30;
        --edge: #14243a;
        --text: #eaf1ff;
        --muted: #a7b6d9;
        --brand: #1f6fff;
        --chip: #2563eb;
      }
      
      .infinity-header {
        position: sticky;
        top: 0;
        z-index: 50;
        background: linear-gradient(180deg, #091425, transparent);
        backdrop-filter: blur(8px);
      }
      
      .infinity-bar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.9rem 1rem;
      }
      
      .infinity-badge {
        background: #1b2b47;
        color: #fff;
        border-radius: 999px;
        padding: 0.25rem 0.6rem;
        font-size: 0.8rem;
        box-shadow: 0 0 0 1px #274066 inset;
      }
      
      .infinity-title {
        font-weight: 800;
        font-size: 1.25rem;
        letter-spacing: 0.3px;
        color: var(--text);
      }
      
      .infinity-nav {
        display: flex;
        gap: 0.5rem;
        margin-left: auto;
      }
      
      .infinity-nav-link {
        padding: 0.5rem 0.9rem;
        border-radius: 10px;
        background: rgba(31, 111, 255, 0.1);
        border: 1px solid rgba(31, 111, 255, 0.2);
        color: var(--text);
        text-decoration: none;
        font-size: 0.85rem;
        transition: all 0.2s;
      }
      
      .infinity-nav-link:hover {
        background: rgba(31, 111, 255, 0.2);
        border-color: rgba(31, 111, 255, 0.4);
      }
      
      .infinity-nav-link.active {
        background: var(--brand);
        border-color: var(--brand);
      }
      
      @media (max-width: 768px) {
        .infinity-nav-link span {
          display: none;
        }
      }
    </style>
    
    <header class="infinity-header">
      <div class="infinity-bar">
        <div class="infinity-title">∞ Infinity</div>
        <div class="infinity-badge">Powered by Mongoose OS</div>
        <nav class="infinity-nav">
          <a href="dashboard.html" class="infinity-nav-link">🏠 <span>Dashboard</span></a>
          <a href="pages/chat.html" class="infinity-nav-link">💬 <span>Chat</span></a>
          <a href="pages/pi-singer.html" class="infinity-nav-link">🎵 <span>Pi Singer</span></a>
          <a href="pages/oscilloscope.html" class="infinity-nav-link">📈 <span>Oscilloscope</span></a>
          <a href="pages/3d-viewer.html" class="infinity-nav-link">🧊 <span>3D</span></a>
          <a href="designer/index.html" class="infinity-nav-link">🎨 <span>Designer</span></a>
        </nav>
      </div>
    </header>
  `;
}

// Auto-inject header if element with id 'infinity-header-mount' exists
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('infinity-header-mount');
    if (mount) {
      mount.innerHTML = createInfinityHeader();
    }
  });
} else {
  const mount = document.getElementById('infinity-header-mount');
  if (mount) {
    mount.innerHTML = createInfinityHeader();
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createInfinityHeader };
}
