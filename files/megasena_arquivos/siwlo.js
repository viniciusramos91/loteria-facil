function goTo(concurso, direcao) {
	document.getElementById("concurso").value = concurso;
	document.getElementById("direcao").value = direcao;

	document.concursoForm.submit();
}

function federalPopupLista(ext){
	window.open('http://www1.caixa.gov.br/loterias/loterias/federal/impressao_lista/lista_index.asp?extracao=' + ext ,'lista','scrollbars=yes,width=720,height=530,top=10,left=10,toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,resizable=no,copyhistory=no');
}

function mostraOrdemSorteio() {
	document.getElementById("ordenado").style.display = "none";
	document.getElementById("sorteio").style.display = "block";
	document.getElementById("linkSorteio").style.display = "none";
	document.getElementById("linkOrdenado").style.display = "block";
}

function mostraOrdemCrescente() {
	document.getElementById("ordenado").style.display = "inline";
	document.getElementById("sorteio").style.display = "none";
	document.getElementById("linkSorteio").style.display = "inline";
	document.getElementById("linkOrdenado").style.display = "none";
}

function mostraOrdemSorteioDupla() {
	document.getElementById("ordenado").style.display = "none";
	document.getElementById("sorteio").style.display = "block";
	document.getElementById("ordenado2").style.display = "none";
	document.getElementById("sorteio2").style.display = "block";
	document.getElementById("linkSorteio").style.display = "none";
	document.getElementById("linkOrdenado").style.display = "block";
}

function mostraOrdemCrescenteDupla() {
	document.getElementById("ordenado").style.display = "inline";
	document.getElementById("sorteio").style.display = "none";
	document.getElementById("ordenado2").style.display = "inline";
	document.getElementById("sorteio2").style.display = "none";
	document.getElementById("linkSorteio").style.display = "inline";
	document.getElementById("linkOrdenado").style.display = "none";
}

function ajaxCidade(_uf) {
	// pega valor da uf selecionada
	uf = $('select#slcUf').val();
	url = $('#urlCidade').val();
	if (uf != "" && uf != "0") {
		// atribui valor no hiddenUf
		// limpa combo cidade
		selectCidade = $('select#slcCidade');
		selectCidade.children().remove();
		optCidade = document.createElement("option");
		optCidade.innerHTML = "Carregando...";
		selectCidade.append(optCidade);
		// faz request na servlet AjaxCidade
		$
				.ajax({
					type : "POST",
					url : url,
					data : "slcUf=" + uf,
					dataType : "xml",
					async : false,
					success : function(data) {
						var xml = data;
						// limpa combo cidade
						selectCidade.children().remove();
						optionTag = "<option value=0>Cidade</option>";
						selectCidade.append(optionTag);
						// popula combo cidade com dados do xml
						$(xml)
								.find('municipio')
								.each(
										function() {
											var coCidade = $(this).find(
													'coMunicipio').text();
											var deCidade = $(this).find(
													'deMunicipio').text();
											if (_uf == coCidade) {
												optionTag = "<option selected='selected' value='"
														+ coCidade
														+ "'>"
														+ deCidade
														+ "</option>";
											} else {
												optionTag = "<option value='"
														+ coCidade + "'>"
														+ deCidade
														+ "</option>";
											}
											selectCidade.append(optionTag);
										});
					}
				});
	}
}

function ajaxBairro(_cidade) {
	// pega valor da cidade selecionada
	cidade = $('select#slcCidade').val();
	url = $('#urlBairro').val();
	if (cidade != "" && cidade != "0") {
		// atribui valor no hiddenCidade
		// limpa combo bairro
		selectBairro = $('select#slcBairro');
		selectBairro.children().remove();
		optBairro = document.createElement("option");
		optBairro.innerHTML = "Carregando...";
		selectBairro.append(optBairro);
		// faz request na servlet AjaxBairro
		$.ajax({
					type : "POST",
					url : url,
					data : "slcCidade=" + cidade,
					dataType : "xml",
					async : false,
					success : function(data) {
						var xml = data;
						// limpa combo bairro
						selectBairro.children().remove();
						// optBairro = document.createElement("option");
						// optBairro.innerHTML = "Cidade";
						optionTag = "<option value=0>Bairro</option>";
						selectBairro.append(optionTag);
						// popula combo bairro com dados do xml
						$(xml)
								.find('bairro')
								.each(
										function() {
											var coBairro = $(this).find(
													'coBairro').text();
											var deBairro = $(this).find(
													'deBairro').text();

											if (_cidade == coBairro) {
												optionTag = "<option selected='selected' value='"
														+ coBairro
														+ "'>"
														+ deBairro
														+ "</option>";
											} else {
												optionTag = "<option value='"
														+ coBairro + "'>"
														+ deBairro
														+ "</option>";
											}
											selectBairro.append(optionTag);
										});
					}
				});
	}
}