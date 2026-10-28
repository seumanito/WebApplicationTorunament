FROM golang:1.26.0

WORKDIR /app

COPY . .

RUN go mod init servicio-go || true

RUN go get github.com/gin-gonic/gin
RUN go get github.com/joho/godotenv
RUN go get gorm.io/driver/postgres
RUN go get gorm.io/gorm
RUN go get github.com/gin-contrib/cors

RUN go mod tidy
RUN go build -o main .

EXPOSE 8080
CMD ["./main"]