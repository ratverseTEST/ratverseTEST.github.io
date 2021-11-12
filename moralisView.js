Moralis.initialize("1iUFCKpQ3OIk1bf1fJpKK0TsaXSDByNk2i8tdywE");
Moralis.serverURL = "https://tdziyxyhz2rc.usemoralis.com:2053/server";

let userAccount = 0;
async function getAccount() {
    Moralis.authenticate().then(function (user) {
        console.log(user.get('ethAddress'));
        userAccount = user.get('ethAddress');
        console.log(userAccount);  
            getNFTsForContract();})}

async function getNFTsForContract() {  
    if (userAccount == 0) {
        getAccount();}    

    let options = {
        chain: 'bsc testnet',
        address: userAccount,
        token_address: '0xC5F91B70519df62a4691218C5cF808e2F721d698'
    }

    console.log(getAccount.userAccount)

    let nfts = await Moralis.Web3API.account.getNFTsForContract(options);
    console.log(nfts);
    
    let size = 'width="200" height="250"';

    nfts.result.forEach(function (nft) {
        let url = fixURL(nft.token_uri);
        fetch(url)
            .then(response => response.json())
            .then(data => {
            

                $("#content").html($("#content").html() + "<h2>" + data.name);

       
                    
                $("#content").html($("#content").html() + "<h3>" + data.description + "</h3>");
      
                $("#content").html($("#content").html() + "<img src='" + data.image + "'" +
                    size + "></img>");
            });

    })

}

function fixURL(url) {
    if (url.startsWith("ipfs")) {
        return "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://ipfs/").slice(-1)[0];
    } else {
        return url + "?format=json"
    }
}
function fixURL2(url) {
    if (url.startsWith("ipfs")) {
        return "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1)[0];
    }
}
getNFTsForContract()