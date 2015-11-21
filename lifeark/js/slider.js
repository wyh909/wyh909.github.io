$(document).ready(function() {
		$(".box ul li:first").clone().appendTo($(".box ul"));
		var $key=0; 
		var $circle=0;
	var timer=setInterval(autoplay,5000);
	function autoplay(){

		$key++; 

		
		if($key>$(".box ul li").length-1)
		{
			$key=1;
			$(".box ul").css("left",0);
		}
		$(".box ul").stop().animate({"left":-$key*$(".box ul li").width()},500);  

        
		$circle++;
		if($circle>$(".box ol li").length-1) 
		{
			$circle=0;  
		}
		$(".box ol li").eq($circle).addClass('current').siblings().removeClass('current');
	}

	
	$(".box").hover(function() {
		clearInterval(timer);
		timer=null;
	}, function() {
		clearInterval(timer);
		timer=setInterval(autoplay, 5000);
	});

	
	$(".box ol li").click(function(event) {
		$key=$(this).index();
		$circle=$(this).index();
		$(this).addClass('current').siblings().removeClass("current");
		$(".box ul").stop().animate({"left":-$key*$(".box ul li").width()},500);  
	});
	$('div.item', 'div.dot').on('mouseover', function(){
		var index = $(this).index();
		$('div.item', 'div.dot').removeClass('on');
		$(this).addClass('on');
		$('p', 'div.dot').hide().eq(index).show();

	}).on('mouseout', function(){
		$('p', 'div.dot').hide();
	});
});