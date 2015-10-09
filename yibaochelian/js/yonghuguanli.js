/**
* @desc 	用户管理的逻辑代码
* @author 	wangyanhong
* @date 	2015-08-22
* @version 	v0.0.1
*/
$(function(){
	var th = [{
			id: 'name', name:'姓名'},{
			id: 'account', name:'账号'
		}],
		roleTh = [{
			id: 'name', name: '角色名称'},{
			id: 'desc', name: '角色描述'
		}],
		classOpt = [],
		defaultParam = {'facilitatorID':(COMMON.getCookie('facilitatorID')||1),'companyUserID':(COMMON.getCookie('companyUserID')||1)},

		editObj = {
			itemId: 'id',
			editItem: [{
				id: 'name',name: '姓名',value:'1',type: 0},{
				id: 'dept', name: '部门',value:'',type:1,selected:'',options:[]},{
				id: 'account', name: '账号',value:''},{
				id: 'password', name: '密码',value:''},{
				id: 'repassword', name: '确认密码',value:''},{
				id: 'roles', name: '关联角色名称',type:1,selected:[],options:[],isMulti:true},{
				id: 'duty', name: '职责',value:''
			}]
		},
		tableObj = {
			id: 'table',
			port: 'listUsersByPage.do',
			saveport: 'saveOrUpdateUsers.do',
			delport: 'deleteUsersById.do',
			itemId: 'id',
			th: th,
			param: {pageNum:1,pageSize: 10}
		},
		roleTableObj = {
			id: 'table',
			port: 'roleList.do',
			saveport: 'roleSaveUpdate.do',
			itemId: 'id',
			th: roleTh,
			param: {pageNum:1,pageSize: 10}
		},
		userModel=null,
		roleModel = null,
		userEdit=null,
		roleEdit = null,
		$dialog = $('div.winpop'),
		$mask = $('div.mask'),
		userData = {},
		roleData = {};

	function domRender(){
		var edittpl = [],
			param = $.extend({},defaultParam,{pageNum:1,pageSize:10});
		
		// $.ajax({
		// 	url: 'http://115.159.77.210:8080/ybcl2.0/roleList.do',
		// 	data: defaultParam,
		// 	type: 'GET',
		// 	dataType: 'jsonp',
		// 	success: function(){

		// 	},error: function(XMLHttpRequest, textStatus, errorThrown) {
		// 	alert(XMLHttpRequest.status);
		// 	alert(XMLHttpRequest.readyState);
		// 	alert(textStatus);
		// 	}
		// })
		userEdit = avalon.define({
			$id: 'useredit',
			itemId: 'id',
			item: editObj.editItem,
			roles: [],
			newData: userData,
			change: function(e){
				if($(e.target).attr('id')=='repassword'){
					if(e.target.value != $('#password').val()){
						if($('.error', $dialog).size()>0){
							$('.error', $dialog).show();
						}else{
							$('.bd', $dialog).append('<div class="error">与密码不一致</div>');
						}
					}else{
						$('.error', $dialog).hide();
					}
				}
				userData[e.target.getAttribute('id')] = e.target.value;
			},
			cancelItem: function(){
				hideDialog();
			},
			getRole: function(){
				COMMON.ajaxFn({
					url: 'roleList.do',
					obj: {pageSize:10,pageNum:1},
					callback: function(json){
						var data = json.data.data ||[],roleList=[];
						for(var i=0,len=data.length; i<len; i++){
							roleList.push({text:data[i].name, value:data[i].id});
							// roleList.push(data[i].name||'test');
						}
						// roleList.push({text:'test',value:1});
						// roleList.push({text:'test1',value:2});
						// classOpt = roleList;
						// userEdit.item.option = roleList;
						// userEdit.item[0].rolename = roleList;
						// userEdit.newData.rolename = roleList;
						// editObj.editItem[3].option = roleList;
						for(var j=0,jLen=userEdit.item.length; j<jLen; j++){
							if(userEdit.item[j].id == 'roles'){
								userEdit.item[j].options = roleList||[];
								userEdit.item[j].selected = data[1].id;
							}
						}
								
					}	
				});
				// 获取部门列表
				COMMON.ajaxFn({
					url: 'listDeptByPage.do',
					obj: {pageSize:10,pageNum:1},
					callback: function(json){
						var data = json.data.data ||[],departList=[];
						for(var i=0,len=data.length; i<len; i++){
							departList.push({text:data[i].departmentName, value:data[i].departmentName});
							// departList.push(data[i].name||'test');
						}
						userEdit.item[1].options = departList||[];
						userEdit.item[1].selected = data[0].departmentName;
					}	
				});
			},
			saveItem: function(){
				// 添加
				var $user = $('div.bd-user', $dialog);
				userData.name = $('#name',$user).val();
				userData.departmentName = $('#dept',$user).val();
				userData.account = $('#account',$user).val();
				userData.role_ids = $('#roles',$user).val()?$('#roles',$user).val().join(','):'';
				userData.duty = $('#duty',$user).val();


				userEdit.newData = userData;
				COMMON.ajaxFn({
					url: 'saveOrUpdateUsers.do',
					obj: userEdit.newData,
					// obj: userData,
					callback: function(json){
						if(json.code ==1){
							var $dialog = $('div.dialog'),
								$item = $('div.item', $dialog);
							// 重新调用初始化列表的接口，并关闭弹窗

							tableInit();
							hideDialog();
							for(var i=0,len=$('div.item','div.dialog').length; i<len; i++){

							}
							$('#name',$user).val('');
						}
					}
				})
			}
		});


		// roleEdit = avalon.define({
		// 	$id: 'roleedit',
		// 	itemId: 'id',
		// 	roles: ['权限1','权限2','权限3','权限4','权限5','权限6'],
		// 	// item: editObj.editItem,
		// 	newData: roleData,
		// 	cancelItem: function(){
		// 		hideDialog();
		// 	},
		// 	saveItem: function(){
		// 		saveRole();
				
		// 	}
		// });

		// COMMON.table(tableObj);
		userModel = avalon.define({
			$id: 'table',
			th: th,
			tr: [],
			ids: [],
			isOpt: true,
			rolename: [],
			rolenames: [],
			getkey: function(index, key){
				if(userModel.tr.size()>0 && userModel.tr[index]){
					return userModel.tr[index][key];
				}
				
			},

			addItem: function(txt){
				showDialog('user', 'add');
			},
			editItem: function(index){
				$('div.bd-role',$dialog).hide();
				$('div.bd-user',$dialog).hide();
				showDialog('user','edit',index);
				userData.id = index;
			},
			delItem: function(index){
				$('div.winpop').dialog({
					title: '窗口提示',
					content: '确定删除此条数据吗',
					button: [{
						text: '确定',
						cls:' btn-ok',
						handler: function($el){
							COMMON.ajaxFn({
								url: 'deleteUsersById.do',
								obj: {id: index},
								callback: function(json){
									if(json.code == 1){
										tableInit();
										$el.dialog('hide');
									}else{
										alert('删除失败');
									}
									
								}
							});
						}
					},{
						text: '取消',
						cls: 'btn-cancel',
						handler: function($el){
							$el.dialog('hide');
						}
					}]
				})
						
			}
		});
		// 角色列表及修改
		// roleModel = avalon.define({
		// 	$id: 'roletable',
		// 	th: roleTh,
		// 	tr: [],
		// 	getkey: function(index, key){
		// 		if(roleModel.tr.size()>0 && roleModel.tr[index]){
		// 			return roleModel.tr[index][key];
		// 		}
				
		// 	},
		// 	addItem: function(){
		// 		showDialog('role','add');
		// 	},
		// 	editItem: function(index,name){
		// 		$('div.bd-user',$dialog).hide();
		// 		$('div.bd-role',$dialog).hide();
		// 		showDialog('role', 'edit', index, name);
		// 	}
		// });
		tableInit();
		// tableInit('role');
		// userEdit.item[1].value = 'aa';
	}

	function showDialog(type, status, index,name){
		var tit = status == 'add'?'添加用户':'编辑用户',
			port = '',
			$dialog = $('div.winpop'),
			$role = $('div.bd-role',$dialog),
			$user = $('div.bd-user',$dialog);

		$('div.hd',$dialog).html(tit);
		if(type == 'user'){
			// 用户管理
			port = tableObj.port;
			$user.show();
			$role.hide();
		}else {
			// // 角色管理
			// port = roleTableObj.port;
			// $role.show();
			// $user.hide();
			// $('#rolename',$role).val(name);
		}
			$dialog.show();
			$mask.show();
		if(status != 'add'){
			$('#account').parent().parent().hide();
			$('#password').parent().parent().hide();
			$('#repassword').parent().parent().hide();
			// COMMON.ajaxFn({
			// 	url: port,
			// 	obj: {id:index},
			// 	callback: function(json){
			// 	// var json = {};
			// 	// 	json.code=2;
			// 	// 	json.data = {};
			// 	// 	json.data.data = [{name: 'zhansan',auIDS:[1,2,3]}];
			// 		// userEdit.newData = json.data.data;
			// 		if(json.code == 1){
						// var detailData = json.data.data||{},
						var detailData = {},
							editItem = {},
							newData = {},
							editItemKey = null,
							editItemVal = null,
							roleData = {},
							roleItem = [];
							if(type == 'user'){
								// detailData = detailData[0];
								for(var k=0,kLen=userModel.tr.length; k<kLen; k++){
									if(userModel.tr[k].id == index){
										detailData = userModel.tr[k];
										k=kLen;
									}
								}
								editItem = editObj.editItem;
								for(var i=0,len=editItem.length; i<len; i++){

									editItemKey = editItem[i]['id'];
									if(editItemKey == 'roles'){
										// roleData = editItem[3]['options'];
										// editItemVal = detailData[editItemKey];
										// for(var j=0,jLen=roleData.length; j<jLen; j++){
										// 	if(editItemVal.indexOf(roleData[i])>-1){
										// 		userEdit.item[i].selected = 
										// 	}
											
										// }
										roleData = detailData[editItemKey];
										for(var j=0,jLen=roleData.length,roleItem=[]; j<jLen; j++){
											// 判断角色的值是否在当前列表选项中
											
											roleItem.push(roleData[j].id);
										}
										userEdit.item[i].selected = roleItem;
										newData[editItemKey] = roleItem;
									}else if(editItemKey == 'dept'){
										// roleData = editItem[1]['options'];
										// editItemKey = 'dept';
										editItemVal = detailData[editItemKey]
										editItem[1].selected = editItemVal;
										userEdit.item[1].selected = editItemVal;
									}else{
										editItemVal = detailData[editItemKey]||'';
										userEdit.item[i].value = editItemVal;
									
									}
										newData[editItemKey] = editItemVal;
									// newData['rolename'] = 'test';
									// edit.item[i] = newData;
								}
								// COMMON.ajaxFn('roleList.do',defaultParam, function(){

								// });
								newData.id = index;
								userEdit.newData = newData;
							}

						$dialog.show();
						$mask.show();
						
			// 		}
			// 	}
			// });
		}else{
			$('#account').parent().parent().show();
			$('#password').parent().parent().show();
			$('#repassword').parent().parent().show();
			for(var i=0,len=editObj.editItem.length; i<len; i++){
				userEdit.item[i].value = '';
			}
		}
		
	}
	function hideDialog(){
		
		$dialog.hide();
		$mask.hide();
	}
	function tableInit(type){

		var param = null,port=null;
		// if(type == 'role'){
		// 	param = $.extend({},defaultParam,roleTableObj.param);
		// 	port = roleTableObj.port;
		// }else{
		// 	param = $.extend({},defaultParam,tableObj.param);
		// 	port = tableObj.port;
		// }
		param = $.extend({},defaultParam,tableObj.param);
		port = tableObj.port;
		COMMON.ajaxFn({
			url: port,
			obj: param,
			callback: function(json){
				if(json.code ==1){

					var data = json.data || {},
						item = null,
						tr = [],
						ids = [],
						rolenames = [];
					$('tr.loading').hide();
					if(type == 'role'){
						// roleModel.tr = data;
					}else{
						if(data){
							if(data.data){
								if(data.data.length>0){
									userModel.tr = data.data;
									$('tr.loading').hide();
								}else{
									domDefault();
								}
							}else{
								domDefault();
							}
							if(data.total && data.total>1){
								$('div.page').show();
							}else{
								$('div.page').hide();
							}
						}else{
							domDefault();
						}
						
					}
				}
			}
		});
	}
	function domDefault(){
		$('tr.loading td').html('暂无数据');
		$('tr.loading').show();
	}
	function saveRole(index){
		// 添加
		var $role = $('div.bd-role',$dialog),
			$input = $('input:checkbox',$role);
			auIDS = [];
		if(index){
			roleData.index = index;
		}
		roleData.name = $('#roles').val();

		for(var i=0,len=$input.length;i<len; i++){
			if($input[i].checked){
				auIDS.push('1');
			}else{
				auIDS.push('0');
			}
			
		}
		roleData.auIDS = auIDS.join(',');
		roleData.desc = $('#roledesc').val();
		roleEdit.newData = roleData;
		COMMON.ajaxFn({
			url: 'saveOrUpdateUsers.do',
			// obj: userObj,
			obj: roleData,
			callback: function(json){
				if(json.code ==1){
					// 重新调用初始化列表的接口，并关闭弹窗
					tableInit('role');
					hideDialog();
				}
			}
		})
	}
	domRender();
});