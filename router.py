#!/usr/bin/env python3
"""
Mongoose Router Service
Handles routing between frontend chat widgets and Mongoose OS AI firmware
"""

import json
import os
import time
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuration
MONGOOSE_CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'mongoose', 'mongoose.json')

def load_mongoose_config():
    """Load Mongoose OS configuration"""
    try:
        with open(MONGOOSE_CONFIG_PATH, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Warning: Could not load Mongoose config: {e}")
        return {
            "operator": "Unknown",
            "attached": datetime.now().isoformat(),
            "mode": "passive"
        }

mongoose_config = load_mongoose_config()

def generate_token(repo, action="query"):
    """Generate a token for the response"""
    timestamp = int(time.time() * 1000)
    token_id = f"tok_{repo}_{timestamp}"
    
    return {
        "id": token_id,
        "value": timestamp % 100,  # Simple value calculation
        "type": "c13b0",
        "repo": repo,
        "action": action,
        "timestamp": timestamp
    }

def get_mongoose_response(query, repo, context=None):
    """
    Get response from Mongoose OS AI firmware
    In passive mode, returns offline responses
    """
    mode = mongoose_config.get('mode', 'passive')
    operator = mongoose_config.get('operator', 'Unknown')
    
    # Simple offline responses for passive mode
    q = query.lower().strip()
    
    responses = {
        'hello': f"Hello! I'm Mongoose OS operated by {operator}. How can I help?",
        'hi': f"Hi there! Mongoose OS is ready in {mode} mode.",
        'help': "I can help you with questions about this repository. Ask me anything!",
        'status': f"Mongoose OS is running in {mode} mode, operator: {operator}",
        'who are you': f"I'm Mongoose OS AI, operated by {operator}. I assist with repository questions.",
        'what can you do': "I can answer questions, provide code insights, and help navigate the repository.",
    }
    
    # Check for keyword matches
    for keyword, response in responses.items():
        if keyword in q:
            return response
    
    # Default response
    if len(q) > 0:
        query_preview = query if len(query) <= 50 else query[:50] + '...'
        return f"I received your query about '{query_preview}' - Mongoose OS is processing in {mode} mode. This is a demo response."
    
    return "Please ask me a question about the repository."

@app.route('/router/ask', methods=['POST'])
def router_ask():
    """
    Main endpoint for chat widget queries
    Expected request: { repo, query, t }
    Returns: { ok, repo, answer, token }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "ok": False,
                "error": "No data provided"
            }), 400
        
        repo = data.get('repo', 'unknown')
        query = data.get('query', '')
        timestamp = data.get('t', int(time.time() * 1000))
        
        if not query:
            return jsonify({
                "ok": False,
                "error": "Query is required"
            }), 400
        
        # Get response from Mongoose OS
        answer = get_mongoose_response(query, repo, {
            'timestamp': timestamp,
            'operator': mongoose_config.get('operator')
        })
        
        # Generate token
        token = generate_token(repo, "query")
        
        return jsonify({
            "ok": True,
            "repo": repo,
            "answer": answer,
            "token": token,
            "mongoose": {
                "operator": mongoose_config.get('operator'),
                "mode": mongoose_config.get('mode'),
                "timestamp": datetime.now().isoformat()
            }
        })
    
    except Exception as e:
        print(f"Error in /router/ask: {e}")
        return jsonify({
            "ok": False,
            "error": str(e)
        }), 500

@app.route('/mongoose/api/health', methods=['GET'])
def mongoose_health():
    """Health check endpoint"""
    return jsonify({
        "healthy": True,
        "status": "operational",
        "mode": mongoose_config.get('mode', 'passive'),
        "operator": mongoose_config.get('operator', 'Unknown'),
        "timestamp": datetime.now().isoformat()
    })

@app.route('/mongoose/api/auth', methods=['POST'])
def mongoose_auth():
    """Authentication endpoint"""
    try:
        data = request.get_json()
        
        # In passive mode, authentication is simplified
        return jsonify({
            "success": True,
            "mode": mongoose_config.get('mode'),
            "operator": mongoose_config.get('operator'),
            "authenticated": True,
            "timestamp": datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/mongoose/api/query', methods=['POST'])
def mongoose_query():
    """Direct query endpoint"""
    try:
        data = request.get_json()
        query = data.get('query', '')
        context = data.get('context', {})
        
        if not query:
            return jsonify({
                "ok": False,
                "error": "Query is required"
            }), 400
        
        repo = context.get('repo', 'unknown')
        answer = get_mongoose_response(query, repo, context)
        
        return jsonify({
            "ok": True,
            "answer": answer,
            "context": context,
            "timestamp": datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({
            "ok": False,
            "error": str(e)
        }), 500

@app.route('/mongoose/api/token', methods=['POST'])
def mongoose_token():
    """Token generation endpoint"""
    try:
        data = request.get_json()
        repo = data.get('repo', 'unknown')
        action = data.get('action', 'query')
        
        token = generate_token(repo, action)
        
        return jsonify({
            "ok": True,
            "token": token
        })
    
    except Exception as e:
        return jsonify({
            "ok": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('ROUTER_PORT', 5001))  # Default to 5001 to match documentation
    debug_mode = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
    print(f"Starting Mongoose Router on port {port}")
    print(f"Mongoose config: {mongoose_config}")
    print(f"Debug mode: {debug_mode}")
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
