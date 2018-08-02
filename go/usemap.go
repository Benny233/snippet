// 声明一个map，键为string，值为Matcher
var matchers = make(map[string]Matcher)

func Registed(feedType string, matcher Matcher) {
	// 检查map键是否存在
	if _, exist := matchers[feedType]; exists {
		log.Fatalln(feedType, "has already registed")
	}

	log.Println("Matcher", feedType, "registed")
	// 设置map值
	matchers[feedType] = matcher
}