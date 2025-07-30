package com.app.backend_aplicacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend_aplicacao.model.Despesa;

public interface DespesaRepository extends JpaRepository<Despesa, String> {
    Long countByNumeroDeProtocoloStartingWith(String prefixo);
}
