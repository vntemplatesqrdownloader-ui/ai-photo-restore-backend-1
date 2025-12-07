
# AI Photo Restore Backend (Node.js Pro Version)

## Features
- Enhance photos (GFPGAN via Replicate)
- Restore old photos
- Remove background (local & Remove.bg PRO)
- Upscale images (Real-ESRGAN)
- Mobile-safe CORS
- Render deploy-ready

## Deploy on Render
1. Upload repo to GitHub
2. New Web Service
3. Build: `npm install`
4. Start: `node server.js`
5. Add environment variables:
   - REPLICATE_API_TOKEN
   - REMOVEBG_API_KEY

## Endpoints
- POST /enhance
- POST /restore-old
- POST /remove-bg
- POST /remove-bg-pro
- POST /upscale
