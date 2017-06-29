var single = {
	dom : {},
	lyric : [],
	init : function(){
		this.docu();
		this.event();
	},
	docu : function(){
		var dom = this.dom;
		dom.div = $('.head div');
		dom.body = $('.body');
		dom.song = $('.song_info h2');
		dom.singer = $('.song_info p');
	},
	event : function(){
		var dom = this.dom;
		var lyric = this.lyric;
		//获取歌名
		var songname = decodeURIComponent(document.URL.split('?')[1].split('&')[1].split('=')[1]);
		dom.song.html(songname);
		// 获取作者
		var singername = decodeURIComponent(document.URL.split('?')[1].split('&')[2].split('=')[1]);
		dom.singer.html(singername);
		//获取歌曲id
		var songid = document.URL.split('?')[1].split('&')[0].split('=')[1];
		//获取歌词
		$.get('http://route.showapi.com/213-2',{
			showapi_appid:36595,
			showapi_sign:'46eb8ca21ed8482d9d93ff928bc00739',
			musicid:songid
		},function(res){
			if (res && res.showapi_res_code == 0 ) {
				var text = res.showapi_res_body.lyric.replace(/&#\d+;/g,function(char){
					return String.fromCharCode(char.substr(2,2));
				}).split('\n');
				// console.log(text);
				//将歌词的数组做进一步处理
				for (var i = 0; i < text.length; i++) {
					var geci = text[i].split(']')[1];
					// 把没有歌词给过滤掉
					if (!geci) {
						continue;
					}
					//对时间进行过滤  [02:23:42
					var time = text[i].split(']')[0];

					console.log(time);
					lyric.push(geci);
				}
				// console.log(lyric);
			}
		})
	}
}

$(function(){
	single.init();
})




// 获取浏览器地址栏参数信息
function getQuery(name, url) {
    var u = url || location.search,
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        r = u.substr(u.indexOf("\?") + 1).match(reg);
    return r != null ? r[2] : "";
}
