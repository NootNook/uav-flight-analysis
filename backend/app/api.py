from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, Response

from .parser import ParserLog
from .utils import get_database, get_key

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

database = get_database()

# ---------------------------------------------

@app.get("/parser/{mode}", tags=["root"])
async def parser_multimodes(mode: str, filename: str = "demo.csv") -> Response:
    if mode in ["gps", "altitude"]:
        environnment = get_key(filename, database)
        print(environnment)

        parserLog = ParserLog(environnment, mode)
        data = parserLog.run(filename)
        
        json_compatible_item_data = jsonable_encoder(data)
        return JSONResponse(content=json_compatible_item_data)

    raise HTTPException(status_code=404, detail="Mode not found")

@app.get("/filenames", tags=["root"])
async def get_filenames() -> Response:
    json_compatible_item_data = jsonable_encoder(database)
    return JSONResponse(content=json_compatible_item_data)
