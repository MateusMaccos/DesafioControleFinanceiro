package com.app.backend_aplicacao.dto;

import com.app.backend_aplicacao.model.Empenho;

public class PagamentoDTO {
    private String numeroDoPagamento;
    private String dataPagamento;
    private Double valorPagamento;
    private String observacao;
    private Empenho empenho;

    public String getNumeroDoPagamento() {
        return numeroDoPagamento;
    }

    public void setNumeroDoPagamento(String numeroDoPagamento) {
        this.numeroDoPagamento = numeroDoPagamento;
    }

    public String getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(String dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public Double getValorPagamento() {
        return valorPagamento;
    }

    public void setValorPagamento(Double valorPagamento) {
        this.valorPagamento = valorPagamento;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getNumeroDoEmpenho() {
        return empenho.getNumeroDoEmpenho();
    }

    public void setEmpenho(Empenho empenho) {
        this.empenho = empenho;
    }
    public Empenho getEmpenho() {
        return empenho;
    }



}
