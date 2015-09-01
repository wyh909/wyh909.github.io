/**
* @desc 	公用的头部与底部
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
(function(){
	function bindEvent(){
		var $tab = $('div.tabs'),
			$tabcon = $('div.item', 'div.tabcon');
		$('input', $tabcon).on('blur', function(){
			// 格式
		});
		$('input',$tab).on('click', function(){
			var $this = $(this);
			if($this.checked){
				return;
			}else{
				$tabcon.removeClass('on').eq($this.val()).addClass('on');

			}
		});
		$('a.btn-login').on('click', function(){
			var $curItem = $('div.tabcon div.on'),
				$msg = $('div.msg'),
				usr = '2@qq.com',//$('input.usr',$curItem).val(),
				pwd = '123456';//$('input.pwd', $curItem).val();
			if(usr && pwd){
				$.ajax({
					url: 'http://115.159.77.210:8080/ybcl2.0/enterprise/com.logon.do',
					data: {username: usr,pwd: pwd},
					type: 'POST',
					dataType: 'jsonp',
					success: function(json){
						if(json.code == 1){
							location.href = '/yibaochelian/index.html';
						}else{
							$('div.msg').addClass('error').html(json.message||'');
						}
					},
					error: function(){
						$msg.addClass('error').html('服务请求错误').show();
					}
				})
			}else{
				$msg.addClass('error').html('请输入正确的用户名及密码').show();
			}
		});
	}
	bindEvent();
})();