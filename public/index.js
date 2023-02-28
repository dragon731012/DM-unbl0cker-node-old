const input = document.getElementById('input');
const submit = document.getElementById('submit');

const uv = document.getElementById('node');
const rhodium = document.getElementById('rhodium');

window.addEventListener('load', () => {
    const currentproxy = localStorage.getItem('proxy');
    if (currentproxy !== null) {
        document.getElementById(currentproxy).classList.add('selected');
    }
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getProxy()
    }
});

function getProxy(url = input.value.trim()) {
    if (localStorage.getItem('proxy') === 'rhodium') {
        if (url.includes(".")==false){
            url="https://www.google.com/search?q="+url;
        }
        if (!isUrlVal(url)) url = 'http://' + url;
        window.location.href =  `/rhodium/gateway?url=${url}`;
    } 
    if (localStorage.getItem('proxy') === 'node') {
        		function $(id){
			return document.getElementById(id);
		}
		
		$('unblocker-form').onsubmit = function(){
			var url = $('url').value;
			if(url.substr(0,4) != "http"){
				url = "http://" + url;
			}
			window.location.pathname = 'p/' + url;
			return false;
		};
		
		function checkError(){
			var search = window.location.search;
			var start = search.indexOf('error=');
			if(start > -1){
				var stop = search.indexOf('&', start);
				if(stop == -1){ stop = undefined; }
				// +6 for "error="
				var err = search.substr(start+6, stop);
                var $error = $('error');
				$error.innerText = $error.textContent = decodeURIComponent(err);
				$error.style.display = "block";
			}
		}
    
		window.onload = function() { 
			$('url').focus(); 
			checkError(); 
		}
    } 
};
function setProxy(proxy) {
    localStorage.setItem('proxy', proxy)
    if (proxy == 'rhodium') {
        rhodium.classList.add('selected')
        uv.classList.remove('selected')
    } else if (proxy == 'node') {
        rhodium.classList.remove('selected')
        uv.classList.add('selected')
    }
};
function isUrlVal(url) {
    return /https?:\/\//.test(url);
};
