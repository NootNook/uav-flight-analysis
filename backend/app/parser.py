import numpy as np
import os
import csv
import json

from .globals import *
from .utils import remove_consecutive_duplicates_altitudes, remove_consecutive_duplicates_gps

class ParserLog:
    def __init__(self, environnement: str, mode: str) -> None:
        self.environnement = environnement
        self.mode = mode

    def run(self, filename: str) -> list:
        if self.environnement == "onboardSDK":
            return self.parserOnBoard(filename, self.mode)
        elif self.environnement == "airData":
            return self.parserAirData(filename, self.mode)
        elif self.environnement == "DJIParsingLib":
            return self.parserDjiParsingLib(filename, self.mode)
        
        print(f"WRONG ! Env : ${self.environnement} - Filename : ${filename} - Mode : ${self.mode}")

    def parserOnBoard(self, filename: str, mode: str) -> list:

        path = os.getcwd() + "/backend/app/assets/"

        result = []

        with open(path + filename) as csvfile:
            raw_csvreader = csv.reader(csvfile)
            next(raw_csvreader) # skip header csv

            data_formatted = remove_consecutive_duplicates_altitudes(raw_csvreader) if mode == "altitude" else remove_consecutive_duplicates_gps(raw_csvreader)

            for data in data_formatted:
                if mode == "gps":
                    result.append({
                        "timestamp": int(data["timestamp"]),
                        "latitude": float(data["metrics"][ONBOARD_SDK_GPS_LATITUDE_INDEX]) / 10000000,
                        "longitude": float(data["metrics"][ONBOARD_SDK_GPS_LONGITUDE_INDEX]) / 10000000
                    })
                elif mode == "altitude":
                    result.append({
                        "timestamp": int(data["timestamp"]),
                        "altitude": float(data["metrics"][ONBOARD_SDK_GPS_FUSED_ALTITUDE_INDEX]),
                    })

        return result

    def parserAirData(self, filename: str, mode: str) -> list:
        path = os.getcwd() + "/backend/app/assets/"

        result = []
        timestamp = 0
        OFFSET = 100

        with open(path + filename) as csvfile:
            raw_csvreader = csv.reader(csvfile)
            next(raw_csvreader) # skip header csv  
            
            for data in raw_csvreader:
                if mode == "gps":
                    result.append({
                        "timestamp": int(timestamp),
                        "latitude": float(data[AIRDATA_GPS_LATITUDE_INDEX]),
                        "longitude": float(data[AIRDATA_GPS_LONGITUDE_INDEX])
                    })
                elif mode == "altitude":
                    result.append({
                        "timestamp": int(timestamp),
                        "altitude": float(data[AIRDATA_GPS_ALTITUDE_INDEX]),
                    })

                timestamp += OFFSET
        return result
    
    def parserDjiParsingLib(self, filename: str, mode: str) -> list:
        path = os.getcwd() + "/backend/app/assets/"
        result = []

        timestamp = 0
        TIMESTAMP_OFFSET = 100

        with open(path + filename) as f:
            json_data = json.load(f)

            frames = json_data["info"]["frameTimeStates"]

            for frame in frames:
                if mode == "gps":
                    result.append({
                        "timestamp": int(timestamp),
                        "latitude": float(frame["flightControllerState"]["aircraftLocation"]["latitude"]),
                        "longitude": float(frame["flightControllerState"]["aircraftLocation"]["longitude"])
                    })
                elif mode == "altitude":
                    result.append({
                        "timestamp": int(timestamp),
                        "altitude": float(frame["flightControllerState"]["altitude"])
                    })

                timestamp += TIMESTAMP_OFFSET

        return result