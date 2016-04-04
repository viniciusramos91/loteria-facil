package com.br.loteriafacil.model;

import java.util.List;
import java.util.UUID;

/**
 * Modelagem dos dados da Megasena
 * 
 * @author vinicius
 *
 */
public class DadosMegasena implements DadosLoteria {
	private String id;

	private List<Integer> resultado;

	private String estimativaProximoConcurso;

	private String acumuladoProximoConcurso;

	private String localConcurso;

	private boolean resultadoAcumulado;

	private String ganhadoresSena;

	private String ganhadoresQuina;

	private String ganhadoresQuadra;

	private String arrecadacaoTotal;
	
	public DadosMegasena() {
		id = UUID.randomUUID().toString();
	}

	public String getId() {
		return id;
	}

	public List<Integer> getResultado() {
		return resultado;
	}

	public void setResultado(List<Integer> resultado) {
		this.resultado = resultado;
	}

	public String getEstimativaProximoConcurso() {
		return estimativaProximoConcurso;
	}

	public void setEstimativaProximoConcurso(String estimativaProximoConcurso) {
		this.estimativaProximoConcurso = estimativaProximoConcurso;
	}

	public String getAcumuladoProximoConcurso() {
		return acumuladoProximoConcurso;
	}

	public void setAcumuladoProximoConcurso(String acumuladoProximoConcurso) {
		this.acumuladoProximoConcurso = acumuladoProximoConcurso;
	}

	public String getLocalConcurso() {
		return localConcurso;
	}

	public void setLocalConcurso(String localConcurso) {
		this.localConcurso = localConcurso;
	}

	public boolean isResultadoAcumulado() {
		return resultadoAcumulado;
	}

	public void setResultadoAcumulado(boolean resultadoAcumulado) {
		this.resultadoAcumulado = resultadoAcumulado;
	}

	public String getGanhadoresSena() {
		return ganhadoresSena;
	}

	public void setGanhadoresSena(String ganhadoresSena) {
		this.ganhadoresSena = ganhadoresSena;
	}

	public String getGanhadoresQuina() {
		return ganhadoresQuina;
	}

	public void setGanhadoresQuina(String ganhadoresQuina) {
		this.ganhadoresQuina = ganhadoresQuina;
	}

	public String getGanhadoresQuadra() {
		return ganhadoresQuadra;
	}

	public void setGanhadoresQuadra(String ganhadoresQuadra) {
		this.ganhadoresQuadra = ganhadoresQuadra;
	}
	
	public String getArrecadacaoTotal() {
		return arrecadacaoTotal;
	}

	public void setArrecadacaoTotal(String arrecadacaoTotal) {
		this.arrecadacaoTotal = arrecadacaoTotal;
	}

	@Override
	public String toString() {
		String str = "==== Dados Megasena ===="
				+ "\nid=" + this.id 
				+ ", \nlocalConcurso=" + this.localConcurso 
				+ ", \nacumuladoProxConc=" + this.acumuladoProximoConcurso 
				+ ", \nestimativaProxConc=" + this.estimativaProximoConcurso
				+ ", \nresultadoAcumulado=" + this.resultadoAcumulado
				+ ", \nresultado={";
				
				for (Integer r : resultado) {
					str += r + ", ";
				}
				
				str += "}\nganhadoresSena=" + this.ganhadoresSena
				+ ", \nganhadoresQuina=" + this.ganhadoresQuina
				+ ", \nganhadoresQuadra=" + this.ganhadoresQuadra
				+ ", \narrecadacaoTotal=" + this.arrecadacaoTotal
				+ "\n================";

		return str;
	}
}
