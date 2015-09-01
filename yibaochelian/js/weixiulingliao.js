/**
* @desc 	首页的逻辑代码
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
$(function(){
	var th = {
			productID:'商品编码',
			productname:'商品名称',
			unit:'单位',
			productnum :'数量',
			unitprice:'单价',
			maintenanceMan:'领料人'
		},
		tableObj = {
			id: 'table',
			port: 'usedCompontList.do',
			itemId: 'productID',
			th: th,
			param: {pageNum:1,status:0}
		};
	COMMON.addTpl({table:1,th:th});
	COMMON.table(tableObj);
	
});