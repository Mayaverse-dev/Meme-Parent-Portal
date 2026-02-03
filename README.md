# Maya Portal

Central authentication portal for the Maya Developer Tools ecosystem. Provides a single login page that issues shared cookies for all subdomain applications.

## Architecture

```
meme.entermaya.com (Portal)
    ├── /api/login   → Issues JWT cookie (domain: .entermaya.com)
    ├── /api/verify  → Validates existing cookie
    └── /*           → Serves React app (login + app directory)

a.meme.entermaya.com (Ask Maya)
b.meme.entermaya.com (Lore Consistency Enforcer)
*.meme.entermaya.com (Future apps)
```

## Local Development

```bash
# Backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## Deployment (Railway)

1. Create a new service from this repo
2. Set environment variables:
   - `PORTAL_PASSWORD`: The shared password for login
   - `SHARED_JWT_SECRET`: Secret key for JWT (share with all subdomain apps)
   - `COOKIE_DOMAIN`: `.entermaya.com`
3. Railway will auto-detect `railway.json` and run the build command

---

# Integration Guide for New Projects

Any new project hosted on `*.meme.entermaya.com` can be protected by the Portal authentication.

## 1. Backend Middleware (FastAPI)

Add this to your `main.py`:

```python
import os
import jwt
from fastapi import Request, HTTPException, Depends

SHARED_JWT_SECRET = os.getenv("SHARED_JWT_SECRET")
COOKIE_NAME = "maya_auth_token"

def verify_maya_auth(request: Request):
    """
    Dependency that verifies the Maya Portal authentication cookie.
    Add to any route that should be protected.
    """
    token = request.cookies.get(COOKIE_NAME)
    
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated - redirecting to portal")
    
    try:
        payload = jwt.decode(token, SHARED_JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid authentication")

# Usage example:
# @app.get("/protected-data")
# async def get_data(user = Depends(verify_maya_auth)):
#     return {"data": "Secret content"}
```

## 2. Frontend Auth Check (React)

Add this to your `App.tsx` or a wrapper component:

```typescript
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call any protected endpoint
        await axios.get('/api/health-auth', { withCredentials: true });
        setIsAuthed(true);
      } catch (err: any) {
        if (err.response?.status === 401) {
          // Redirect to portal
          window.location.href = 'https://meme.entermaya.com';
        }
      }
    };
    checkAuth();
  }, []);

  if (isAuthed === null) return <div>Loading...</div>;
  
  return <YourApp />;
}
```

## 3. Railway Environment Variables

Add these to your Railway service:

| Variable | Value | Notes |
|----------|-------|-------|
| `SHARED_JWT_SECRET` | (same as Portal) | Must match across all services |

## 4. CORS Configuration (if separate frontend/backend)

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://meme.entermaya.com",
        "https://a.meme.entermaya.com",
        "https://b.meme.entermaya.com",
        # Add your subdomain here
    ],
    allow_credentials=True,  # Required for cookies
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 5. Dependencies

Add to your `requirements.txt`:

```
pyjwt
```
