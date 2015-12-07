# 通过银行卡号查询银行类型和银行卡类型

**建议升级使用1.0.0+的版本，该版本不向下兼容，即不再支持getBankInfoByCardNoAsync，getBankInfoByCardNo这两个API，旧版本用户请升级并使用 getBankBin API替换**

## npm install bankcardinfo

### 成功获取卡bin信息时，返回值为json对象

```js
{
	bankName:"中国工商银行",
	bankCode:"ICBC",
	cardType:"DC",
	cardTypeName:"储蓄卡"
}
```

### API

- [getBankBin](#getBankBin)

<a name="getBankBin" />

## getBankBin

### 传入卡号，异步返回。当第一个参数为空时，表示获取卡bin信息成功(标准API)
```js
var BIN = require('bankcardinfo');
BIN.getBankBin('6227003320240034988',function(err,data){
	if(!err){
		//todo 
		{
			bankName:"中国工商银行",
			bankCode:"ICBC",
			cardType:"DC",
			cardTypeName:"储蓄卡"
		}
	}
})
```



# 0.3.3版本以下API(存在并发请求的Bug，建议升级到1.0.0+)

- [getBankBin](#getBankBin)
- [getBankInfoByCardNoAsync](#getBankInfoByCardNoAsync)
- [getBankInfoByCardNo](#getBankInfoByCardNo)

<a name="getBankInfoByCardNoAsync" />

## getBankInfoByCardNoAsync

### 传入卡号，异步返回。只返回一个参数，当非空时，表示获取卡bin信息成功(非标准API)
```js
var BIN = require('bankcardinfo');
BIN.getBankInfoByCardNoAsync('6227003320240034988',function(data){
	if(data){
		//todo 
		//data 
	}
})
```

<a name="getBankInfoByCardNo" />

## getBankInfoByCardNo

### 传入卡号，同步返回。当返回值非空时，表示获取卡bin信息成功
```js
var BIN = require('bankcardinfo');
var binData = BIN.getBankInfoByCardNo('6227003320240034988');
if(binData){
	//todo
}
```

## 小结

1. 优先使用系统自带的获取卡bin信息（2013年国内银行卡集）
2. 当系统自带的规则获取不到卡bin时，会调用支付宝的接口来获取，[测试地址](https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?cardNo=6227003320232234322&cardBinCheck=true)
3. 支持AMD & CMD
4. 可在browser端使用，直接引入[index.js](https://github.com/navyxie/bankcardinfo/blob/master/index.js)文件,建议在服务端使用。

## 未来

由于模块自带的卡bin获取规则是2013年全国银行的卡集合，所以卡规则需要不断完善。可在模块中收集用户新卡规则，但是会涉及用户隐私及安全问题，及时收集，也只会收集部分够认证的卡位即可。
