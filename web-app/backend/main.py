import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from controller import keras_router

load_dotenv()

app = FastAPI(
  title="Scribble It",
  version="1.2.0"
)

app.include_router(keras_router)

app.add_middleware(
  CORSMiddleware,
  allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.get("/", tags=['Root'])
async def root() -> dict:
  """Test API Endpoint"""
  return { "message": "Scrible It"}

if __name__ == "__main__":
  uvicorn.run(
    "main:app",
    host=os.environ.get('DOMAIN'),
    port=int(os.environ.get('PORT')),
    log_level="info",
    reload=True
  )