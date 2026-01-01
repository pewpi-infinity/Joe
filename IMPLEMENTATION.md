# ∞ Infinity Token-Based Page Building System

A comprehensive web portal featuring token-based page creation, Mongoose OS AI integration, and a modular design system.

## 🌟 Features

### Core Components

- **🔐 Secure Login System** - AES-256-GCM encrypted authentication
- **🦎 Mongoose OS AI Integration** - Real-time AI chat with tokenized responses
- **🧱🍄⭐ Token Economy** - Mario-themed token system (Base + Growth + Acceleration)
- **🎨 Page Designer** - Create and customize pages with token access
- **👑 Admin Dashboard** - Full system management and configuration
- **💬 Universal Chat Widget** - Mongoose AI chat on every page

### Individual Tools

- **Rogers AI Chat** - Conversational AI interface
- **Pi Singer** - Musical π digit generator with live waveform
- **Oscilloscope** - Signal generator and visualizer
- **3D Viewer** - CSS-based 3D animations

## 📁 Directory Structure

```
/
├── index.html                  # Login page (dark theme, Mongoose integrated)
├── dashboard.html              # Main dashboard with navigation
├── portal.html                 # Legacy all-in-one interface
│
├── pages/                      # Individual feature pages
│   ├── chat.html              # Rogers AI Chat Terminal
│   ├── pi-singer.html         # Musical π Generator
│   ├── oscilloscope.html      # Signal Generator
│   ├── 3d-viewer.html         # 3D Viewer
│   └── shared-header.js       # Common navigation header
│
├── designer/                   # Page designer tool
│   └── index.html             # Designer interface
│
├── admin/                      # Admin tools
│   └── dashboard.html         # Admin control panel
│
├── chat/                       # Chat widget
│   └── widget.js              # Universal C13B0 chat widget
│
├── mongoose/                   # Mongoose OS integration
│   ├── mongoose.json          # Configuration
│   └── modules/
│       └── router.js          # AI router module
│
└── tokens/                     # Token economy
    └── economy.js             # Token tracking system
```

## 🚀 Quick Start

### Option 1: Open Locally (No Server Required)

1. Clone the repository:
```bash
git clone https://github.com/pewpi-infinity/Joe.git
cd Joe
```

2. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

### Option 2: With Local Server (Recommended)

```bash
# Python 3
python3 -m http.server 8000

# Then open http://localhost:8000
```

## 🔑 Authentication Flow

1. **Login** (`index.html`)
   - Enter email, username, and passphrase
   - Data encrypted with AES-256-GCM
   - Syncs with Mongoose OS backend (if available)
   - Redirects to dashboard on success

2. **Session Management**
   - 24-hour session duration
   - Stored in sessionStorage
   - Auto-redirect if not authenticated

## 🧱 Token Economy

### Mario-Themed System

The token value for each page is calculated as:

**Total = 🧱 Base + 🍄 Growth + ⭐ Acceleration**

- **🧱 Base Value** - Initial page value (default: 10)
- **🍄 Growth** - Increases with page views and interactions
- **⭐ Acceleration** - Grows with AI query usage

### Usage Tracking

```javascript
// Initialize token economy
const tokenEconomy = new TokenEconomy();

// Record page view
tokenEconomy.recordPageView('chat');

// Record interaction
tokenEconomy.recordInteraction('chat', 'send-message');

// Record AI query
tokenEconomy.recordAIQuery('chat');

// Get page value
const value = tokenEconomy.calculatePageValue('chat');
console.log(value.emoji); // "🧱10 + 🍄5 + ⭐3"
```

## 🎨 Page Designer

### Access Requirements

- **Regular Users**: Must have tokens in their account
- **Admin Users**: Unlimited access without tokens

### Features

- Choose from multiple templates
- Customize colors and themes
- Add/remove components:
  - Chat widget
  - Token display
  - Navigation header
- Set page token cost
- Save designs to localStorage
- Export as HTML

## 👑 Admin Dashboard

### Features

- **Page Management**
  - Create new pages without tokens
  - View all page values and statistics
  - Access page designer

- **Token Management**
  - Add tokens to user accounts
  - View token usage history
  - Track total interactions

- **Mongoose Configuration**
  - Configure AI endpoints
  - Set query costs
  - Test connections

- **System Controls**
  - Export all data
  - View system logs
  - Reset system (with confirmation)

## 🦎 Mongoose OS Integration

### Configuration

Edit `mongoose/mongoose.json`:

```json
{
  "operator": "Your Name",
  "mode": "active",
  "endpoints": {
    "ask": "/router/ask",
    "auth": "/router/auth"
  },
  "tokenSystem": {
    "enabled": true,
    "costPerQuery": 1
  }
}
```

### Router Module

