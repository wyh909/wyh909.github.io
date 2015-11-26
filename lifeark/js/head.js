$(function(){
	var nav = [
	      	'<div class="meizu-header clearfix">',
	        	'<div class="meizu-header-wrap-1200">',
	          		'<div class="meizu-header-logo"> <a href="#" class="meizu-header-logo-img"></a> </div>',
	  				'<div class="meizu-header-log"> ',            
			            '<ul class="meizu-log">',
			              '<li style="display: block;" class="log-dd-trigger" id="_unlogin"> <a href="javascript:;"> <img src="images/log.png" alt="log"></a>',               
			              '</li>',
			            '</ul>',
			            '<div class="login-info drop">',
		            		'<a href="reg.html"> 会员注册</a>',
		            		'<a href="login.html"> 立即登入</a>',
		            		'<a href="javascript:;"> 我的预约</a>',
		            		'<a href="javascript:;"> 我的细胞</a>',
		            		// '<div class="login-item">',
		            		// 	'<a href="login.html" class="btn-login">立即登录</a>',
		            		// '</div>',
			            	// '<div class="login-item">',
			            	// 	'没有帐号？<a href="javascript:;" class="fblue">立即注册</a>',
			            	// '</div>',
			            	// '<div class="login-item">',
			            	// 	'<a href="javascript:;" class="myinfo">我的预约</a>&nbsp;&nbsp;&nbsp;&nbsp;',
			            	// 	'<a href="javascript:;" class="myinfo">我的细胞</a>',
			            	// '</div>',
			            '</div>',
	  				'</div>',
					'<ul class="meizu-header-link">',
						'<li>',
							' <a href="index.html" class="curred">首页</a>',
							
						' </li>',  
						'<li>',
							' <a href="javascript:;">关于我们</a> ',
							'<div class="drop">',
								'<a href="news.html">新闻动态</a>',
								'<a href="advantage.html">荣誉资质</a>',
								'<a href="nkbank.html">企业介绍</a>',
							'</div>',
						'</li>',          
						'<li>',
							' <a href="javascript:;">细胞银行</a> ',
							'<div class="drop">',
								'<a href="cells.html">NK细胞</a>',
								'<a href="youth.html">私人定制</a>',
								'<a href="case.html">案例展示</a>',
								'<a href="team.html">专家专利</a>',
							'</div>',
						'</li>',
						// '<li> <a href="youth.html">致青春</a> </li>',       
						'<li>',
							' <a href="javascript:;">会员专区</a> ',
							'<div class="drop">',
								'<a href="login.html">会员信息</a>',
								'<a href="reservation.html">专家预约</a>',
								'<a href="contact.html">联系我们</a>',
							'</div>',
						'</li>',
					'</ul>',
	        	'</div>',
	      	'</div>  '
	],
		footer = [
		'<div class="footer">',
	        '<div class="ft-top">',
	        	'<div class="ft-logo">',
	            	'<a href=""><img src="images/fz.png"></a>',
	                '<img class="line" src="images/line.jpg">',
	                '<a href=""><img src="images/xb.png"></a>',
	                '<p>为自己的青春与健康做一份定投</p>',
	            '</div>',
	            '<ul class="ft-list">',
	            	'<li><h3>关于我们</h3></li>',
	                '<li><a href="news.html">新闻动态</a></li>',
	                '<li><a href="advantage.html">荣誉资质</a></li>',
	                '<li><a href="nkbank.html">企业介绍</a></li>',
	            '</ul>',
	            '<ul class="ft-list">',
	            	'<li><h3>细胞银行</h3></li>',
	                '<li><a href="youth.html">私人定制</a></li>',
	                '<li><a href="case.html">案例展示</a></li>',
	                '<li><a href="advantage.html">专家专利</a></li>',
	            '</ul>',
	            '<ul class="ft-list">',
	            	'<li><h3>会员中心</h3></li>',
	                '<li><a href="login.html">会员信息</a></li>',
	                '<li><a href="reservation.html">专家预约</a></li>',
	                '<li><a href="contact.html">联系我们</a></li>',
	            '</ul>',
	            '<div class="erwei">',
	            	'<div class="hottel">',
		            	'<p>24小时全国统一服务热线</p>',
		                '<h3>400-066-5505</h3> ',
		            '</div>',
		            '<div class="code">',
		            	'<img src="images/erwei.jpg">',
		            	'<p>扫一扫，更多精彩</p>',
		            '</div>',
	            '</div>',
	        '</div>',
	        '<div class="ft-bottom">',
	        	'<p class="copyright">地址：浙江省杭州市高新技术开发区（滨江）楚天路88号   服务热线：400-066-5505  邮箱：zhongying@lifeark.com.cn</p>',
	            '<p class="copyright">COPYRIGHT   2013中赢集团 ALL RIGHTS RESERVED</p>',
	        '</div>',
	    '</div>'
	];
	$('#headerNav').html(nav.join(''));
	$('footer').html(footer.join(''));
	$('ul','div.meizu-header-log').unbind().bind('click', function(){
		var $loginInfo = $('div.login-info');
		$loginInfo.toggle();
	});
	var $nav = $('#headerNav'),
		$drop = $('div.drop', $nav);
	$('ul.meizu-header-link li',$nav).hover(function(){
		var $this = $(this);
		$drop.hide();
		$this.find('div.drop').show();
	},function(){
		$drop.hide();
	});

	// news tab切换
	var $tab = $('span', 'div.tabs'),
		$tabcon = $('div.item', 'div.tabcon');
	$tab.eq(0).addClass('on');
	$tabcon.eq(0).addClass('on');
	$tab.unbind().bind('click', function(){
		var $this = $(this),
			index = $this.index();
		$tab.removeClass('on').eq(index).addClass('on');
		$tabcon.removeClass('on').eq(index).addClass('on');
	});
	// 分页

});
