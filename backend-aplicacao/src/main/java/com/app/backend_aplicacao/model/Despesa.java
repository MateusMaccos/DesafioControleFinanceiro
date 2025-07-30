package com.app.backend_aplicacao.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

enum Status  {AGUARDANDO_EMPENHO,PARCIALMENTE_EMPENHADA,AGUARDANDO_PAGAMENTO,PARCIALMENTE_PAGA,PAGA};

enum TipoDeDespesa {
    OBRA_DE_EDIFICACAO, OBRA_DE_RODOVIA, OUTROS
}
@Entity
public class Despesa {
    @Id
    private String numeroDeProtocolo;
    private String dataDoProtocolo;
    private String dataDeVencimento;
    private String credor;
    private String descricao;
    private Double valor;

    @Enumerated(EnumType.STRING)
    @Column(name="tipoDeDespesa")
    private TipoDeDespesa tipoDeDespesa;
    
    @OneToMany(mappedBy = "despesa", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Empenho> empenhos= new ArrayList<>();

    public void addEmpenho (Empenho empenho) {
        empenhos.add(empenho);
        empenho.setDespesa(this);
    }

    public String getNumeroDeProtocolo() {
        return numeroDeProtocolo;
    }

    public void setNumeroDeProtocolo(String numeroDeProtocolo) {
        this.numeroDeProtocolo = numeroDeProtocolo;
    }

    public TipoDeDespesa getTipoDeDespesa() {
        return tipoDeDespesa;
    }

    public void setTipoDeDespesa(TipoDeDespesa tipoDeDespesa) {
        this.tipoDeDespesa = tipoDeDespesa;
    }

    public String getDataDoProtocolo() {
        return dataDoProtocolo;
    }

    public void setDataDoProtocolo(String dataDoProtocolo) {
        this.dataDoProtocolo = dataDoProtocolo;
    }

    public String getDataDeVencimento() {
        return dataDeVencimento;
    }

    public void setDataDeVencimento(String dataDeVencimento) {
        this.dataDeVencimento = dataDeVencimento;
    }

    public String getCredor() {
        return credor;
    }

    public void setCredor(String credor) {
        this.credor = credor;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public double getValoresDosPagamentos() {
        return empenhos.stream().mapToDouble(Empenho::getValoresDosPagamentos).sum();
    }

    public Status getStatus() {
        if (empenhos.isEmpty())
            return Status.AGUARDANDO_EMPENHO;
        else if (empenhos.stream().mapToDouble(Empenho::getValorDoEmpenho).sum() < valor)
            return Status.PARCIALMENTE_EMPENHADA;
        else if (empenhos.stream().mapToDouble(Empenho::getValorDoEmpenho).sum() == valor)
            return Status.AGUARDANDO_PAGAMENTO;
        else if (empenhos.stream().mapToDouble(Empenho::getValorDoEmpenho).sum() == valor && getValoresDosPagamentos() < valor)
            return Status.PARCIALMENTE_PAGA;
        else
            return Status.PAGA;        
    }

    public List<Empenho> getEmpenhos() {
        return empenhos;
    }
}
