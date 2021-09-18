var fs = require('fs');
var request = require('request');
const chalk = require('chalk');
console.log(chalk.blue('starting'));
request('https://api.coinstats.app/public/v1/coins/bitcoin', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  var jsgood = JSON.parse(body);
  console.log(chalk.green(jsgood.coin.id));
  var money = fs.readFileSync('./money.txt', 'utf8');
  var bitcoin = fs.readFileSync('./bitcoin.txt', 'utf8');
  console.log('You have ' + bitcoin + ' bitcoin');
  console.log('You have ' + money + ' money');
  if ( jsgood.coin.priceChange1h > 0 ) {
    console.log(chalk.green(jsgood.coin.id + ' is going up ' + jsgood.coin.priceChange1h));// sell
    var halfMoney = money / 2;
    var bitCanBuy = halfMoney / jsgood.coin.price;
    var numbitCanBuy = Number(bitCanBuy);
    var numbitcoin = Number(bitcoin);
    var numhalfMoney = Number(halfMoney);
    var nummoney = Number(money);
    console.log('you can buy money = ' + halfMoney + ' or bitcoin = ' + bitCanBuy);
    var curectBit = numbitcoin + numbitCanBuy;
    var curectmon = nummoney - numhalfMoney;
    fs.writeFile('bitcoin.txt', curectBit.toString() , function (err) {
        if (err) throw err;
        console.log('now you have ' + curectBit + ' bitcoin');
      });
      fs.writeFile('money.txt', curectmon.toString() , function (err) {
        if (err) throw err;
        console.log('now you have ' + curectmon + ' money');
      });
  } else {
    console.log(chalk.red(jsgood.coin.id + ' is going down '+ jsgood.coin.priceChange1h));// buy
    var halfBit = bitcoin / 2;
    var bitCanSell = halfBit * jsgood.coin.price;
    var numbitCanSell = Number(bitCanSell);
    var numbitcoin = Number(bitcoin);
    var numhalfbit = Number(halfBit);
    var nummoney = Number(money);
    console.log('you can sell money = ' + bitCanSell + ' or bitcoin = ' + halfBit);
    var curectBit = numbitcoin - numhalfbit;
    var curectmon = nummoney + numbitCanSell;
    fs.writeFile('bitcoin.txt', curectBit.toString() , function (err) {
        if (err) throw err;
        console.log('now you have ' + curectBit + ' bitcoin');
      });
      fs.writeFile('money.txt', curectmon.toString() , function (err) {
        if (err) throw err;
        console.log('now you have ' + curectmon + ' money');
      });
  }
});
