function Line() {
    this.cx = document.getElementById('canvas');
    this.ctx = this.cx.getContext('2d');
    this.dotColor = 'black';
    this.lineColor = 'black';
    this.objid = 0;
    this.MousePos = [0, 0];
    this.control = [false, true]
    this.isMove = false;
    this.isDown = false;
    this.offset = [0, 0, 0];
    this.lines = [
        
    ];//点
}

Line.prototype = {
    construct: function () {
        var leftcon = document.getElementById('leftcon');
        var rightcon = document.getElementById('target');
        this.offset[0] = offset(leftcon).left - offset(this.cx).left;
        this.offset[1] = offset(leftcon).top - offset(this.cx).top;
        this.offset[2] = offset(rightcon).left - offset(this.cx).left;
        if (this.lines) {
            leftcon.querySelectorAll('li div').forEach(function (el) {
                el.innerHTML = '';
            })
            this.lines.forEach(function (el, i) {
                var div1 = leftcon.querySelector('li[key="' + el.from[2] + '"] div');
                var del1 = document.createElement('strong');
                del1.style.left = el.from[3] + 'px';
                del1.style.top = el.from[4] + 'px';
                del1.setAttribute('key', el.id);
                del1.title = '删除';
                del1.onclick = function () {
                    delLine(el.id)
                }
                div1.appendChild(del1);
                var div2 = leftcon.querySelector('li[key="' + el._from[2] + '"] div');
                var del2 = document.createElement('strong');
                del2.style.left = el._from[3] + 'px';
                del2.style.top = el._from[4] + 'px';
                del2.setAttribute('key', el.id);
                del2.title = '删除';
                del2.onclick = function () {
                    delLine(el.id)
                }
                leftcon.querySelector('li[key="' + el._from[2] + '"] div').appendChild(del2);
            })
        }
    },
    move: function () {
        var _this = this;
        this.lines.map(function (el, i) {
            var scrollTop = document.getElementById('target').scrollTop;
            var obj = document.querySelector('#target li[key="' + el.to[2] + '"]');
            var _obj = document.querySelector('#target li[key="' + el._to[2] + '"]');
            var ry = offset(obj).top - offset(L.cx).top;
            var _ry = offset(_obj).top - offset(L.cx).top;
            el.from[0] = el.from[3] + _this.offset[0];
            el.from[1] = el.from[4] + _this.offset[1];
            el.to[0] = el.to[3] + _this.offset[2];
            el.to[1] = el.to[4] + ry - scrollTop;

            el._from[0] = el._from[3] + _this.offset[0];
            el._from[1] = el._from[4] + _this.offset[1];
            el._to[0] = el._to[3] + _this.offset[2];
            el._to[1] = el._to[4] + _ry - scrollTop;
            return el
        })
        this.render();
        window.requestAnimationFrame(this.move.bind(this));
    },
    render: function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.cx.width, this.cx.height);//清除
        this.ctx.save();
        this.lines.forEach(function (line, i) {
            _this.ctx.strokeStyle = _this.dotColor;
            _this.ctx.fillStyle = _this.lineColor;
            _this.ctx.shadowOffsetX = 2;
            _this.ctx.shadowOffsetY = 2;
            _this.ctx.shadowBlur = 3;
            _this.ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
            _this.ctx.lineWidth = 2;
            if (_this.objid == line.from[2]) {
                _this.ctx.beginPath();
                _this.ctx.arc(line.from[0], line.from[1], 4, 0, 2 * Math.PI);
                _this.ctx.fill();
                _this.ctx.moveTo(line.from[0], line.from[1]);
                if (_this.isMove && i === _this.lines.length - 1) {
                    _this.ctx.lineTo(_this.MousePos[0], _this.MousePos[1]);
                    _this.ctx.stroke();
                    _this.ctx.beginPath();
                    _this.ctx.arc(_this.MousePos[0], _this.MousePos[1], 4, 0, 2 * Math.PI);
                } else {
                    _this.ctx.lineTo(line.to[0], line.to[1]);
                    _this.ctx.stroke();
                    _this.ctx.beginPath();
                    _this.ctx.arc(line.to[0], line.to[1], 4, 0, 2 * Math.PI);
                }
                _this.ctx.fill();
                _this.ctx.closePath();
            }



            if (_this.objid == line._from[2] && _this.control[1]) {
                _this.ctx.beginPath();
                _this.ctx.moveTo(line._from[0], line._from[1]);
                _this.ctx.arc(line._from[0], line._from[1], 4, 0, 2 * Math.PI);
                _this.ctx.fill();
                _this.ctx.moveTo(line._from[0], line._from[1]);
                _this.ctx.lineTo(line._to[0], line._to[1]);
                _this.ctx.stroke();
                _this.ctx.beginPath();
                _this.ctx.arc(line._to[0], line._to[1], 4, 0, 2 * Math.PI);
                _this.ctx.fill();
                _this.ctx.closePath();
            }

        });
        this.ctx.restore();
    }
}


var index = 0;

