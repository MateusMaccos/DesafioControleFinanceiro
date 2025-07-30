package com.app.backend_aplicacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend_aplicacao.model.Empenho;

public interface EmpenhoRepository extends JpaRepository<Empenho, String> {
    Long countByNumeroDoEmpenhoStartingWith(String prefixo);
}
