# Portfolio Deployment Guide

## Project Structure

```
fusion-perseverance/
├── portfolio-api/          # Vercel serverless API (separate deployment)
│   ├── api/
│   │   └── chat.js        # AI chat endpoint
│   ├── package.json
│   ├── vercel.json
│   └── README.md
├── index.html             # Main portfolio site (GitHub Pages)
├── style.css
├── script.js
├── favicon.png
└── MOHAMED-ANAS-VT-Resume-20251122.pdf
```

## Deployment Steps

### 1. Deploy API to Vercel

```bash
cd portfolio-api
vercel login
vercel
```

Follow prompts to create new project. Then add your API key:

```bash
vercel env add GROQ_API_KEY
# Paste: YOUR_GROQ_API_KEY_HERE
# Select: Production
```

Deploy to production:

```bash
vercel --prod
```

You'll get a URL like: `https://portfolio-api-xxxx.vercel.app`

### 2. Update Portfolio Script

In `script.js`, update the API endpoint (line 223):

```javascript
// Replace this:
const API_ENDPOINT = 'http://localhost:3000/api/chat';

// With your Vercel URL:
const API_ENDPOINT = 'https://portfolio-api-xxxx.vercel.app/api/chat';
```

### 3. Deploy Portfolio to GitHub Pages

```bash
# Go back to main directory
cd ..

# Initialize git if not already
git init
git add .
git commit -m "Initial portfolio commit"

# Create GitHub repo and push
git remote add origin https://github.com/anasvakyathodi/anasvakyathodi.github.io.git
git branch -M main
git push -u origin main
```

Enable GitHub Pages in repo settings → Pages → Deploy from main branch

Your site will be live at: `https://anasvakyathodi.github.io`

## Testing Locally

### Test API Locally:
```bash
cd portfolio-api
vercel dev
# API runs at http://localhost:3000
```

### Test Portfolio Locally:
Open `index.html` in browser with a local server:
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Security Notes

✅ **Secure**: API key is in Vercel environment variables (not in code)
✅ **Safe**: GitHub repo can be public - no secrets exposed
✅ **CORS**: API allows requests from any origin (update in production to your domain)

## Updating

**Update API:**
```bash
cd portfolio-api
# Make changes
vercel --prod
```

**Update Portfolio:**
```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Pages auto-deploys on push!
