/**
* @desc 	公用的头部与底部
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
$(function(){
	var data = {
		item: [{
			title: '应用性能管理（APM）',
			content: '面向多平台和多语言，快速、持续分析应用性能瓶颈'
		},{
			title: '移动端真是用户体验',
			content: '实时移动端用户行为及其性能体验分析'
		},{
			title: '浏览器端真实用户体验',
			content: '深入分析浏览器端的真实用户行为与性能体验'
		},{
			title: '平台性能分析',
			content: '面向应用，全局透视服务器，服务和数据库性能'
		},{
			title: '应用监控',
			content: '着眼保障应用整体运行的系统级监控，确保系统级SLA'
		},{
			title: '网站监控',
			content: '只能检测网站故障，稳定高效秒级'
		},{
			title: 'API监控',
			content: '中国首家API监控，关注面向业务流程的用户体验'
		},{
			title: '性能测试（Test）',
			content: '基于SaaS的真实分布式规模压力测试平台'
		}]
	};
	var html = template('model',data);
	$('ul', 'div.index').html(html);
	
	// slider
	$('div.slider .wrap').flexslider({
		animation: "slide"
	});
	// 帮助点击事件
	var $drop = $('div.drop','div.top');
	$('div.top').on('click', 'li.help', function(e){
		e.stopPropagation();
		$(this).addClass('on').find('.drop').show();
	}).on('click', 'div.drop a', function(e){
		e.stopPropagation();
		$drop.hide();
		$('li.help').removeClass('on');
	});
	$('body').on('click', function(e){
		$drop.hide();
		$('li.help').removeClass('on');
	});

});