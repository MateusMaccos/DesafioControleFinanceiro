package com.app.backend_aplicacao.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend_aplicacao.model.Empenho;
import com.app.backend_aplicacao.repository.EmpenhoRepository;

@Service
public class EmpenhoService {
    @Autowired
    private EmpenhoRepository empenhoRepository;

    private String gerarNumeroDoEmpenho() {
        String ano = String.valueOf(java.time.Year.now().getValue());
        String prefixo = ano+"NE";
        long contador = empenhoRepository.countByNumeroDoEmpenhoStartingWith(ano + "NE");
        long proximo = contador + 1;
        return String.format("%s%04d", prefixo, proximo);
    }
    public List<Empenho> listarTodos() {
        return empenhoRepository.findAll();
    }

    public Empenho buscarPorId(String id) {
        return empenhoRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Empenho não encontrado."));
    }

    public Empenho salvar(Empenho empenho) {
        empenho.setNumeroDoEmpenho(gerarNumeroDoEmpenho());
        
        return empenhoRepository.save(empenho);
    }
    
    public Empenho atualizar(String id, Empenho empenho) {
        Empenho empenhoExistente = buscarPorId(id);
        empenhoExistente.setDespesa(empenho.getDespesa());
        empenhoExistente.setDataDoEmpenho(empenho.getDataDoEmpenho());
        empenhoExistente.setObservacao(empenho.getObservacao());
        empenhoExistente.setValorDoEmpenho(empenho.getValorDoEmpenho());
        return empenhoRepository.save(empenhoExistente);
    }

    public void deletar(String id) {
        buscarPorId(id);
        empenhoRepository.deleteById(id);
    }
    
}
