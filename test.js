var should = require('should');
var BCI = require('./index');
describe('#getBankInfoByCardNo()',function(){
	it('test PSBC card',function(){
		BCI.getBankInfoByCardNo(6217998888888888888).bankCode.should.be.equal('PSBC');
		BCI.getBankInfoByCardNo(6228108888888888).cardType.should.be.equal('CC');
	});
	it('test ICBC card',function(){
		BCI.getBankInfoByCardNo(624000888888888888).bankCode.should.be.equal('ICBC');
		BCI.getBankInfoByCardNo(370248888888888).cardType.should.be.equal('CC');
	});
	it('test ABC card',function(){
		BCI.getBankInfoByCardNo(6228278888888888888).bankCode.should.be.equal('ABC');
		BCI.getBankInfoByCardNo(5442438888888888).cardType.should.be.equal('CC');
	});
	it('test BOC card',function(){
		BCI.getBankInfoByCardNo(6222738888888888888).bankCode.should.be.equal('BOC');
		BCI.getBankInfoByCardNo(6253338888888888).cardType.should.be.equal('SCC');
	});
	it('test CCB card',function(){
		BCI.getBankInfoByCardNo(5264108888888888).bankCode.should.be.equal('CCB');
		BCI.getBankInfoByCardNo(6236683320000324632).bankCode.should.be.equal('CCB');
		BCI.getBankInfoByCardNo(554403388888888888).cardType.should.be.equal('CC');
	});
	it('test not a number card',function(){
		BCI.getBankInfoByCardNo("test").should.not.be.ok;
	});
	it('test Invalid card number',function(){
		BCI.getBankInfoByCardNo(1234568749).should.not.be.ok;
	});
})