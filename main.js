const obj = userdata;
const body = document.querySelector('body');
const btn = document.createElement('input');
btn.type='button';
btn.value="start";
btn.onclick=()=>{
	load();
}
body.appendChild(btn);
function login() {
	if(obj.password==pass){
		
	}
}
function load(){
	alert(obj.username);
}