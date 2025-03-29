from fastapi import FastAPI
import socketio

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = FastAPI()
app_sio = socketio.ASGIApp(sio, other_asgi_app=app)

@app.get("/")
async def read_root():
    return {'message': 'FastAPI backend is running'}