/**
* @desc 	首页的逻辑代码
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
$(function(){
	var th = {'appointmentNum':'预约编号','maintainfortNum':'维修单号','truename':'真实姓名','platenumber': '车牌号','phone':'电话','maintaintype':'类别','status':'状态'},
		tableObj = {
			id: 'table',
			port: 'appointmentList.do',
			itemId: 'appointmentNum',
			th: th,
			param: {pageNum:1,status:0}
		};
	COMMON.addTpl({table:1,th:th});
	COMMON.table(tableObj);
	
});