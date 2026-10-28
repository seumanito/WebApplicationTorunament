package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/gin-contrib/cors"
)

type Equipo struct {
    gorm.Model
    TeamID   int `json:"team_id"`
    TorneoID int `json:"torneo_id"`
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
	r.Use(cors.Default())

	r.GET("/equipos", func(c *gin.Context) {
		var equipos []Equipo
		db.Find(&equipos)
		c.JSON(http.StatusOK, equipos)
	})

	r.POST("/equipos", func(c *gin.Context) {
    var equipo Equipo
    if err := c.ShouldBindJSON(&equipo); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := db.Create(&equipo).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusCreated, equipo)
})
	r.Run(":8080")
}