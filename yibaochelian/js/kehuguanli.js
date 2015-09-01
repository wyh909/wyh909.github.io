/**
* @desc 	首页的逻辑代码
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
$(function(){
	http://115.159.77.210:8080/ybcl2.0/enterprise/customerList.do?pageSize=5&pageNumber=1&facilitatorID=1//facilitatorID=1&pageNumber=1&pageSize=10
	http://115.159.77.210:8080/ybcl2.0/enterprise/customerList.do?pageSize=5&pageNumber=1&facilitatorID=1
	var th = {
		carOwner:'车主姓名',
		carNum:'车牌号',
		carBrand:'车辆品牌',
		carType:'车辆类型',
		orderItem:'预定项目',
		orderTime:'预定时间',
		coast:'花费',
		status:'状态',
		note:'备注'
		},
		tableObj = {
			id: 'table',
			port: 'customerList.do',
			itemId: 'id',
			th: th,
			param: {pageNumber:1,pageSize: 10}
		};
	COMMON.addTpl({table:1,th:th});
	COMMON.table(tableObj);
});