var data = {
    tota: 2,
    indeximg :111,
    traces: [
        {
            forwardId: 107,
            forwardlatitude:"0.2500",
            forwardlongitude:"0.7353",
            id:722,
            latitude:"0.2500",
            longitude:"0.7353",
            posterid:106
        },
        {
            forwardId: 105,
            forwardlatitude:"0.38",
            forwardlongitude:"0.64",
            id:454,
            latitude:"0.10",
            longitude:"0.28",
            posterid:108
        }
    ],
    records:
    [{ "id": 106, "localPath": "img/fff70c68-9958-4004-a8df-ddf63beeb6f2.jpg", "terminalType": 1, "fileName": "Desert.jpg", "uploadTime": "2016-12-06 17:10:32", "resolution": "400*800" }, { "id": 105, "localPath": "img/498a2b1e-41b5-45cd-b4bf-7a8a65467287.jpg", "terminalType": 0, "fileName": "Chrysanthemum.jpg", "uploadTime": "2016-12-06 17:10:23", "resolution": "97*131" }, { "id": 107, "localPath": "img/23960615-382c-4747-b1fa-29651f6a5a85.jpg", "terminalType": 0, "fileName": "7.jpg", "uploadTime": "2016-12-06 18:39:47", "resolution": "97*131" }, { "id": 108, "localPath": "img/85ee71cf-b064-4047-83bb-419d8041fd98.jpg", "terminalType": 0, "fileName": "15.jpg", "uploadTime": "2016-12-06 18:40:01", "resolution": "97*131" }, { "id": 109, "localPath": "img/e3b5c03d-f9ab-4f93-8e8c-4e97962cce91.jpg", "terminalType": 0, "fileName": "15.jpg", "uploadTime": "2016-12-06 18:40:08", "resolution": "97*131" }, { "id": 111, "localPath": "img/f04c161b-dfb6-4079-b9ae-12c20c1a6b73.jpg", "terminalType": 0, "fileName": "15.jpg", "uploadTime": "2016-12-06 18:40:20", "resolution": "97*131" }, { "id": 112, "localPath": "img/467c9864-3ac1-4675-84b7-b4fdb18e9ffa.jpg", "terminalType": 0, "fileName": "2.jpg", "uploadTime": "2016-12-06 18:40:25", "resolution": "97*131" }, { "id": 113, "localPath": "img/b3ed1c87-d942-4b5c-8e59-c73a850160e1.jpg", "terminalType": 0, "fileName": "1.jpg", "uploadTime": "2016-12-06 18:40:31", "resolution": "97*131" }, { "id": 114, "localPath": "img/f452b9c9-d5aa-475a-8f7e-8c19670d2bd0.jpg", "terminalType": 0, "fileName": "3.jpg", "uploadTime": "2016-12-06 18:40:37", "resolution": "97*131" }, { "id": 115, "localPath": "img/adad04db-7a04-4925-8faa-233d1b297f0a.jpg", "terminalType": 0, "fileName": "4.jpg", "uploadTime": "2016-12-06 18:40:44", "resolution": "97*131" }],
    "success": true
}


//----------初始化

var img = data.records;
var html = ''
var len = img.length;
var indeximg = data.indeximg;
img.forEach(function (el, i) {
    html += '<li key=' + el.id + ' class='+(el.id==indeximg?"index":"")+'><img key=' + el.id + ' src="' + el.localPath + '" /><i>' + '( 第'+(i+1)+' / '+len+'张 ) - '+el.fileName + '</i><div></div></div></li>'
})

document.querySelectorAll('.area ul').forEach(function (el, i) {
    el.innerHTML = html;
})
document.querySelector('#target li[key="' + img[index].id + '"]').className = 'hide';

var w = document.querySelector('#entry li').offsetWidth;
var h = document.querySelector('#entry li').offsetHeight;


var L = new Line();
var main = document.getElementById('main');
L.cx.width = main.clientWidth;
L.cx.height = main.clientHeight;
L.objid = img[index].id;

var traces = data.traces;
traces.forEach(function(el,i){
    var line = {
        from: [el.latitude*w, el.longitude*h, el.posterid, el.latitude*w, el.longitude*h],
        to: [el.forwardlatitude*w, el.forwardlongitude*h, el.forwardId, el.forwardlatitude*w, el.forwardlongitude*h],
        _to: [el.latitude*w, el.longitude*h, el.posterid, el.latitude*w, el.longitude*h],
        _from: [el.forwardlatitude*w, el.forwardlongitude*h, el.forwardId, el.forwardlatitude*w, el.forwardlongitude*h],
        id: el.id
    }
    L.lines.push(line)
})
L.construct();
L.move();

//---------

function slide(dir) {
    var oUl = document.querySelectorAll('#entry ul')[0];
    var len = img.length;
    L.isDown = false;
    document.querySelector('#target li[key="' + img[index].id + '"]').classList.remove("hide");
    index += dir;
    var top = index * -206;
    if (index < 0) {
        index = 0;
        alert('已经是第一张了');
    } else if (index > img.length - 1) {
        index = img.length - 1;
        alert('已经是第最后一张了');
    } else {
        oUl.style.top = top + 'px';
        L.objid = img[index].id;
    }
    document.querySelector('#target li[key="' + img[index].id + '"]').classList.add("hide");
}

