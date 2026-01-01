# ∞ Infinity Portal

A unified web portal featuring Rogers AI Chat, Pi Singer, Oscilloscope, Simple 3D tools, and a complete token-based page building system with Mongoose OS AI integration.

## 🌟 New Features

### Token-Based Page Building System
- **🧱🍄⭐ Mario Economy** - Dynamic token values based on usage and interactions
- **🎨 Page Designer** - Create custom pages with token access
- **👑 Admin Dashboard** - Full system management
- **🦎 Mongoose OS AI** - Integrated AI chat across all pages
- **💬 Universal Chat Widget** - C13B0 chat on every page

### Separated Modular Pages
- **Rogers AI Chat** (`pages/chat.html`)
- **Pi Singer** (`pages/pi-singer.html`)
- **Oscilloscope** (`pages/oscilloscope.html`)
- **3D Viewer** (`pages/3d-viewer.html`)

## 🌐 Live Demo

**GitHub Pages:** [https://pewpi-infinity.github.io/Joe/portal.html](https://pewpi-infinity.github.io/Joe/portal.html)

**Try the new system:** [https://pewpi-infinity.github.io/Joe/index.html](https://pewpi-infinity.github.io/Joe/index.html)

## ✨ Features

### Authentication & Security
- 🔐 **Secure Login** - AES-256-GCM encryption with Web Crypto API
- 🔑 **Session Management** - 24-hour secure sessions
- 👑 **Admin System** - Role-based access control

### Token Economy
- 🧱 **Base Tokens** - Initial page value
- 🍄 **Growth Tokens** - Increases with usage
- ⭐ **Star Tokens** - Accelerates with AI interactions
- 💰 **PayPal Integration** - Purchase tokens to unlock designer access

### Page Builder & Designer
- 🎨 **Visual Designer** - Create custom pages with templates
- 📦 **Component System** - Add/remove chat, tokens, headers
- 🎭 **Theme Customization** - Colors, backgrounds, layouts
- 💾 **Save & Export** - Store designs and export HTML

### AI Integration
- 🦎 **Mongoose OS** - Backend AI framework
- 💬 **Chat Widget** - Available on all pages
- 🔄 **Token Metering** - Track AI query costs
- 📊 **Usage Analytics** - Monitor interactions

### Original Tools
- 🧠 **Rogers AI Chat** - Offline conversational AI with voice input/output
- 🎵 **Pi Singer** - Convert π digits to musical notes with live waveform
- 📈 **Oscilloscope** - Signal generator with frequency visualization
- 🧊 **Simple 3D** - CSS-based 3D cube animation
- 🎨 **Theme Customization** - Change accent colors on the fly
- 📱 **Mobile Responsive** - Works on all devices

## 🚀 Quick Start

### Option 1: View Online (Recommended)
Just visit the GitHub Pages link above - no installation needed!

### Option 2: Run Locally (Python Flask)

1. Clone the repository:
```bash
git clone https://github.com/pewpi-infinity/Joe.git
cd Joe
```

2. Install Flask:
```bash
pip install flask==3.0.0
```

3. Start the server:
```bash
python3 infinity_portal.py serve
```

4. Open your browser to: `http://127.0.0.1:8080`

## 📁 Files

### Core System
- `index.html` - Secure login page with Mongoose OS integration
- `dashboard.html` - Main navigation hub with token balance
- `portal.html` - Legacy all-in-one interface

### Pages
- `pages/chat.html` - Rogers AI Chat Terminal
- `pages/pi-singer.html` - Musical π Generator
- `pages/oscilloscope.html` - Signal Generator
- `pages/3d-viewer.html` - 3D Animations

### Tools
- `designer/index.html` - Page designer tool
- `admin/dashboard.html` - Admin control panel
- `chat/widget.js` - Universal chat widget
- `tokens/economy.js` - Token tracking system
- `mongoose/modules/router.js` - AI router

## 🚀 Getting Started

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/pewpi-infinity/Joe.git
cd Joe
```

2. Open in browser:
```bash
# Direct open
open index.html

# Or with server (recommended)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### First Login

1. Open `index.html`
2. Create an account:
   - Enter email
   - Choose username  
   - Set secure passphrase
3. Login redirects to dashboard
4. Explore all tools!

### Admin Access

To enable admin features:
1. Login as normal user
2. Manually set role in browser console:
```javascript
const session = JSON.parse(sessionStorage.getItem('infinity_user_session'));
session.role = 'admin';
sessionStorage.setItem('infinity_user_session', JSON.stringify(session));
location.reload();
```

## 💰 Token System

### Earning Tokens

- View pages: +0.5 tokens
- Use features: +1 token per interaction
- AI queries: +1 token per query

### Using Tokens

- **Designer Access**: Requires 1+ token
- **Custom Pages**: Set your own token cost
- **Admin Mode**: Bypass all token requirements

### PayPal Integration

Purchase tokens via existing PayPal integration:
- Each page displays current token value
- Pay button links to PayPal
- Tokens grant designer rights

## 🎨 Using the Designer

1. Purchase or earn tokens
2. Navigate to `designer/index.html`
3. Select a template:
   - Blank Page
   - Chat Page
   - Dashboard
   - Tools Page
4. Customize:
   - Set page name and title
   - Choose brand color
   - Toggle components
   - Set token cost
5. Save or export your design

## 👑 Admin Features

Admin dashboard (`admin/dashboard.html`) provides:

- **System Stats**: Pages, tokens, interactions
- **Page Management**: Create unlimited pages
- **Token Management**: Add tokens to users
- **Mongoose Config**: Configure AI endpoints
- **System Controls**: Export data, reset system

## 📁 Files

## 🛠️ Technologies

- Pure HTML/CSS/JavaScript (no dependencies for static version)
- Web Audio API for sound generation
- Canvas API for visualizations
- CSS3 animations for 3D effects
- Web Crypto API for encryption (AES-256-GCM)
- LocalStorage for state management
- SessionStorage for secure sessions
- PayPal API for payments (optional)

## 📱 Usage

### Navigation

- **Dashboard**: Central hub with all links
- **Shared Header**: Navigate between pages
- **Chat Widget**: Available on all pages (bottom-right)
- **Back to Dashboard**: Always accessible

### Chat Widget

1. Click chat button (bottom-right)
2. Type your message
3. Press Enter or click Send
4. See AI response with token cost
5. Chat history persists across pages

### Token Tracking

Every page shows:
- Current token value (🧱🍄⭐)
- Your token balance
- Page purpose and research area
- Build status

## 📱 Usage

1. Click the **☰** menu to switch between tools
2. Each tool works completely offline
3. Chat supports text input and voice recognition (🎤)
4. All audio tools use Web Audio API
5. Customize theme with the color picker

## 🎨 Screenshots

*Coming soon: Screenshots of the new token-based system, page designer, and admin dashboard*

![Infinity Portal Main](https://github.com/user-attachments/assets/d48034ae-8cdd-4ed3-9875-d3224cdccd9b)

![Drawer Menu](https://github.com/user-attachments/assets/d9f9d59a-e2f1-4006-a8e9-896cd8d30b95)

## 📚 Documentation

For complete documentation, see:
- **[IMPLEMENTATION.md](IMPLEMENTATION.md)** - Full system documentation
- **[TOKEN.md](TOKEN.md)** - Token economy details
- **Code Comments** - Inline documentation in all files

## 🔒 Security

- **Encryption**: AES-256-GCM for credentials
- **Key Derivation**: PBKDF2 with 100,000 iterations
- **Session Management**: Secure 24-hour sessions
- **Role-Based Access**: Admin vs User permissions
- **No External Dependencies**: All crypto done in-browser

## 🚀 Deployment

### GitHub Pages

Already live at: https://pewpi-infinity.github.io/Joe/

### Custom Server

```bash
# Python
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### Backend Integration

To connect Mongoose OS backend:

1. Implement these endpoints:
   - POST `/router/ask` - AI queries
   - POST `/router/auth` - Authentication

2. Update `mongoose/mongoose.json`:
```json
{
  "endpoints": {
    "ask": "https://your-api.com/router/ask",
    "auth": "https://your-api.com/router/auth"
  }
}
```

## 📄 License

Open source - feel free to use and modify!

## 👤 Author

@pewpi-infinity

---

**Note:** The static version (`portal.html`) works entirely in the browser. The Python version (`infinity_portal.py`) offers the same features but runs as a local Flask server.
# Rogers

This is the README for the Rogers/Infinity Voice Module app.

---

## 🧱 Research Notes (mixed)
**Timestamp:** 2025-12-23T10:59:44Z

### 🟨 Extracted Data
- Repo files: 30
- Code present: 7

### 🩷 Investigative
What is missing, blocked, or undefined.

### 🟩 Engineering / Tools
What advances this repo fastest.

### 🟥 Routes Worth More
Two next build paths with reasoning.

### 🟧 Decisions
Immediate next step and why.

---

## 🧱 Research Notes (mixed)
**Timestamp:** 2025-12-23T19:26:48Z

### 🟨 Extracted Data
- Repo files: 32
- Code present: 7

### 🩷 Investigative
What is missing, blocked, or undefined.

### 🟩 Engineering / Tools
What advances this repo fastest.

### 🟥 Routes Worth More
Two next build paths with reasoning.

### 🟧 Decisions
Immediate next step and why.
