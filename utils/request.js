export const request = (config, contentType) => {
 
	config.url = 'http://localhost:8080' + config.url;
	config.methods = config.methods;
 
	if (!config.data) {
		config.data = {};
	}
	
	let promise = new Promise(function(resolve, reject) {
		uni.request(config).then(responses => {
			// 异常
			if (responses[0]) {
				reject({
					message: "网络超时"
				});
			} else {
				let res = responses[1]
				if (res.data.code === 1) {
					return resolve(res.data);
				} else {
					return reject(res.data.msg);
				}
			}
		}).catch(error => {
			reject(error);
		})
	})
	return promise;
};