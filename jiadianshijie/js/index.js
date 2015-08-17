/**
 *	@desc		家电视界首页逻辑代码
 *				
 *	@author		wangyanhong
 *	@email		wyh909@126.com
 *	@version	0.0.1
 *	@date		2015-08-11
 *
 *	@depend		jQuery
 */
 (function(){
 	// slider
 	function dgtle_slider2(id,width) {
		var sliderBox = $('#' + id),
			sliderW = width,
			sliderUl = sliderBox.find('.slider'),
			sliderLis = sliderUl.find('a'),
			sliderimgs = sliderLis.find('img'),
			btnList = sliderBox.find('.slider_btn'),
			len = sliderLis.length,
			firstLi = sliderLis.eq(0),
			lastLi = sliderLis.eq(len - 1),
			next = sliderBox.find('.next'),
			pre = sliderBox.find('.prev'),
			timer = 0,
			index = 0;

		
		for (var i = 0; i < len; i++) {
			btnList.append($('<a>'));
			var btnli=btnList.find('a');
			btnli.eq(i).append(sliderimgs.eq(i).clone());

		}
		var btnlist_margin=($("#slider").width()-btnList.find('a').outerWidth(true)*btnList.find('a').size())/2;
		btnlist_margin=(btnlist_margin<=0)?0:btnlist_margin;
		btnList.css("margin-left",btnlist_margin+"px");

		firstLi.clone().appendTo(sliderUl);
		lastLi.clone().prependTo(sliderUl);
		sliderLis = sliderUl.find('a');
		len = sliderLis.length;
	    sliderLis.find('img').css('width', width + 'px');

		sliderUl.css({
			'width': len * sliderW + 'px',
			'left': -sliderW + 'px'
		});
		showBtn(index);

		// btnList.find('a').hover(function() {
			// var btn_index=$(this).index();
			//  btntimer = setTimeout(function(){
			//        var newLeft = (btn_index + 1) * -sliderW + 'px';
			// 		sliderUl.animate({'left': newLeft}, 500);
			// 		showBtn(btn_index);
			// 		index=btn_index;
			//     	},200);
			// },function(){
			//     clearTimeout(btntimer);
			// });

		next.on('click', nextMove);
		pre.on('click', preMove);

		timer = setInterval(nextMove,5000);
		sliderBox.hover(function() {
			clearInterval(timer);
		}, function() {
			timer = setInterval(nextMove,5000);
		});

		function nextMove() {
			if (sliderUl.is(':animated')) {
	            return false;
	        }
	        var left = parseInt(sliderUl.css('left'));
	        if (left === -sliderW * (len - 2)) {
	        	sliderUl.css('left', '0px');
	        }
	        sliderAnimate(-sliderW);
	        if (index === len - 3) {
	        	index = 0;
	        } else {
	        	index++;
	        }
	        showBtn(index);
		}

		function preMove() {
			if (sliderUl.is(':animated')) {
	            return false;
	        }
	        var left = parseInt(sliderUl.css('left'));
	        if (left === 0) {
	        	sliderUl.css('left', -sliderW * (len - 2) + 'px');
	        }
	        sliderAnimate(sliderW);
	        if (index === 0) {
	        	index = len - 3;
	        } else {
	        	index--;
	        }
	        showBtn(index);
		}

		function sliderAnimate(offset) {
			var newLeft = parseInt(sliderUl.css('left')) + offset + 'px';
			sliderUl.animate({'left': newLeft}, 500);
		}

		function showBtn(index) {
			btnList.find('a').eq(index).addClass('selected').siblings().removeClass('selected');
		}
	}
	// 初始化
 	function domRender(){
 		var slider_i=1;
		var width=$(window).width();
		if(width <=1024){
			dgtle_slider2('slider', 1024);
		}else{
			dgtle_slider2('slider', 1200);
		}
		// if(width<=986){
		// 	dgtle_slider2('slider', 986);
		// }else{
		// 	dgtle_slider2('slider', width);
		// }
		
		$(window).resize(function(){
			if(width<=1024){
				var window_width=$(window).width();
				if(window_width>=1024 && slider_i==1){
					$(".slider_btn").empty();
					var sliderLis = $(".slider").find('a');
					 $(".slider").find("img").css("width","");
					var len = sliderLis.length;
					var firstLi = sliderLis.eq(0);
					var lastLi = sliderLis.eq(len - 1);
					firstLi.remove();
					lastLi.remove();
					dgtle_slider2('slider', 1200);
					slider_i=0;
				}
			}
			// if(width<=986){
			// 	var window_width=$(window).width();
			// 	if(window_width>=986 && slider_i==1){
			// 		$(".slider_btn").empty();
			// 		var sliderLis = $(".slider").find('a');
			// 		 $(".slider").find("img").css("width",window_width+"px");
			// 		var len = sliderLis.length;
			// 		var firstLi = sliderLis.eq(0);
			// 		var lastLi = sliderLis.eq(len - 1);
			// 		firstLi.remove();
			// 		lastLi.remove();
					
			// 		dgtle_slider2('slider', window_width);
			// 		slider_i=0;
			// 	}
			// }
		});
 	}
 	// 绑定事件
 	function bindEvent(){
 		// 是否显示回到顶部
		// function showGoTop(){
			$(window).scroll(function(){
				var $goTop = $('a.go-top');
				if($(window).scrollTop()>$(window).height()){
					$goTop.show();
				}else{
					$goTop.hide();
				}
			});
		// }
		// 添加收藏
		$("#fav").click(function(){ 
	        var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd': 'CTRL'; 
	        if (document.all) { 
	            window.external.addFavorite('http://www.jdgod.com/', '家电视界'); 
	        } else if (window.sidebar) { 
	            window.sidebar.addPanel('家电视界', 'http://www.jdgod.com/', ""); 
	        } else { 
	            alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~'); 
	        }	
	            return false; 
		}); 
		// 回到顶部
		$('a.go-top').on('click', function(){
			$('body, html').animate({'scrollTop':0}, 500);
		});
 	}
	domRender();
	bindEvent();
	
 })();
 
