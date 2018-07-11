package main 
import (
	"github.com/gin-gonic/gin"

	""
)
func main() {

}
// gin，loginAuth，inplement with cookie
router.GET("/auth/signin", func(c *gin.Context) {
	cookie := &http.Cookie{
		Name: "session_id",
		Value: "123",
		// 注意这里需要指定path为/，不然gin会自动设置cookie的path为/auth
		Path: "/",
		HttpOnly: true,
	}
	http.setCookie(c.Writer, cookie)
	c.String(http.StatusOK, "Login sucessful")
})

router.GET("/home", AuthMiddleWare(), func(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data": "home"
	})
})

func authMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		if cookie, err := c.Request.Cookie("session_id"); err == nil {
			value := cookie.Value
			fmt.Println(value)
			if value == "123" {
				c.Next()
				return
			}
		}
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		c.Abort()
		return
	}
}