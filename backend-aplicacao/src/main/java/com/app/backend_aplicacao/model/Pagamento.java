package com.app.backend_aplicacao.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class Pagamento {
    @Id
    private String numeroDoPagamento;
    private String dataPagamento;
    private Double valorPagamento;
    private String observacao;
    @ManyToOne
    @JoinColumn(name = "numeroDoEmpenho")
    @JsonBackReference
    private Empenho empenho;

    public Empenho getEmpenho() {
        return empenho;
    }

    public String getNumeroDoEmpenho() {
        return empenho.getNumeroDoEmpenho();
    }

    public void setEmpenho(Empenho empenho) {
        this.empenho = empenho;
    }

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
}
