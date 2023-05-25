from .globals import *
import json
import os

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

def get_filenames_from_assets():
    current_path = os.getcwd() + "/"
    return os.listdir(current_path + "/app/assets")