```javascript
// Initialize Mongoose router
const router = new MongooseRouter(config);

// Send AI query
const response = await router.ask('repo-name', 'Your question');
console.log(response.answer);
console.log(response.token);

// Authenticate
const auth = await router.authenticate(credentials);
```

### Chat Widget Integration

The C13B0 chat widget automatically:
- Appears on all pages (bottom-right corner)
- Connects to Mongoose OS endpoints
- Tracks token usage
- Persists chat history
- Works offline with fallback messages

## 💬 Universal Chat Widget

### Automatic Integration

Add to any page:

```html
<script src="chat/widget.js"></script>
```

The widget automatically:
- Detects repository context
- Connects to Mongoose OS AI
- Saves chat history
- Shows token costs
- Handles errors gracefully

### Configuration

```javascript
// In chat/widget.js
const config = {
  mongooseEndpoint: '/router/ask',
  persistSession: true,
  fabText: '🧱💬🧱 CHAT',
  placeholder: 'Ask Mongoose AI...'
};
```

## 🎯 Design System

### Color Palette

```css
:root {
  --bg: #0c1420;      /* Dark background */
  --card: #101e30;    /* Card background */
  --text: #eaf1ff;    /* Text color */
  --brand: #1f6fff;   /* Primary brand */
  --chip: #2563eb;    /* Secondary accent */
  --ok: #22c55e;      /* Success color */
}
```

### Component Styles

All pages share:
- Dark gradient backgrounds
- Card-based layouts with shadows
- Rounded corners (12-20px radius)
- Consistent spacing and typography
- Mobile-responsive breakpoints

## 📱 Mobile Responsiveness

All pages are fully responsive:
- Flexible grid layouts
- Touch-friendly controls
- Optimized chat widget sizing
- Adaptive navigation

## 🔒 Security Features

- **AES-256-GCM Encryption** for user credentials
- **PBKDF2 Key Derivation** (100,000 iterations)
- **Session Management** with expiration
- **Admin Role Protection** for sensitive features
- **Token-Based Access Control**

## 🚧 Backend Integration

### Mongoose OS Backend

The system expects these endpoints:

#### POST /router/ask
Query the AI with tokenized responses:

```json
{
  "repo": "Joe",
  "query": "What is this repository about?",
  "timestamp": 1234567890
}
```

Response:
```json
{
  "ok": true,
  "repo": "Joe",
  "answer": "This is the Infinity Portal...",
  "token": {
    "id": "token_123",
    "value": 1,
    "type": "query"
  }
}
```

#### POST /router/auth
Authenticate user with backend:

```json
{
  "userId": "user_123",
  "email": "user@example.com",
  "username": "User",
  "timestamp": 1234567890
}
```

Response:
```json
{
  "ok": true,
  "synced": true
}
```

### Fallback Behavior

All features work offline with:
- Local-only authentication
- Simulated AI responses
- localStorage-based token tracking
- Graceful error messages

## 📊 Usage Statistics

Track system usage:

```javascript
const tokenEconomy = new TokenEconomy();
const stats = tokenEconomy.getStats();

console.log(stats.totalPages);        // Number of pages
console.log(stats.totalValue);        // Total token value
console.log(stats.userBalance);       // User's tokens
console.log(stats.hasDesignerAccess); // Designer access
```

## 🔧 Development

### File Organization

- Keep all pages in `/pages/`
- Store reusable components separately
- Use shared-header.js for navigation
- Maintain token economy in `/tokens/`
- Admin tools in `/admin/`

### Adding New Pages

1. Create page in `/pages/`
2. Include shared-header.js
3. Include chat/widget.js
4. Include tokens/economy.js
5. Add token tracking
6. Update dashboard links

### Token System Customization

Edit `tokens/economy.js`:

```javascript
this.config = {
  baseValue: 10,           // Starting value
  growthMultiplier: 2,     // Growth rate
  starMultiplier: 3,       // Acceleration rate
  pageUsageWeight: 0.5,    // View weight
  featureWeight: 1.0,      // Interaction weight
  aiInteractionCost: 1     // AI query cost
};
```

## 🎁 Features Summary

✅ Dark theme across all pages
✅ Mongoose OS AI integration
✅ Token-based page building
✅ Universal chat widget
✅ Page designer tool
✅ Admin dashboard
✅ Separated modular pages
✅ Mobile responsive
✅ Secure authentication
✅ Session persistence
✅ PayPal integration
✅ LocalStorage state management

## 📄 License

Open source - feel free to use and modify!

## 👤 Author

@pewpi-infinity

## 🔗 Links

- **GitHub Repository**: https://github.com/pewpi-infinity/Joe
- **GitHub Pages**: https://pewpi-infinity.github.io/Joe/

---

**Built with ❤️ using pure HTML/CSS/JavaScript - No frameworks required!**
