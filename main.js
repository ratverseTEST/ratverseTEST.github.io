var modal
var modalContent
var lastUpdate=new Date().getTime()
var modalID=0
var currentAddr = '';
var usrBal;
var diVS;

window.addEventListener('load', async function() {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable() // Request access
        nftContract =await new web3.eth.Contract(nftAbi, nftAddr)
        let accounts = await web3.eth.getAccounts()
        currentAddr = accounts[0]    
        setTimeout(function(){
            controlLoop()
            controlLoopFaster()
        },1000);
      } catch (error) {
          // User denied account access...
          console.error(error)
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      nftContract = await new web3.eth.Contract(nftAbi, nftAddr)
      let accounts = await web3.eth.getAccounts()
      currentAddr = accounts[0]  
      setTimeout(function(){
          controlLoop()
          controlLoopFaster()
      },1000);
    } 
})

function controlLoop(){
    refreshData()
    multiplyBy()
    setTimeout(controlLoop,2500)
}
function controlLoopFaster(){
    refreshData()
    multiplyBy()
    setTimeout(controlLoopFaster,30)
}

function stripDecimals(str, num){
	if (str.indexOf('.') > -1){
		var left = str.split('.')[0];
		var right = str.split('.')[1];
		return left + '.' + right.slice(0,num);
	}
	else {
		return str;
	}
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
}

function refreshData(){

    var balanceElem = document.getElementById('contractBal');
    contractBalance(function(result){
        rawStr = numberWithCommas(Number(result).toFixed(3));
        balanceElem.textContent = 'Contract Balance: ' + stripDecimals(rawStr, 3) + ' BNB';
    });
    
    web3.eth.getBalance(currentAddr).then(result => {
        rawStr = numberWithCommas(Number(web3.utils.fromWei(result)).toFixed(3));
        document.getElementById('userBNB').textContent = 'Your Balance: ' + stripDecimals(rawStr, 3) + ' BNB';
    }).catch((err) => {
        console.log(err)
    });

    var userBalanceElem = document.getElementById('user-balance');
    userBalance(function(result){
        rawStr = numberWithCommas(Number(result).toFixed(0));
        userBalanceElem.textContent = stripDecimals(rawStr, 0) + ' NFT';
    });

    var supplyElem = document.getElementById('supply');
    supply(function(result){
        rawStr = numberWithCommas(Number(result).toFixed(0));
        supplyElem.textContent = stripDecimals(rawStr, 0) + ' out of 20 minted';
    });

    var divBalanceElem = document.getElementById('divs-balance');
    claimelbleDivsMan(function(result){
        rawStr = numberWithCommas(Number(result).toFixed(3));
        divBalanceElem.textContent = stripDecimals(rawStr, 3);
    });
;
}

function multiplyBy()
{
        num1 = price/1e3;
        num2 = document.getElementById('ethtospend').value;
        document.getElementById("result").innerHTML = Math.round((num1 * num2)*100)/100;
}

function mint2(){
    let BNBspenddoc=document.getElementById('ethtospend')
    let amountNFT= Math.ceil((BNBspenddoc.value)*1)
let bnbConvert = (web3.utils.toWei(BNBspenddoc.value))/30
    console.log(bnbConvert, " BNB")
    console.log(amountNFT," NFT")
    mint(amountNFT,bnbConvert,function(){
        displayTransactionMessage();
    });
}

function removeModal2(){
    $('#adModal').modal('toggle');
}
function removeModal(){
        modalContent.innerHTML=""
        modal.style.display = "none";
}
function displayTransactionMessage(){
    displayModalMessage("Transaction Submitted")
}
function displayModalMessage(message){
    modal.style.display = "block";
    modalContent.textContent=message;
    setTimeout(removeModal,3000)
}
function formatBNBValue(BNBstr){
    return parseFloat(parseFloat(BNBstr).toFixed(4));
}
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function callbackClosure(i, callback) {
    return function() {
        return callback(i);
    }
}
