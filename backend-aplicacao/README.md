# 💼 Sistema de Controle Financeiro - Backend

Este é o backend do sistema de controle financeiro da SOP, desenvolvido com Spring Boot, JPA e PostgreSQL. O sistema gerencia três entidades principais:

- **Despesa**: Registra os compromissos financeiros da instituição.
- **Empenho**: Representa o comprometimento financeiro.
- **Pagamento**: Registra a execução efetiva das dívidas.

---

## ⚙️ Tecnologias

- Java 17+
- Spring Boot
- Spring Data JPA
- PostgreSQL

---

## 📐 Modelagem

- O sistema segue o padrão DTO.
- O relacionamento entre entidades:
  - Uma **Despesa** possui vários **Empenhos**.
  - Um **Empenho** possui vários **Pagamentos**.

---

## 📋 Regras de Negócio

- Cada número de protocolo, empenho e pagamento deve ser único.
- A soma dos empenhos não pode ultrapassar o valor da despesa.
- A soma dos pagamentos não pode ultrapassar o valor do empenho.
- Não é permitido excluir uma despesa com empenhos, ou um empenho com pagamentos.
- Status automático de despesas baseado nos valores empenhados e pagos.

---

## 🛠️ Como Rodar

### Pré-requisitos

- Java 17
- Maven
- PostgreSQL

### Passos:

```bash
# Clone o projeto
git clone https://github.com/MateusMaccos/DesafioControleFinanceiro.git
cd DesafioControleFinanceiro

# Configure o banco de dados (em src/main/resources/application.properties)
spring.datasource.url=jdbc:postgresql://localhost:5432/sop
spring.datasource.username=postgres
spring.datasource.password=senha

# Execute a aplicação
./mvnw spring-boot:run
```
