var should = require('should');
var BCI = require('./index');
var async = require('async');
describe('#getBankInfoByCardNo()', function() {
  this.timeout(50000);
  it('test PSBC card', function(done) {
    BCI.getBankBin('6228108888888888', function(err, data) {
      should.not.exist(err);
      data.cardType.should.be.equal('CC');
      done();
    });
  });
  it('test PSBC card', function(done) {
    BCI.getBankBin('6228108888888888', function(err, data) {
      should.not.exist(err);
      data.cardType.should.be.equal('CC');
      done();
    });
  });
  it('test ICBC card', function(done) {
    BCI.getBankBin('624000888888888888', function(err, data) {
      should.not.exist(err);
      data.bankCode.should.be.equal('ICBC');
      done();
    });
  });
  it('test ICBC card', function(done) {
    BCI.getBankBin('370248888888888', function(err, data) {
      should.not.exist(err);
      data.cardType.should.be.equal('CC');
      done();
    });
  });
  it('test ABC card', function(done) {
    BCI.getBankBin('6228278888888888888', function(err, data) {
      should.not.exist(err);
      data.bankCode.should.be.equal('ABC');
      done();
    });
  });
  it('test ABC card', function(done) {
    BCI.getBankBin('5442438888888888', function(err, data) {
      should.not.exist(err);
      data.cardType.should.be.equal('CC');
      done();
    });
  });
  it('test BOC card', function(done) {
    BCI.getBankBin('6222738888888888888', function(err, data) {
      should.not.exist(err);
      data.bankCode.should.be.equal('BOC');
      done();
    });
  });
  it('test BOC card', function(done) {
    BCI.getBankBin('6253338888888888', function(err, data) {
      should.not.exist(err);
      data.cardType.should.be.equal('SCC');
      done();
    });
  });
  it('test CCB card', function(done) {
    BCI.getBankBin('5264108888888888', function(err, data) {
      should.not.exist(err);
      data.bankCode.should.be.equal('CCB');
      done();
    });
  });
  it('test CCB card', function(done) {
    BCI.getBankBin('554403388888888888', function(err, data) {
      should.not.exist(err);
      data.cardType.should.be.equal('CC');
      done();
    });
  });
  it('test CCB card async', function(done) {
    BCI.getBankBin('6236688888888888888', function(err, data) {
      should.not.exist(err);
      data.bankCode.should.be.equal('CCB');
      done();
    })
  })
  it('test not a number card', function(done) {
    BCI.getBankBin("test", function(err, data) {
      err.should.not.be.ok;
      done();
    });
  });
  it('test Invalid card number', function(done) {
    BCI.getBankBin('1234568749', function(err, data) {
      err.should.not.be.ok;
      done();
    });
  });
  it('test BDCBANK', function(done) {
    BCI.getBankBin('6210910002001951239', function(err, data) {
      data.bankCode.should.be.equal('BDCBANK');
      done();
    });
  });
  it('test concurrent request', function(done) {
    async.parallel([
        function(callback) {
          BCI.getBankBin('62270033202400375331', function(err, info) {
            callback(null, {
              err: err,
              info: info
            });
          });
        },
        function(callback) {
          BCI.getBankBin('6227003320240030000', function(err, info) {
            callback(null, {
              err: err,
              info: info
            });
          });
        },
        function(callback) {
          BCI.getBankBin('6111111111111111', function(err, info) {
            callback(null, {
              err: err,
              info: info
            });
          });
        },
        function(callback) {
          BCI.getBankBin('622700332024003', function(err, info) {
            callback(null, {
              err: err,
              info: info
            });
          });
        }
      ],
      function(err, results) {
        results[0].err.should.be.equal('62270033202400375331:银行卡位数必须是15到19位');
        should.not.exist(results[1].err);
        results[2].err.indexOf('6111111111111111:该银行卡不存在').should.not.be.equal(-1);
        results[3].err.indexOf('622700332024003:该银行卡不存在').should.not.be.equal(-1);
        done(null);
      });
  });
  it('test promise api, ok', function(done) {
    BCI.getBankBin('5264108888888888')
      .then(function (data) {
        data.bankCode.should.be.equal('CCB');
        done();
      })
  });
  it('test promise api, fail', function(done) {
    BCI.getBankBin('1234568749')
      .catch(function (err) {
        err.should.not.be.ok;
        done();
      })
  });
  it('test concurrent request, promise api', function(done) {
    async.parallel([
        function(callback) {
          BCI.getBankBin('62270033202400375331')
            .catch(function (err) {
              callback(null, {
                err: err
              });
            })
        },
        function(callback) {
          BCI.getBankBin('6227003320240030000')
            .then(function (info) {
              callback(null, {
                err: null,
                info: info
              });
            })
        },
        function(callback) {
          BCI.getBankBin('6111111111111111')
            .catch(function (err) {
              callback(null, {
                err: err
              });
            })
        },
        function(callback) {
          BCI.getBankBin('622700332024003')
            .catch(function (err) {
              callback(null, {
                err: err
              });
            })
        }
      ],
      function(err, results) {
        results[0].err.should.be.equal('62270033202400375331:银行卡位数必须是15到19位');
        should.not.exist(results[1].err);
        results[2].err.indexOf('6111111111111111:该银行卡不存在').should.not.be.equal(-1);
        results[3].err.indexOf('622700332024003:该银行卡不存在').should.not.be.equal(-1);
        done(null);
      });
  });
})