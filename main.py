import os
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import jwt

# Configuration
PORTAL_PASSWORD = os.getenv("PORTAL_PASSWORD", "maya123")
SHARED_JWT_SECRET = os.getenv("SHARED_JWT_SECRET", "dev-secret-change-in-production")
COOKIE_DOMAIN = os.getenv("COOKIE_DOMAIN", None)  # None for localhost, ".entermaya.com" for production
COOKIE_NAME = "maya_auth_token"

app = FastAPI(title="Maya Portal")

class LoginRequest(BaseModel):
    password: str

@app.post("/api/login")
async def login(request: LoginRequest, response: Response):
    if request.password != PORTAL_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")
    
    # Create JWT token
    payload = {
        "sub": "maya_user",
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    token = jwt.encode(payload, SHARED_JWT_SECRET, algorithm="HS256")
    
    # Set cookie
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        domain=COOKIE_DOMAIN,
        httponly=True,
        secure=COOKIE_DOMAIN is not None,  # Secure only in production (HTTPS)
        samesite="lax",
        max_age=7 * 24 * 60 * 60  # 7 days
    )
    
    return {"message": "Login successful"}

@app.get("/api/verify")
async def verify(request: Request):
    token = request.cookies.get(COOKIE_NAME)
    
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        payload = jwt.decode(token, SHARED_JWT_SECRET, algorithms=["HS256"])
        return {"authenticated": True, "user": payload.get("sub")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/api/logout")
async def logout(response: Response):
    response.delete_cookie(
        key=COOKIE_NAME,
        domain=COOKIE_DOMAIN
    )
    return {"message": "Logged out"}

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

# Serve static files (React build) - must be last
app.mount("/", StaticFiles(directory="static", html=True), name="static")
