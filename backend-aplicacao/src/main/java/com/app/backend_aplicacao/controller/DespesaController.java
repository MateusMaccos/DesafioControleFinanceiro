package com.app.backend_aplicacao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend_aplicacao.dto.IdDTO;
import com.app.backend_aplicacao.model.Despesa;
import com.app.backend_aplicacao.service.DespesaService;

@RestController
@RequestMapping("/despesa")
public class DespesaController {
    @Autowired
    private DespesaService despesaService;

    @GetMapping
    public List<Despesa> listarTodos() {
        return despesaService.listarTodos();
    }

    @GetMapping("/id")
    public Despesa buscarPorId(@RequestBody IdDTO despesa) {
        return despesaService.buscarPorId(despesa.getId());
    }

    @PostMapping
    public Despesa salvar(@RequestBody Despesa despesa) {
        return despesaService.salvar(despesa);
    }

    @PutMapping
    public Despesa atualizar(@RequestBody Despesa despesa) {
        return despesaService.atualizar(despesa.getNumeroDeProtocolo(),despesa);
    }

    @DeleteMapping
    public void deletar(@RequestBody IdDTO despesaASerDeletada) {
        despesaService.deletar(despesaASerDeletada.getId());
    }
    
}
