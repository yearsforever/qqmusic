var music = {
	dom : {},
	init : function(){
		this.docu();
		this.event();
	},
	docu : function(){
		var dom = this.dom;
		//DOM元素缓存
		dom.box = $('.box');
	},
	event : function(){
		var dom = this.dom;
		//获取榜单数据
		$.get('http://route.showapi.com/213-4',{
			showapi_appid:36595,
			showapi_sign:'46eb8ca21ed8482d9d93ff928bc00739',
			topid:27
		},function(res){
			// console.log(res)
			if (res && res.showapi_res_code == 0 ) {
				var data = res.showapi_res_body.pagebean.songlist;
				// console.log(data);
				var html = template('tpl',{
					data : data
				});
				dom.box.append(html);
			}
		})	
	}
}

$(function(){
	music.init();
})