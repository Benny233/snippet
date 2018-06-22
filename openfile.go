func Openfile(path) ([]*Feed, error) {
	//打开文件，得到文件对象
	file, err := os.Open(path)
	// 错误处理
	if err != nil {
		return nil, err
	}
	// 函数返回前关闭文件
	defer file.Close()

	var feeds []*Feed
	// 读取文件，并保存在指针指向的值中
	err = json.NewDecoder(file).Decode(&feeds)
	// 问题是，这是一个切片，数组怎么保存JSON的？
	return feeds, err
}