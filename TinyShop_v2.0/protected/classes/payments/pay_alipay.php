<?php
 /**
 * @class pay_alipay
 * @brief 支付宝【双向接口】插件类
 */
class pay_alipay extends PaymentPlugin{

    //支付插件名称
    public $name = '支付宝';
    
    //提交地址
    public function submitUrl(){
        return 'https://mapi.alipay.com/gateway.do?_input_charset=utf-8';
    }
	//取得配制参数
    public static function config()
    {
    	return array(
    		array('field'=>'partner_id','caption'=>'合作身份者id','type'=>'string'),
    		array('field'=>'partner_key','caption'=>'安全检验码key','type'=>'string'),
    	);
    }
    
    //同步处理
    public function callback($callbackData,&$paymentId,&$money,&$message,&$orderNo)
    {
        //除去待签名参数数组中的空值和签名参数
        $filter_param = $this->filterParam($callbackData);

        //对待签名参数数组排序
        $para_sort = $this->argSort($filter_param);

        //生成签名结果
        $payment = new Payment($paymentId);
		$payment_plugin = $payment->getPaymentPlugin();
		$classConfig = $payment_plugin->getClassConfig();

        $mysign = $this->buildSign($para_sort,$classConfig['partner_key']);

        if($callbackData['sign'] == $mysign)
        {
            //回传数据
            $orderNo = $callbackData['out_trade_no'];
            $money   = $callbackData['total_fee'];

            if($callbackData['trade_status'] == 'TRADE_FINISHED' || $callbackData['trade_status'] == 'WAIT_SELLER_SEND_GOODS')
            {
                return true;
            }
        }
        else
        {
            $message = '签名不正确';
        }
        return false;
    }

    //异步处理
    public function asyncCallback($callbackData,&$paymentId,&$money,&$message,&$orderNo)
    {
        //除去待签名参数数组中的空值和签名参数
        $filter_param = $this->filterParam($callbackData);

        //对待签名参数数组排序
        $para_sort = $this->argSort($filter_param);

        //生成签名结果
        $payment = new Payment($paymentId);
		$payment_plugin = $payment->getPaymentPlugin();
		$classConfig = $payment_plugin->getClassConfig();

        $mysign = $this->buildSign($para_sort,$classConfig['partner_key']);

        if($callbackData['sign'] == $mysign)
        {
            //回传数据
            $orderNo = $callbackData['out_trade_no'];
            $money   = $callbackData['total_fee'];

            if($callbackData['trade_status'] == 'TRADE_FINISHED' || $callbackData['trade_status'] == 'WAIT_SELLER_SEND_GOODS')
            {
                return true;
            }
        }
        return false;
    }
    
    //后期与服务同步处理类
    public function afterAsync()
    {
        $payment = new Payment($this->paymentId);
        $paymentObj = $payment->getPayment();
        return new AlipayDelivery($paymentObj['partner_id'],$paymentObj['partner_key']);
    }
    
    //打包数据
    public function packData($payment)
    {
        $return = array();

        //基本参数
        $return['service'] = 'trade_create_by_buyer';
        $return['seller_id'] = $payment['M_PartnerId'];
        $return['partner'] = $payment['M_PartnerId'];
        $return['_input_charset'] = 'utf-8';
        $return['payment_type'] = 1;
        $return['return_url'] = $this->callbackUrl;
        $return['notify_url'] = $this->asyncCallbackUrl;

        $return['subject'] = $payment['R_Name'];
        $return['out_trade_no'] = $payment['M_OrderNO'];
        $return['price'] = number_format($payment['M_Amount'], 2, '.', '');
        $return['quantity'] = 1;
        $return['logistics_fee'] = "0.00";
        $return['logistics_type'] = "EXPRESS";
        $return['logistics_payment'] = "SELLER_PAY";

        if(isset($payment['P_Name']))
        {
            $return['receive_name'] = $payment['P_Name'];
            $return['receive_address'] = $payment['P_Address'];
            $return['receive_zip'] = $payment['P_PostCode'];
            $return['receive_phone'] = $payment['P_Telephone'];
            $return['receive_mobile'] = $payment['P_Mobile'];
        }

        //过虑无效参数
        $filter_param = $this->filterParam($return);

        //对待签名参数数组排序
        $para_sort = $this->argSort($filter_param);

        //生成签名
        $mysign = $this->buildSign($para_sort, $payment['M_PartnerKey']);

        //签名结果与签名方式加入请求提交参数组中
        $return['sign'] = $mysign;
        $return['sign_type'] = 'MD5';

        return $return;
    }

    private function filterParam($para)
    {
        $filter_param = array();
        foreach($para as $key => $val)
        {
            if($key == "sign" || $key == "sign_type" || $val == "")
            {
                continue;
            }
            else
            {
                $filter_param[$key] = $para[$key];
            }
        }
        return $filter_param;
    }

    private function argSort($para)
    {
        ksort($para);
        reset($para);
        return $para;
    }

    //生成签名
    private function buildSign($sort_para,$key,$sign_type = "MD5")
    {
        //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
        $prestr = $this->createLinkstring($sort_para);
        //把拼接后的字符串再与安全校验码直接连接起来
        $prestr = $prestr.$key;
        $mysgin = md5($prestr);
        return $mysgin;
    }

    //生成连接字符串
    private function createLinkstring($para){
        $arg  = "";
        foreach($para as $key => $val){
            $arg.=$key."=".$val."&";
        }
        //去掉最后一个&字符
        $arg = trim($arg,'&');
        //如果存在转义字符，那么去掉转义
        if(get_magic_quotes_gpc()){
            $arg = stripslashes($arg);
        }
        return $arg;
    }
}
