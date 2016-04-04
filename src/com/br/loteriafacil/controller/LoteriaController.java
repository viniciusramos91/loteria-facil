package com.br.loteriafacil.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.net.CookieHandler;
import java.net.CookieManager;
import java.net.CookiePolicy;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import com.br.loteriafacil.model.DadosMegasena;
import com.br.loteriafacil.utils.CSSClass;
import com.br.loteriafacil.utils.URLAddress;

@Named
@RequestScoped
public class LoteriaController implements Serializable {
	// FILE ou URL
	private static final String LOAD_METHOD = "FILE";
	private static final long serialVersionUID = 1L;
	private static final String HTML_FILE = "/home/vinicius/Documentos/megasena.html";

	private Document dom;
	private DadosMegasena dadosMegasena = new DadosMegasena();
	private boolean dadosMegasenaProntos = false;
	private Integer acertos;
	private String aposta1, aposta2, aposta3, aposta4, aposta5, aposta6;

	/**
	 * Inicializa o documento que serah analisado
	 * 
	 * @throws IOException
	 */
	@PostConstruct
	public void initialize() {
		try {
			// Carrega o HTML de um arquivo
			if (LOAD_METHOD.equals("FILE")) {
				File inputHtml = new File(HTML_FILE);

				dom = Jsoup.parse(inputHtml, "UTF-8", "");

				// Carrega o HTML de uma URL
			} else if (LOAD_METHOD.equals("URL")) {
				dom = Jsoup.connect(URLAddress.CEF_LOTERIA_MEGASENA).timeout(10000).get();
			} else {
				System.out.println("Metodo de carregamento de pagina inexistente!");
			}
		} catch (IOException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
		}
	}

	/**
	 * Le o HTML do site da Megasena e poe o resultado na String result
	 */
	public void readHtml() {
		String result = "";
		CookieHandler.setDefault(new CookieManager(null, CookiePolicy.ACCEPT_ALL));

		try {
			System.out.println("Conectando ao site da CEF: " + URLAddress.CEF_LOTERIA_MEGASENA);
			URLConnection connection = new URL(URLAddress.CEF_LOTERIA_MEGASENA).openConnection();

			InputStream is = connection.getInputStream();
			InputStreamReader reader = new InputStreamReader(is);
			BufferedReader bReader = new BufferedReader(reader);

			String str = bReader.readLine();
			StringBuilder builder = new StringBuilder();

			while (str != null) {
				builder.append(str + '\n');

				str = bReader.readLine();
			}

			result = builder.toString();

			System.out.println(result);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Realiza o parse do HTML do site da Caixa
	 */
	public void parseHtml() {
		System.out.println("Enviando requisicao para: " + URLAddress.CEF_LOTERIA_MEGASENA);

		// Seleciona os elementos de resultado na pagina HTML
		Element megasenaResultado = dom.select(CSSClass.CEF_MEGASENA_RESULTADO).first();

		// Retira o resultado do HTML
		ArrayList<Integer> resultados = new ArrayList<>();
		for (int i = 0; i < megasenaResultado.child(2).childNodeSize() - 1; i++) {
			resultados.add(Integer.parseInt(megasenaResultado.child(2).child(i).ownText()));
		}

		// Seta os elementos referentes aos Dados da Megasena
		boolean resultadoAcumulado = megasenaResultado.child(0).ownText().equals("Acumulou!") ? true : false;
		dadosMegasena.setResultadoAcumulado(resultadoAcumulado);
		dadosMegasena.setLocalConcurso(megasenaResultado.child(1).ownText());
		dadosMegasena.setResultado(resultados);
		dadosMegasena.setEstimativaProximoConcurso(megasenaResultado.child(3).child(0).ownText() + ": " + megasenaResultado.child(3).child(1).ownText());
		dadosMegasena.setAcumuladoProximoConcurso(megasenaResultado.child(4).child(0).child(0).ownText() + ": " + megasenaResultado.child(4).child(0).child(1).ownText());

		// Seleciona os elementos de premiacao da pagina HTML
		Element megasenaPremiacao = dom.select(CSSClass.CEF_MEGASENA_PREMIACAO).first();

		// Seta os ganhadores da Megasena
		dadosMegasena.setGanhadoresSena(megasenaPremiacao.child(1).ownText());
		dadosMegasena.setGanhadoresQuina(megasenaPremiacao.child(2).ownText());
		dadosMegasena.setGanhadoresQuadra(megasenaPremiacao.child(3).ownText());

		// Arrecadacao Total
		dadosMegasena.setArrecadacaoTotal(megasenaPremiacao.child(4).ownText() + ": " + megasenaPremiacao.child(5).child(0).ownText());

		System.out.println(dadosMegasena.toString());
		
		dadosMegasenaProntos = true;
		
		// Medida Paleativa!
		acertos = verificaAposta(converteApostas());
	}

	/**
	 * MEDIDA PALEATIVA: Converte apostas (String) em um ArrayList de Strings
	 * 
	 * @return
	 */
	public ArrayList<Integer> converteApostas() {
		ArrayList<Integer> apostas = new ArrayList<>();
		
		apostas.add(Integer.parseInt(aposta1));
		apostas.add(Integer.parseInt(aposta2));
		apostas.add(Integer.parseInt(aposta3));
		apostas.add(Integer.parseInt(aposta4));
		apostas.add(Integer.parseInt(aposta5));
		apostas.add(Integer.parseInt(aposta6));
		
		return apostas;
	}
	
	/**
	 * Itera sobre a lista de resultados, verificando as apostas do usuario.
	 * 
	 * @param apostas
	 * @return
	 */
	public Integer verificaAposta(ArrayList<Integer> apostas) {
		int acertos = 0;
		
		for (Integer aposta : apostas) {
			for (Integer resultado : dadosMegasena.getResultado()) {
				if (aposta.equals(resultado)) {
					acertos++;
				}
			}
		}
		
		return new Integer(acertos);
	}
	
	public Document getDom() {
		return dom;
	}

	public void setDom(Document dom) {
		this.dom = dom;
	}

	public DadosMegasena getDadosMegasena() {
		return dadosMegasena;
	}

	public void setDadosMegasena(DadosMegasena dadosMegasena) {
		this.dadosMegasena = dadosMegasena;
	}

	public boolean isDadosMegasenaProntos() {
		return dadosMegasenaProntos;
	}

	public void setDadosMegasenaProntos(boolean dadosMegasenaProntos) {
		this.dadosMegasenaProntos = dadosMegasenaProntos;
	}

	public String getAposta1() {
		return aposta1;
	}

	public void setAposta1(String aposta1) {
		this.aposta1 = aposta1;
	}

	public String getAposta2() {
		return aposta2;
	}

	public void setAposta2(String aposta2) {
		this.aposta2 = aposta2;
	}

	public String getAposta3() {
		return aposta3;
	}

	public void setAposta3(String aposta3) {
		this.aposta3 = aposta3;
	}

	public String getAposta4() {
		return aposta4;
	}

	public void setAposta4(String aposta4) {
		this.aposta4 = aposta4;
	}

	public String getAposta5() {
		return aposta5;
	}

	public void setAposta5(String aposta5) {
		this.aposta5 = aposta5;
	}

	public String getAposta6() {
		return aposta6;
	}

	public void setAposta6(String aposta6) {
		this.aposta6 = aposta6;
	}

	public Integer getAcertos() {
		return acertos;
	}

	public void setAcertos(Integer acertos) {
		this.acertos = acertos;
	}

}
