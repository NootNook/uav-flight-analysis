FROM python:3

RUN mkdir -p /backend
WORKDIR /backend
RUN pip3 install uvicorn fastapi numpy
COPY ./ .

EXPOSE 5173

CMD [ "python3", "main.py" ]
 