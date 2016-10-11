var cheerio = require('cheerio'),
    nodegrass = require('nodegrass'),
    url = require('url'),
    http = require('http'),
    qs = require('querystring');

http.createServer(function(require, response) { //搭建服务器
    response.setHeader('Access-Control-Allow-Origin', '*'); //跨域访问，*是域名
    //获取请求的网址
    var str = url.parse(require.url).query;
    var obj = qs.parse(str);
    var getUrl = obj.url;

    if (String(getUrl).substr(0, 7) != "http://") getUrl = "http://" + getUrl; //加Http头

    nodegrass.get(getUrl, function(data, status, headers) {
        var imgList = [];
        var $ = cheerio.load(data);
        $('img').each(function(index, element) {
            let imgUrl = $(element).attr('src');
            if (imgUrl.substr(0, 2) == '//') {
                imgUrl = "http:" + imgUrl;
            } else if (imgUrl.substr(0, 1) == '/') {
                imgUrl = getUrl + imgUrl;
            } else if (imgUrl.substr(0, 7) !== "http://" && imgUrl.substr(0, 8) !== "https://") {
                imgUrl = "http://" + imgUrl;
            }
            imgList.push(imgUrl);
        });
        imgList = unique(imgList); //数组去重
        response.writeHead(200, {
            'Content-Type': 'text/html;charset=UTF-8',
            'Cache-Control': 'no-cache',
        });
        console.log(imgList);
        response.write(JSON.stringify(imgList));
        response.end();
    });
}).listen(8088, function() {
    console.log('开始监听8088端口');
});

function unique(arr) {
    for (var i = 0, hash = {}, l = arr.length; i < l; i++) {
        if (hash[arr[i]] === undefined)
            hash[arr[i]] = 1;
    }
    var keys = [];
    i = 0;
    for (keys[i++] in hash);
    return keys;
}
