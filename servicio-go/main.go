package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Equipo struct {
	gorm.Model
	Nombre string `json:"nombre"`
	Region string `json:"region"`
}

func main() {
	godotenv.Load()
	dsn := os.Getenv("GO_DB_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error conectando a la base de datos: ", err)
	}
	db.AutoMigrate(&Equipo{})
	r := gin.Default()

	r.GET("/equipos", func(c *gin.Context) {
		var equipos []Equipo
		db.Find(&equipos)
		c.JSON(http.StatusOK, equipos)
	})

	r.POST("/equipos", func(c *gin.Context) {
		var nuevo Equipo
		if err := c.ShouldBindJSON(&nuevo); err == nil {
			db.Create(&nuevo)
			c.JSON(http.StatusCreated, nuevo)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	})
	r.Run(":8080")
}