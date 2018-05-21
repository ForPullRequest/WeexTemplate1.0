var crypto = require('crypto');
var fs=require('fs');
var path = require('path');
var program = require('commander');
function ascii(val)
{
  return new Buffer(val||'1234567890123456','ascii');
}
//分隔
function range (val) {
    return val.split('..').map(Number);
}

function list (val) {
    return val.split(',')
}

//定义参数,以及参数内容的描述
program
    .version('1.0.0')
    .usage('[options] [value ...]')
    .option('-i, --in <string>', '-in ./dir 或 file.js 需要加密码的目录或文件默认当前子目录SRC')
    .option('-d, --decrypt','-d,对加密的数据进行解密')
    .option('-o, --output <string>', '-o ./output 输出目录,默认目录output')
    .option('-N, --cipher <string>', '-cipher aes-128-cbc,加密算法名称')
    .option('-K, --key <string>', '-K 1234567890123456,密钥Key格式为16进制',ascii)
    .option('-I, --iv <string>, ', '-I 1234567890123456,IV 初始化向量，格式是16进制',ascii)
    .option('-E, --encoding','-E,默认先对数据进行base64加解码')
    .parse(process.argv);

//定义变量
var in_inDir = program.in||'./src';
var in_outDir = program.output||'./output';
var indir_regx = new RegExp("^("+path.normalize(in_inDir)+"\)",'i'); //替换输出目录正则表达式
var in_cipherName = program.cipher||'aes-128-cbc';
var in_key = program.key||ascii('393b6f7bbaa76c87');
var in_iv = program.iv||ascii('393b6f7bbaa76c87');
var in_cipherEncoding = program.encoding||'base64';
var in_decrypt = program.decrypt||false;
var AESCrypto = {
  ls:function(ff)
  {
      var files=fs.readdirSync(ff);
      files.forEach(function (filename)
      {
        var srcfname = path.normalize(ff+path.sep+filename);
        var stat = fs.lstatSync(srcfname);
        if(stat.isDirectory()==true){
          if(!fs.existsSync(srcfname.replace(indir_regx,in_outDir))){
              AESCrypto.mkdirsSync(srcfname.replace(indir_regx,in_outDir));
          }
          AESCrypto.ls(srcfname);
        }
        else{
          fs.readFile(srcfname,'utf-8',function (err,contents) {
            var c = in_decrypt?AESCrypto.decrypt(contents,in_cipherName,in_key,in_iv,in_cipherEncoding): AESCrypto.encrypt(contents,in_cipherName,in_key,in_iv,in_cipherEncoding);
            fs.writeFile(srcfname.replace(indir_regx,in_outDir), c, function (err) {
            if (err) throw err;
              console.log('成功===>' + srcfname +'=='+ srcfname.replace(indir_regx,in_outDir));
            });
          });
        }
      });
  },
  mkdirsSync:function(dirpath, mode) {
      if (!fs.existsSync(dirpath)) {
          var pathtmp;
          dirpath.split(path.sep).forEach(function(dirname) {
              if (pathtmp) {
                  pathtmp = path.join(pathtmp, dirname);
              }
              else {
                  pathtmp = dirname;
              }
              if (!fs.existsSync(pathtmp)) {
                  if (!fs.mkdirSync(pathtmp, mode)) {
                      return false;
                  }
              }
          });
      }
      return true;
  },
  encrypt:function(data,algorithm,key,iv,cipherEncoding,clearEncoding)
  {
    if(key.length!=16 && key.length !=24 && key.length!=32){
      console.log("key必须是16进制格式,长度16、24、32");
      return "";
    }
    if(iv.length!=16 && key.length!=0){
      console.log("key必须是16进制格式,长度16");
      return "";
    }
    clearEncoding = clearEncoding || 'utf8';
    //var cipherEncoding = 'hex';
    //If the next line is uncommented, the final cleartext is wrong.
    cipherEncoding= cipherEncoding || 'base64';
    /*加密*/
    var cipher = crypto.createCipheriv(algorithm, key,iv);
    var cipherChunks = [];
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
  },
  decrypt:function(data,algorithm,key,iv,cipherEncoding,clearEncoding)
  {
      if(key.length!=16 && key.length !=24 && key.length!=32){
        console.log("key必须是16进制格式,长度16、24、32");
        return "";
      }
      if(iv.length!=16 && key.length!=0){
        console.log("key必须是16进制格式,长度16");
        return "";
      }
      clearEncoding = clearEncoding || 'utf8';
      //var cipherEncoding = 'hex';
      //If the next line is uncommented, the final cleartext is wrong.
      cipherEncoding= cipherEncoding || 'base64';
      /*解密*/
      var decipher = crypto.createDecipheriv(algorithm, key,iv);
      var plainChunks = [];
      try{
        plainChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
        plainChunks.push(decipher.final(clearEncoding));
      }
      catch(err){
        if (err) throw err;
      }
      return plainChunks.join('');
  }
};

if(!fs.existsSync(in_outDir)){
    AESCrypto.mkdirsSync(in_outDir);
}

AESCrypto.ls(in_inDir);
