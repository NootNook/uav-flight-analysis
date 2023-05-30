import os
import csv
import json
import numpy as np
import pyproj

from .globals import *
from .utils import feets_to_meters, remove_consecutive_duplicates_altitudes, remove_consecutive_duplicates_gps, transform_wgs84_ellipsoid_height_to_mean_sea_level

class ParserLog:
    def __init__(self, environnement: str, mode: str) -> None:
        self.environnement = environnement
        self.mode = mode

        pyproj.network.set_network_enabled(active=True)


    def run(self, filename: str) -> list:
        if self.environnement == "onboardSDK":
            return self.parserOnBoard(filename, self.mode)
        elif self.environnement == "airData":
            return self.parserAirData(filename, self.mode)
        elif self.environnement == "DJIParsingLib":
            return self.parserDjiParsingLib(filename, self.mode)
        
        print(f"WRONG ! Env : ${self.environnement} - Filename : ${filename} - Mode : ${self.mode}")

    def parserOnBoard(self, filename: str, mode: str) -> list:

        path = os.getcwd() + "/app/assets/"

        result = []

        with open(path + filename) as csvfile:
            raw_csvreader = csv.reader(csvfile)
            next(raw_csvreader) # skip header csv

            data_formatted = remove_consecutive_duplicates_altitudes(raw_csvreader) if mode == "altitude" else remove_consecutive_duplicates_gps(raw_csvreader)
            size_data = len(data_formatted)
            
            timestamps = [data["timestamp"] for data in data_formatted]
            metrics = np.array([data["metrics"] for data in data_formatted]).astype(np.float32)

            wgs84_latitudes = np.divide(metrics[:, ONBOARD_SDK_GPS_LATITUDE_INDEX], 10000000, dtype=np.float32).tolist()
            wgs84_longitudes = np.divide(metrics[:, ONBOARD_SDK_GPS_LONGITUDE_INDEX], 10000000, dtype=np.float32).tolist()

            if mode == "gps":
                result = [{"timestamp": timestamps[i], "latitude": wgs84_latitudes[i], "longitude": wgs84_longitudes[i]} for i in range(size_data)]
            elif mode == "altitude":
                wgs84_ellipsoid_height = np.array(metrics[:, ONBOARD_SDK_GPS_FUSED_ALTITUDE_INDEX], dtype=np.float32).tolist()
                (_, _, altitudes_msl) = transform_wgs84_ellipsoid_height_to_mean_sea_level(wgs84_latitudes, wgs84_longitudes, wgs84_ellipsoid_height)

                result = [{"timestamp": timestamps[i], "wgs84_ellipsoid_height": wgs84_ellipsoid_height[i], "orthometric_height": altitudes_msl[i]} for i in range(size_data)]

        return result

    def parserAirData(self, filename: str, mode: str) -> list:
        path = os.getcwd() + "/app/assets/"

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
                    altitude_in_feets = feets_to_meters(float(data[AIRDATA_GPS_ALTITUDE_INDEX]))
                    result.append({
                        "timestamp": int(timestamp),
                        "orthometric_height": altitude_in_feets,
                    })

                timestamp += OFFSET
        return result
    
    def parserDjiParsingLib(self, filename: str, mode: str) -> list:
        path = os.getcwd() + "/app/assets/"
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