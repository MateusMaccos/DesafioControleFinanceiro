package com.app.backend_aplicacao.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend_aplicacao.model.Pagamento;;

public interface PagamentoRepository extends JpaRepository<Pagamento, String> {
    Long countByNumeroDoPagamentoStartingWith(String prefixo);
    
}
