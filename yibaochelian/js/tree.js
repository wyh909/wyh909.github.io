/**
* @desc 	首页的逻辑代码
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
var TREE = (function(){
	function initTree($el,param){
		COMMON.ajaxFn({
			url:param.port,//'usedCompontInput.do',
			obj: param.obj,
			callback: function(json){
				if(json.code == 1){
					var data = json.data.data || {},
					dataItem = {},
					treeHtml = [];
					treeHtml.push([
						'<ul>',
							'<li><span class="'+(param.isfold?'close':'open')+'"></span>全部</li>',
							'<ul class="line">'
					].join(''));
					
					if(param.url){
						url = param.url;
					}else{
						url = 'javascript:;';
					}
					
					for(var i=0, len = data.length; i<len ; i++){
						dataItem = data[i];
						treeHtml.push([
							'<li><span class="close"></span><a id="'+dataItem.productID+'" href="'+(url != 'javascript:;'?(url + dataItem.productID):url) +'">'+dataItem.productName+'</a></li>'
						].join(''));
					}
					treeHtml.push('</ul>');
					$el.html(treeHtml.join(''));
					// if(param.handler && typeof param.handler == 'function'){
					// 	param.handler($(this).html());
					// }
				}
			}
		});
		$el.on('click','span', function(){

		// tree
			var $this = $(this),
				$ul = $this.parent().next('ul');
			if($this.hasClass('open')){
				$this.removeClass('open').addClass('close');
				$ul.hide();
			}else {
				$this.removeClass('close').addClass('open');
				$ul.show();

			}

			
		}).on('click', 'a', function(){

			if(param.handler && typeof param.handler == 'function'){
				param.handler($(this).html());
			}
		});
	}
	return {
		tree: initTree
	}
})();
// $(function(){

	
	
// });