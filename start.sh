#!/bin/bash
# Infinity Portal Startup Script

echo "🐍 Starting Mongoose OS Integration..."
echo ""

# Check if Python dependencies are installed
if ! python3 -c "import flask" 2>/dev/null; then
    echo "📦 Installing Python dependencies..."
    pip install -q -r requirements.txt
    echo "✓ Dependencies installed"
    echo ""
fi

# Start the router service
echo "🚀 Starting Mongoose Router on port 5001..."
# Set debug mode for development (disable in production by omitting FLASK_DEBUG)
ROUTER_PORT=5001 FLASK_DEBUG=true python3 router.py &
ROUTER_PID=$!
echo "✓ Router started (PID: $ROUTER_PID)"
echo ""

# Wait for router to start
sleep 2

# Start the web server
echo "🌐 Starting web server on port 8080..."
python3 -m http.server 8080 &
SERVER_PID=$!
echo "✓ Web server started (PID: $SERVER_PID)"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Infinity Portal is running!"
echo ""
echo "📍 Access points:"
echo "   • Main site: http://127.0.0.1:8080"
echo "   • Login: http://127.0.0.1:8080/index.html"
echo "   • Dashboard: http://127.0.0.1:8080/dashboard.html"
echo "   • Test page: http://127.0.0.1:8080/test-integration.html"
echo ""
echo "🔧 API endpoints:"
echo "   • Router: http://127.0.0.1:5001/router/ask"
echo "   • Health: http://127.0.0.1:5001/mongoose/api/health"
echo ""
echo "🛑 To stop all services, press Ctrl+C"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $ROUTER_PID 2>/dev/null
    kill $SERVER_PID 2>/dev/null
    echo "✓ All services stopped"
    exit 0
}

# Set trap to cleanup on Ctrl+C
trap cleanup INT TERM

# Wait for user to stop
wait
