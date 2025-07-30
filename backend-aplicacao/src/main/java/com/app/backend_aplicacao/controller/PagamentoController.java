package com.app.backend_aplicacao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.backend_aplicacao.dto.PagamentoDTO;
import com.app.backend_aplicacao.service.PagamentoService;


@RestController
@RequestMapping("/pagamento")
public class PagamentoController {
    @Autowired
    private PagamentoService service;

    @GetMapping
    public List<PagamentoDTO> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public PagamentoDTO buscarPorId(@PathVariable String id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public PagamentoDTO salvar(@RequestBody PagamentoDTO pagamentoDTO) {
        return service.salvar(pagamentoDTO);
    }

    @PutMapping("/{id}")
    public PagamentoDTO atualizar(@PathVariable String id,@RequestBody PagamentoDTO pagamentoDTO) {
        return service.atualizar(id,pagamentoDTO);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable String id) {
        service.excluir(id);
    }
}