var aLi = document.querySelectorAll('#entry img');
var _aLi = document.querySelectorAll('#target img');
for (var i = 0; i < aLi.length; i++) {
    aLi[i].onmousedown = function (e) {
        var x = e.clientX - offset(this).left;
        var y = e.clientY - offset(this).top;
        var _x = e.clientX - offset(L.cx).left;
        var _y = e.clientY - offset(L.cx).top;
        var id = this.getAttribute('key');
        L.MousePos = [_x, _y];
        L.isMove = true;
        L.isDown = true;
        L.control[1] = false;
        if (!L.control[0]) {
            var key = parseInt(Math.random() * 10000);
            L.lines.push({
                from: [x, y, id, x, y],//canvas坐标,临时坐标,相对于图片点坐标
                _from: [x, y, id, x, y],
                to: [x, y, id, x, y],
                _to: [x, y, id, x, y],
                id: key
            })
            L.control[0] = true;
        }

        document.onmousemove = function (e) {
            var x = e.clientX - offset(L.cx).left;
            var y = e.clientY - offset(L.cx).top;
            L.MousePos = [x, y];
        }
    }
}

for (var i = 0; i < aLi.length; i++) {
    _aLi[i].onmousedown = function (e) {
        if (L.lines.length === 0 || !L.isDown) return
        L.isMove = false;
        L.control = [false, true];
        var scrollTop = document.getElementById('target').scrollTop;
        var x = e.clientX - offset(this).left;
        var y = e.clientY - offset(this).top + scrollTop;
        var id = this.getAttribute('key');
        var from = JSON.parse(JSON.stringify(L.lines[L.lines.length - 1].from));
        var to = JSON.parse(JSON.stringify(L.lines[L.lines.length - 1].to));

        L.lines[L.lines.length - 1].to = [x, y, id, x, y];
        L.lines[L.lines.length - 1]._from = [x, y, id, x, y];
        L.lines[L.lines.length - 1]._to = from;
        document.onmousemove = null;
        L.construct();

    }
}


document.getElementById('entry').onselectstart = function () {
    return false
}

document.getElementById('savebtn').onclick = function () {
    var arr = L.lines;
    var objarr = { data: { items: [] } }
    arr.forEach(function (el, i) {
        item = {
            id: el.id,
            posterid: el.from[2],
            forwardId: el.to[2],
            latitude: (el.from[3] / w).toFixed(4),
            longitude: (el.from[4] / h).toFixed(4),
            forwardlatitude: (el.to[3] / w).toFixed(4),
            forwardlongitude: (el.to[4] / h).toFixed(4),
        }
        objarr.data.items.push(item)
    })
    //
    console.log(objarr);
}

document.getElementById('setindex').onclick = function () {
    var id = img[index].id;
    document.querySelector('#entry li.index').classList.remove("index");
    document.querySelector('#target li.index').classList.remove("index");
    document.querySelector('#entry li[key="' + img[index].id + '"]').classList.add("index");
    document.querySelector('#target li[key="' + img[index].id + '"]').classList.add("index");

    
}

function delLine(id) {
    L.lines.forEach(function (el, i) {
        if (el.id == id) {
            L.lines.splice(i, 1);
        }
    })
    L.construct();
}

function offset(obj) {
    var top = obj.offsetTop;
    var left = obj.offsetLeft;
    var parent = obj.offsetParent;
    while (parent != null) {
        top += parent.offsetTop;
        left += parent.offsetLeft;
        parent = parent.offsetParent;
    };
    return { top: top, left: left };
}

//ajax封装
function ajax(obj) {
    if (!obj.url)
        return;
    var xmlhttp = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');    //这里扩展兼容性
    var type = (obj.type || 'POST').toUpperCase();
    xmlhttp.onreadystatechange = function () {    //这里扩展ajax回调事件
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && !!obj.success)
            obj.success(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status != 200 && !!obj.error)
            obj.error();
    };
    if (type == 'POST') {
        xmlhttp.open(type, obj.url, obj.async || true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(_params(obj.data || null));
    }
    else if (type == 'GET') {
        xmlhttp.open(type, obj.url + (obj.data ? ('?' + _params(obj.data || null)) : ''), obj.async || true);
        xmlhttp.send(null);
    }
}
//_params函数解析发送的data数据，对其进行URL编码并返回
function _params(data, key) {
    var params = '';
    key = key || '';
    var type = { 'string': true, 'number': true, 'boolean': true };
    if (type[typeof (data)])
        params = data;
    else
        for (var i in data) {
            if (type[typeof (data[i])])
                params += "&" + key + (!key ? i : ('[' + i + ']')) + "=" + data[i];
            else
                params += _params(data[i], key + (!key ? i : ('[' + i + ']')));
        }
    return !key ? encodeURI(params).replace(/%5B/g, '[').replace(/%5D/g, ']') : params;
}
