// 请求
res, err := http.Get(URI)
// 错误处理
if err != nil {
	//
}
// 关闭res，估计res是个channle
defer res.Body.Close()
// 错误处理
if res.StatusCode != 200 {
	//
}
// 拿到结果
Operate(res.Body)