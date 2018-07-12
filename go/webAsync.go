// gin 
router.GET("/sync", func(c *gin.Context) {
	time.Sleep(5 * time.Second)
	log.Println("Done in path" + c.Request.URL.Path)
})
// 因为涉及异步过程，请求的上下文需要copy到异步的上下文，并且这个上下文是只读的
router.GET("/async", func(c *gin.Context) {
	cCp := c.Copy()
	go func() {
		time.Sleep(5 * time.Second)
		log.Println("Done in path" + cCp.Request.URL.Path) 
	}()
})