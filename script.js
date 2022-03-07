let coinbase = 0;
const bal = document.querySelector('#bal');
const toIDip = document.querySelector('#toIDip');
toIDip.value=2;
const amountip = document.querySelector('#amountip');
const SENT = document.querySelector('#SENT');
const selector = document.querySelector('#selector');
const sentMode = document.querySelector('#sentMode');
const sender = document.querySelector('#sender');
const screenCover = document.querySelector('#screenCover');
const CLOSE = document.querySelector('#CLOSE');
let mybalence = 0;
let another = 0;
//= document.querySelector('');
const firebaseConfig = {
    apiKey: "AIzaSyBaPvnzqor_4HfPZg6ayk30Tb1RpcMBWfo",
    authDomain: "test-66b58.firebaseapp.com",
    projectId: "test-66b58",
    storageBucket: "test-66b58.appspot.com",
    messagingSenderId: "39985206495",
    appId: "1:39985206495:web:c4200c42a6e7bad4da456a",
    measurementId: "G-G1RBDR6H1S"
};
firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();
let url = location.href;
let paramaters = (new URL(url)).searchParams;
let gid = paramaters.get("id");
let gpass = paramaters.get("password");
var dol;

function send(userid,amount){
	dol = another;
	firebase.database().ref("users/" + gid + "/wallet/coin/").set({ bal: mybalence-=parseInt(amount)});
	console.log(dol);
	firebase.database().ref("users/" + userid + "/wallet/coin/").set({ bal: dol+=parseInt(amount)});
	//alert(`You sent \$${amount} to ${userid}.`);
}

function getData(i,getonly) {
  dbRef.child("users").child(i).get().then((snapshot) => {
    if (snapshot.exists()) {
		if(getonly){
			another = snapshot.val().wallet.coin.bal;
		}else{
		  if(gpass==snapshot.val().password){
		   mybalence = snapshot.val().wallet.coin.bal;
		  }else{
			alert('Login and try again.');
		  }
		  load();
		}
    } else {
		console.error('error id');
    }
  });
}

setTimeout(1000);
getData(gid,false);
function load() {
	bal.innerHTML=mybalence;
	setInterval(refresh,5000);
}
var FRAME = 0;
function refresh(){
	getData(gid,false);
	FRAME++;
	bal.innerHTML=mybalence;
	getData(toIDip.value,true);
}

function openSender(){
	screenCover.style=`display:block;`;
	sender.style=`display:block;`;
}

function closeSender(){
	screenCover.style=`display:none;`;
	sender.style=`display:none;`;
}

SENT.onclick=()=>{
	if(toIDip){
		if(amountip){
			if(amountip.value<=0){
				alert("Enter the amount correctly.\nRemember the amount can't be 0 and less than 0.");
			}else{
				if(toIDip.value==gid){
					alert("You can't sent your coin to your own id.");
				}else{
					let accept = confirm(`Are you sure you want to sent\n${amountip.value} to ${toIDip.value}?`);
					if(accept){send(toIDip.value,amountip.value);}					
				}
			}
		}else{
			alert("Enter the amount correctly.\nRemember the amount can't be 0 and less than 0.");
		}
	}else{
		alert("Enter the user id where you want to send.");
	}
}

sentMode.onclick=()=>{
	if(mybalence<=0){
		alert("No Balence");
	}else{
		openSender();
	}
}

CLOSE.onclick=()=>{
	closeSender();
}
