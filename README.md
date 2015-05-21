通过银行卡号查询银行类型和银行卡类型

备注：优先使用系统自带的规则获取卡号信息，次级使用alipay的接口
	 新增异步接口:getBankInfoByCardNoAsync


=======

###  API
		/**
		*@param number cardNo
		*return object {bankName:"中国工商银行",bankCode:"ICBC",cardType:"DC",cardTypeName:"储蓄卡"}
		*/
		getBankInfoByCardNo(cardNo) //cardNo must be number

		/**
		*@param number cardNo
		*@param function cb
		*return object {bankName:"中国工商银行",bankCode:"ICBC",cardType:"DC",cardTypeName:"储蓄卡"}
		*/
		getBankInfoByCardNoAsync(cardNo,cb) //cardNo must be number

