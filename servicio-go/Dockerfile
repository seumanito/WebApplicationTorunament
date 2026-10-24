FROM golang:1.25.0

WORKDIR /app

COPY . .

RUN go mod init servicio-go
RUN go mod tidy
RUN go build -o main .

EXPOSE 8080
CMD ["./main"]