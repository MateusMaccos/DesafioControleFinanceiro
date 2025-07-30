package com.app.backend_aplicacao.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Empenho {
    @Id
    private String numeroDoEmpenho;
    private String dataDoEmpenho;
    private Double valorDoEmpenho;
    private String observacao;
    @ManyToOne
    @JoinColumn(name = "numeroDeProtocolo")
    @JsonBackReference
    private Despesa despesa;
    @OneToMany(mappedBy = "empenho", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Pagamento> pagamentos = new java.util.ArrayList<>();

    public void addPagamento (Pagamento pagamento) {
        pagamentos.add(pagamento);
        pagamento.setEmpenho(this);
    }
    
    public String getNumeroDoEmpenho() {
        return numeroDoEmpenho;
    }

    public void setNumeroDoEmpenho(String numeroDoEmpenho) {
        this.numeroDoEmpenho = numeroDoEmpenho;
    }

    public String getDataDoEmpenho() {
        return dataDoEmpenho;
    }

    public void setDataDoEmpenho(String dataDoEmpenho) {
        this.dataDoEmpenho = dataDoEmpenho;
    }

    public Double getValorDoEmpenho() {
        return valorDoEmpenho;
    }

    public void setValorDoEmpenho(Double valorDoEmpenho) {
        this.valorDoEmpenho = valorDoEmpenho;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Despesa getDespesa() {
        return despesa;
    }

    public String getNumeroDeProtocoloDaDespesa() {
        return despesa.getNumeroDeProtocolo();
    }

    public void setDespesa(Despesa despesa) {
        this.despesa = despesa;

    }

    public List<Pagamento> getPagamentos() {
        return pagamentos;
    }
    
    public double getValoresDosPagamentos() {
        double total = 0.0;
        for (Pagamento pagamento : pagamentos) {
            total += pagamento.getValorPagamento();
        }
        return total;
    }

}
