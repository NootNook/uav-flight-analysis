from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, Response

from .parser import ParserLog
from .utils import get_filenames_from_assets

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

# ---------------------------------------------

@app.get("/parser/{environnment}/{mode}", tags=["root"])
async def parser_multimodes(environnment: str, mode: str, filename: str = "May-3rd-2023-10-41AM-Flight-Airdata.csv") -> Response:
    if mode in ["gps", "altitude"]:
        parserLog = ParserLog(environnment, mode)
        data = parserLog.run(filename)
        
        json_compatible_item_data = jsonable_encoder(data)
        return JSONResponse(content=json_compatible_item_data)

    raise HTTPException(status_code=404, detail="Mode not found")

@app.get("/filenames", tags=["root"])
async def get_filenames() -> Response:
    filenames = get_filenames_from_assets()

    json_compatible_item_data = jsonable_encoder(filenames)
    return JSONResponse(content=json_compatible_item_data)
