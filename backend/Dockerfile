FROM python:3

RUN mkdir -p /backend
WORKDIR /backend
COPY ./ .
RUN pip3 install -r requirements.txt

EXPOSE 5173

CMD [ "python3", "main.py" ]
 