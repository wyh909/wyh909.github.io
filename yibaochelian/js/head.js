/**
* @desc 	公用的头部与底部
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
(function(){
	var rootUrl = '/yibaochelian/';
	var href = document.location.href,
		port = 'http://115.159.77.210:8080/ybcl2.0/enterprise/',
		headHtml = [],
		footHtml = [],
		navHtml = [],
		searchHtml = [],
		adHtml = [],
		loginHtml = [],
		isOk = {};
	// 请求登录是否成功，获取用户信息
	function getUser(){
		var json = {ret : 1},
			loginHtml = [];
		// ajaxFn({
		// 	url: 'com.logon.do',
		// 	callback: function(json){
				if(json.ret ==1){
					var $loginH = $('div.login-hd'),
						data = json.data || {};
					loginHtml.push([
					'<div class="logined">',
						'<div class="welcome">',
							'<span class="username">' + (data.name||'') + '</span>，欢迎使用',
						'</div>',
						'<div class="user-opt">',
							'<a href="javascript:;" class="icon modifypwd">修改密码</a>',
							'<a href="javascript:;" class="icon logout">注销</a>',
						'</div>',
					'</div>'
				].join(''));
					if($('div.logined').size()>0){
						$('div.logined', $loginH).show();
					}else{
						$loginH.append(loginHtml.join(''));
					}
					$('div.loginbefore', $loginH).hide();
					// $('span.username','div.logined').html(data.name||'');
				}
		// 	}
		// });
	}
	// 头部是否有广告的位置,index,reg没有
	if(href.indexOf('login.html')>-1||href.indexOf('reg.html')>-1){
		adHtml = [];
	}else{
		adHtml = ['<div class="ad">',
					'<img src="img/ad.png" />',
				'</div>'];
	}
	headHtml.push([
		'<div class="head">',
			'<h1>亦宝车联</h1>',
				adHtml.join(''),
			'<div class="login-hd">',
				'<div class="loginbefore">',
					'<a href="javascript:;" class="btn-lgn">登录</a>',
					'<a href="javascript:;" class="btn-reg">注册</a>',
				'</div>',
			'</div>',
		'</div>'
	].join(''));
	footHtml.push([
		'<div class="foot">',
			'<p>京ICP备14024271号-1     Copyright @ YBCL 2014 Corporation, All rights Reserved</p>',
			'<div class="pin">',
				'<img src="img/pin01.png" alt="">',
				'<img src="img/pin02.png" alt="">',
			'</div>',
		'</div>'
	].join(''));
	navHtml.push([
		'<div class="nav-wrap">',
		'<a href="'+rootUrl+'index.html" data-id="0">首页</a>',
		'<span class="line">|</span>',
		'<a href="'+rootUrl+'yuyuejiedai.html" data-id="1">预约接待</a>',
		'<span class="line">|</span>',
		'<a href="'+rootUrl+'weixiujiedai.html" data-id="2">维修接待</a>',
		'<span class="line">|</span>',
		'<a href="'+rootUrl+'weixiulingliao.html" data-id="3">维修领料</a>',
		'<span class="line">|</span>',
		'<a href="'+rootUrl+'chejianguanli.html" data-id="4">车间管理</a>',
		'<span class="line">|</span>',
		'<a href="'+rootUrl+'kufangguanli.html" data-id="5">库房管理</a>',
		'<span class="line">|</span>',
		'<a href="'+rootUrl+'kehuguanli.html" data-id="6">客户管理</a>',
		'<span class="line">|</span>',
		'<a href="'+rootUrl+'yonghuguanli.html" data-id="7">用户管理</a>',
		'<span class="line">|</span>',
		'<a href="'+rootUrl+'caiwuguanli.html" data-id="8">财务管理</a>',
		'<span class="line">|</span>',
		'<a href="'+rootUrl+'xitongguanli.html" data-id="9">系统管理</a>',
		'</div>'
	].join(''));
	var selectBox = [];
	if(href.indexOf('kehuguanli')>-1){
		selectBox.push([
			'<a href="javascript:;" data-id="carOwner">客户名称</a>',
			'<a href="javascript:;" data-id="carOwnTel">电话</a>',
			'<a href="javascript:;" data-id="carNum">车牌号</a>',
			'<a href="javascript:;" data-id="status">状态</a>'
		].join(''));
	}else {
		selectBox.push([
			'<a href="javascript:;" data-id="name">客户名称</a>',
			'<a href="javascript:;" data-id="phone">电话</a>',
			'<a href="javascript:;" data-id="platenumber">车牌号</a>',
			'<a href="javascript:;" data-id="status">状态</a>'
		].join(''));

	}
	searchHtml.push([
		'<span class="select icons" data-id="'+(href.indexOf('kehuguanli')>-1?'carOwner':'name')+'">客户名称</span>',
		'<input type="text" class="inpt-search" />',
		'<a href="javascript:;" class="btn-search" ms-click="searchItem">搜索</a>',
		'<div class="select-box">',
			selectBox,
		'</div>'
	].join(''));
	$('div.header').html(headHtml.join(''));
	$('div.mainnav').html(navHtml.join(''));
	$('div.search').html(searchHtml.join(''));
	$('div.footer').html(footHtml.join(''));
	// $('div.page').html([
	// 	'<a href="javascript:;" class="prev">&lt;上一页</a>',
	// 	'<a href="javascript:;" class="on">1</a>',
	// 	'<a href="javascript:;">2</a>',
	// 	'<a href="javascript:;">3</a>',
	// 	'<a href="javascript:;">4</a>',
	// 	'<a href="javascript:;" class="next">下一页&gt;</a>'
	// ].join(''));


	$('div.header').on('click', 'a.modifypwd', function(){
		var $dialog = $('div.dialog-modify'),
			$mask = $('div.mask'),
			dialogHtml = [];
		if($dialog.size()>0){

			$dialog.show();
			$mask.show();
		}else{
			dialogHtml.push([
				'<div class="item">',
					'<label>输入旧密码：</label> <input type="text" id="oldpwd" class="inpt" />',
					'<div class="msg"></div>',
				'</div>',
				'<div class="item">',
					'<label>输入新密码：</label> <input type="text" id="newpwd" class="inpt" />',
					'<div class="msg"></div>',
				'</div>',
				'<div class="item">',
					'<label>确认新密码：</label> <input type="text" id="renewpwd" class="inpt" />',
					'<div class="msg"></div>',
				'</div>'
			].join(''));
			$('div.dialog').dialog({
				title: '修改密码',
				content: dialogHtml.join(''),
				button: [{text: '确定',cls:'btn-ok',handler:function($el){

					var param = {
						ent_id: $('span.username',$('div.logined')).text(),
						password: $('input.oldpwd',$el).val(),
						new_password:$('input.newpwd',$el).val()
					},
					$input = $('input',$el),
					$inputItem = null;
					checkVal($el);
					if(isOk.oldpwd && isOk.newpwd){
						$.ajax({
							url: port+'com.update.pwd.do',
							data: param,
							dataType: 'jsonp',
							type: 'GET',
							success: function(json){
								if(json.code==1){
									$('div.bd',$el).html('修改成功，重新登录');
									setTimeout(function(){
										$el.dialog('hide');
										location.href="login.html";
									},2000);
								}
							}
						});
					}
						
				}
				},{text: '取消',cls:'btn-cancel',handler:function($el){
					$el.dialog('hide');
				}}],
				callback: function($el){
					$el.addClass('user');
				}
			});
		}
	});
	function blurEvent(input){ 
        var $curInput = $(input),
        val = $.trim($curInput.val() || ''),
        curId = $curInput.attr('id').substring(1);
        $msg_txt = $curInput.siblings('.msg');
        if (curId == 'oldpwd') {
        	if(!val){
                $msg_txt.html('旧密码不能为空').addClass('error').show();
                isOk.oldpwd = false;
                return;
            } else {
                isOk.oldpwd = true;
            }
        } else if (curId == 'newpwd') {
            if (!val) {
                $msg_txt.html('新密码不能为空').addClass('error').show();
                isOk.newpwd = false;
                return;
            } else{
                isOk.newpwd = true;
            }
        } else if (curId == 'renewpwd') {
            if (!val) {
            	$msg_txt.html('重复密码不能为空').addClass('error').show();
                isOk.pwd = false;
                return;
            }else if(val != $('#newpwd').val()){
                $msg_txt.html('与新密码不一致').addClass('error');
                isOk.repwd = false;
                return;
            } else {
                isOk.repwd = true;
            }
        }
        $msg_txt.removeClass('error').hide();
    }

	function checkVal($el){
		$('input',$el).on('blur',function(){
            blurEvent($(this));
        });
    }

	getUser();
})();