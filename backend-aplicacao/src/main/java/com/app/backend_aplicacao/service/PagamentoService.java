package com.app.backend_aplicacao.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend_aplicacao.dto.PagamentoDTO;
import com.app.backend_aplicacao.model.Pagamento;
import com.app.backend_aplicacao.repository.PagamentoRepository;

@Service
public class PagamentoService {
    @Autowired
    private PagamentoRepository pagamentoRepository;

    private String gerarNumeroPagamento() {
        String ano = String.valueOf(java.time.Year.now().getValue());
        String prefixo = ano+"NP";
        long contador = pagamentoRepository.countByNumeroDoPagamentoStartingWith(ano + "NP");
        long proximo = contador + 1;
        return String.format("%s%04d", prefixo, proximo);
    }

    public List<PagamentoDTO> listarTodos() {
        return pagamentoRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public PagamentoDTO buscarPorId(String id) {
        Pagamento pagamento = pagamentoRepository.findById(id).get();
        return toDTO(pagamento);
    }

    public PagamentoDTO atualizar(String id,PagamentoDTO pagamentoDTO) {
        Pagamento pagamentoExistente = pagamentoRepository.findById(id).orElseThrow(
            ()-> new NoSuchElementException("Pagamento não encontrado com id: " + pagamentoDTO.getNumeroDoPagamento())
        );
        pagamentoExistente.setDataPagamento(pagamentoDTO.getDataPagamento());
        pagamentoExistente.setValorPagamento(pagamentoDTO.getValorPagamento());
        pagamentoExistente.setObservacao(pagamentoDTO.getObservacao());
        Pagamento pagamentoAtualizado = pagamentoRepository.save(pagamentoExistente);
        return toDTO(pagamentoAtualizado);
    }

    public PagamentoDTO salvar(PagamentoDTO pagamentoDTO) {
        Pagamento pagamento = toEntity(pagamentoDTO);
        pagamento.setNumeroDoPagamento(gerarNumeroPagamento());
        pagamento = pagamentoRepository.save(pagamento);
        return toDTO(pagamento);
    }

    public void excluir(String id) {
        if(!pagamentoRepository.existsById(id)) throw new NoSuchElementException("Pagamento não encontrado com id: " + id);
        pagamentoRepository.deleteById(id);
    }

    private Pagamento toEntity(PagamentoDTO pagamentoDTO) {
        Pagamento pagamento = new Pagamento();
        pagamento.setNumeroDoPagamento(pagamentoDTO.getNumeroDoPagamento());
        pagamento.setDataPagamento(pagamentoDTO.getDataPagamento());
        pagamento.setValorPagamento(pagamentoDTO.getValorPagamento());
        pagamento.setObservacao(pagamentoDTO.getObservacao());
        pagamento.setEmpenho(pagamentoDTO.getEmpenho());
        return pagamento;
    }

    private PagamentoDTO toDTO(Pagamento pagamento) {
        PagamentoDTO pagamentoDTO = new PagamentoDTO();
        pagamentoDTO.setNumeroDoPagamento(pagamento.getNumeroDoPagamento());
        pagamentoDTO.setDataPagamento(pagamento.getDataPagamento());
        pagamentoDTO.setValorPagamento(pagamento.getValorPagamento());
        pagamentoDTO.setObservacao(pagamento.getObservacao());
        pagamentoDTO.setEmpenho(pagamento.getEmpenho());
        return pagamentoDTO;
    }
    
    
}
