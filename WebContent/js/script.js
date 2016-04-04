// Funções são vistas como objetos especiais em JS
//
// var literal = {}; é o mesmo de var literal = new Object();
//
// Quase tudo em JS é tido como objeto
//
// Arrays podem conter dados heterogêneos em cada posição
//
// Uma maneira de se iterar sobre um objeto é:
//    for (var prop in objeto) {
//        console.log(var + ":" + objeto[var]);	   
//}
// 
// Funções podem ser chamadas logo após serem criadas com o
// conceito de IIFE (Immediately Invoked Function Expression).
// (function () {
//		console.log("Hello IIFE!");
// })();
// Para que o código dentro do IIFE seja visto externamente,
// é necessário adicioná-lo à variável window:
//(function(window) {
//	var variavel1 = "";
//	var variavel2 = function () {
//		console.log("Hello, inside IIFE");
//	};
//
//	window.variavel1 = variavel1;
//	window.variavel2 = variavel2;
//
//})(window);
//window.variavel2();
//
// Para pegar inputs:
// document.getElementById("elemento").value
//
// Para setar elementos:
// document.getElementById("elemento").textContent = "texto"
// ou document.getElementById("elemento").innerHTML = "texto"
//
// Método chamado após carregar todos os scripts
document.addEventListener("DOMContentLoaded", function(event) {
	console.log("DOMContentLoaded");

	function clicked(event) {
		console.log(event);
		this.textContent = "Clicado";
		var msg = document.getElementById("name").value;

		document.querySelector("#content").innerHTML = msg;	
	}

	document.querySelector("#button").addEventListener("click", clicked);

	document.querySelector("body").addEventListener("click", function(event) {
		console.log("x: " + event.clientX);
		console.log("y: " + event.clientY);
		alert("x: " + event.clientX + "\n" +
			"y: " + event.clientY + "\n" +
			"Pressed: " + event.which);

	})
});
// Para utilizar os seletores do CSS:
// document.querySelector("#id")
// document.querySelector(".id")
// document.querySelector("p")
function sayHello() {
	this.textContent = "Clicado";
	var msg = document.getElementById("name").value;

	document.querySelector("#content").innerHTML = msg;	

}

function rightClickMenu(event) {
	console.log("rightClickMenu");
	console.log(event.which);
	console.log(event);
}

// Unobstrusive event binding: Evita o uso de onclick, onsucess, on... 
// nos elementos do HTML
//document.getElementById("button").addEventListener("click", clicked());
// ou
//document.getElementById("button").onclick = sayHello;

