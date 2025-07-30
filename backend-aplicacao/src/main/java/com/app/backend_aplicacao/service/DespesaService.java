package com.app.backend_aplicacao.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend_aplicacao.model.Despesa;
import com.app.backend_aplicacao.repository.DespesaRepository;

@Service
public class DespesaService {
    @Autowired
    private DespesaRepository despesaRepository;

    private String gerarNumeroProtocolo() {
        String ano = String.valueOf(java.time.Year.now().getValue());
        String mes = String.format("%02d", java.time.LocalDate.now().getMonthValue());

        int codigoOrgao = 43022;

        long contador = despesaRepository.countByNumeroDeProtocoloStartingWith(codigoOrgao + ".");
        long sequencial = contador + 1;

        return String.format("%05d.%06d/%s-%s", codigoOrgao, sequencial, ano, mes);
    }

    public List<Despesa> listarTodos() {
        return despesaRepository.findAll();
    }

    public Despesa buscarPorId(String id) {
        return despesaRepository.findById(id).orElseThrow(
            () -> new NoSuchElementException("Despesa não encontrada: " + id)
        );
    }

    public Despesa salvar(Despesa despesa) {
        despesa.setNumeroDeProtocolo(gerarNumeroProtocolo());
        return despesaRepository.save(despesa);
    }

    public Despesa atualizar(String id, Despesa despesa) {
        Despesa despesaExistente = buscarPorId(id);
        despesaExistente.setValor(despesa.getValor());
        despesaExistente.setDataDeVencimento(despesa.getDataDeVencimento());
        despesaExistente.setDataDoProtocolo(despesa.getDataDoProtocolo());
        despesaExistente.setCredor(despesa.getCredor());
        despesaExistente.setDescricao(despesa.getDescricao());
        despesaExistente.setTipoDeDespesa(despesa.getTipoDeDespesa());
        return despesaRepository.save(despesa);
    }

    public void deletar(String id) {
        buscarPorId(id);
        despesaRepository.deleteById(id);
    }
}
