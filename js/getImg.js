function getImg() {
    var show = document.getElementById('show');
    show.innerHTML = "";
    console.log('begin');
    var site = document.getElementById('put').value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var imgList = JSON.parse(xhr.responseText);
                showImg(imgList);
                waterfall();
            } else {
                console.log('请求完成但未成功');
            }
        }
    }
    xhr.open('GET', `http://localhost:8088?url=${site}`, true);
    xhr.send(null);
};

function showImg(imgList) {
    var flag = document.createDocumentFragment();
    for (let i = 0, l = imgList.length; i < l; i++) {
        var child = $(`<img src=${imgList[i]}>`);
        $('#show').append(child);
    }
    console.log('end');
}

function waterfall() {
    $('#show').masonry({
        itemSelector: 'img',
        // columnWidth: 0,
        gutter: 20, //槽宽
        transitionDuration: '1s', //重设位置动画持续时间
    });
}
