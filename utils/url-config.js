//线上测试环境
const TEST = "https://223.87.166.240:9123";
//生产环境
// const PROD = "http://shfw.lzjczl.com:8804"; http://192.168.1.5:8082/
// const PROD = "http://223.87.166.240:8016";
const PROD = "http://101.207.141.78:8013";
// const PROD ="http://192.168.1.20:9010"
//本地开发环境
const DEV = "";
//判断并选取环境
var url_config = "";
try {
  if(0 < plus.navigator.getUserAgent().indexOf("Html5Plus")){
  	url_config = PROD
	// url_config = ""
  }
} catch(err) {
	url_config = ""
}
export default url_config
// TEST PROD  DEV
// export default  PROD
// export default  DEV