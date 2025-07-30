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

import com.app.backend_aplicacao.model.Empenho;
import com.app.backend_aplicacao.service.EmpenhoService;

@RestController
@RequestMapping("/empenho")
public class EmpenhoController {
    @Autowired
    private EmpenhoService empenhoService;

    @GetMapping
    public List<Empenho> listarTodos() {
        return empenhoService.listarTodos();
    }

    @PostMapping
    public Empenho salvar(@RequestBody Empenho empenho) {
        return empenhoService.salvar(empenho);
    }

    @GetMapping("/{id}")
    public Empenho buscarPorId(@PathVariable String id) {
        return empenhoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Empenho atualizar(@PathVariable String id, Empenho empenho) {
        return empenhoService.atualizar(id, empenho);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable String id) {
        empenhoService.deletar(id);
    }
}
