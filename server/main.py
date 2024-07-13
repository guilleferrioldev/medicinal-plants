from fastapi import FastAPI
import uvicorn

from router import router

def main():
    app = FastAPI(
        title="Plant recomendation system",
        version="1.0.0"
    )
    
    app.include_router(router)

    try:
        uvicorn.run(app, host="127.0.0.1", port=8080)
    except KeyboardInterrupt:
        print("Se ha interrumpido la ejecución del programa.")

if __name__ == '__main__': 
    main()
