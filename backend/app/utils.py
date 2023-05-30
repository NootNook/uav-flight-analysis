from .globals import *
import os
import pyproj

def remove_consecutive_duplicates_altitudes(data):
    lines = []
    timestamp = 0
    timestamps = []
    for line in data:
        if len(lines) < 2 or (line[ONBOARD_SDK_GPS_LATITUDE_INDEX] != lines[-1][ONBOARD_SDK_GPS_LATITUDE_INDEX] and line[ONBOARD_SDK_GPS_LATITUDE_INDEX] != lines[-1][ONBOARD_SDK_GPS_LATITUDE_INDEX]) or (line[ONBOARD_SDK_GPS_LONGITUDE_INDEX] != lines[-2][ONBOARD_SDK_GPS_LONGITUDE_INDEX] and line[ONBOARD_SDK_GPS_LONGITUDE_INDEX] != lines[-2][ONBOARD_SDK_GPS_LONGITUDE_INDEX]):
            lines.append(line)
            timestamps.append(timestamp)
        timestamp += DATA_FREQUENCY_ONBOARDSDK

    res = [{"timestamp": k, "metrics": v} for k, v in zip(timestamps, lines)]
    return res

def remove_consecutive_duplicates_gps(data):
    data = list(data)
    result = [data[0]]
    timestamp = 0
    timestamps = [0]
    for line in data[1:]:
        if line[ONBOARD_SDK_GPS_LATITUDE_INDEX] != result[-1][ONBOARD_SDK_GPS_LATITUDE_INDEX] or line[ONBOARD_SDK_GPS_LONGITUDE_INDEX] != result[-1][ONBOARD_SDK_GPS_LONGITUDE_INDEX]:
            result.append(line)
            timestamps.append(timestamp)
        timestamp += DATA_FREQUENCY_ONBOARDSDK

    res = [{"timestamp": k, "metrics": v} for k, v in zip(timestamps, result)]
    return res

def get_filenames_from_assets() -> str:
    current_path = os.getcwd() + "/"
    return os.listdir(current_path + "/app/assets")

def transform_wgs84_ellipsoid_height_to_mean_sea_level(wgs84_latitudes: list[float], wgs84_longitudes: list[float], wgs84_ellipsoid_height: list[float]) -> tuple[list[float], list[float], list[float]]:
    WGS84 = pyproj.crs.CRS.from_epsg(4979)
    WGS84_EGM2008 = pyproj.crs.CRS.from_epsg(9518)

    TRANSFORMER = pyproj.transformer.Transformer.from_crs(crs_from=WGS84, crs_to=WGS84_EGM2008)

    (new_latitudes, new_longitudes, new_altitudes) = TRANSFORMER.transform(wgs84_latitudes, wgs84_longitudes, wgs84_ellipsoid_height)

    return (new_latitudes, new_longitudes, new_altitudes)

def feets_to_meters(feets: float) -> float:
    return feets/3.2808399