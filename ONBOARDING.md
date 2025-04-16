# 🚀 Bem-vindo ao Projeto de Controle Financeiro!

Olá! Seja bem-vindo(a) ao nosso projeto de Controle Financeiro. Estamos muito felizes em tê-lo(a) conosco! Este documento tem como objetivo apresentar o projeto e ajudar você a começar a contribuir.

## 📋 Sobre o Projeto

O Controle Financeiro é uma aplicação web moderna desenvolvida com Angular 18.1.2, projetada para ajudar usuários a gerenciarem suas finanças pessoais de forma eficiente e intuitiva. O projeto utiliza Angular Material para a interface e está estruturado seguindo as melhores práticas de desenvolvimento Angular.

### 🎯 Objetivos Principais
- Fornecer uma visão clara e em tempo real das finanças pessoais
- Facilitar o controle de cartões de crédito e suas faturas
- Gerenciar despesas fixas e receitas
- Oferecer uma interface amigável e responsiva

## 🛠️ Tecnologias Principais

- **Angular 18.1.2**: Framework principal
- **Angular Material**: Componentes de UI
- **RxJS**: Programação reativa
- **TypeScript**: Tipagem estática
- **SCSS**: Estilização

## 📁 Estrutura do Projeto

O projeto segue uma arquitetura modular e organizada:

```
src/
├── app/
│   ├── core/           # Serviços essenciais e modelos
│   ├── features/       # Módulos principais
│   └── shared/         # Recursos compartilhados
```

### Principais Módulos

1. **Dashboard**
   - Visão geral das finanças
   - Exibição de totais e estatísticas

2. **Cartões de Crédito**
   - Gestão de cartões
   - Controle de faturas
   - Transações

3. **Despesas Fixas**
   - Cadastro de despesas recorrentes
   - Controle de vencimentos

4. **Receitas**
   - Gestão de fontes de renda
   - Acompanhamento mensal

## 🚀 Como Começar

1. **Configuração do Ambiente**
   ```bash
   # Clone o repositório
   git clone [URL_DO_REPOSITÓRIO]
   cd controle-financeiro

   # Instale as dependências
   npm install

   # Inicie o servidor de desenvolvimento
   ng serve
   ```

2. **Convenções de Código**
   - Siga o [Angular Style Guide](https://angular.io/guide/styleguide)
   - Use TypeScript strict mode
   - Mantenha os componentes pequenos e focados
   - Documente funções e métodos complexos

3. **Padrões de Commit**
   ```
   feat: nova funcionalidade
   fix: correção de bug
   docs: documentação
   style: formatação
   refactor: refatoração
   test: testes
   ```

## 📝 Regras de Negócio Importantes

### Cartões de Crédito
- Cada cartão possui um campo `statementAmount` para o valor da fatura
- As transações são vinculadas a um cartão específico
- O valor da fatura é exibido na listagem e nas transações

### Despesas Fixas
- São somadas automaticamente no dashboard
- Possuem data de vencimento e status de pagamento

### Dashboard
- Exibe total de despesas (fixas + faturas)
- Atualização em tempo real dos valores

## 🤝 Processo de Contribuição

1. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. Faça suas alterações seguindo as convenções

3. Teste suas alterações:
   ```bash
   ng test
   ```

4. Faça commit das alterações:
   ```bash
   git commit -m "feat: descrição da feature"
   ```

5. Abra um Pull Request

## 📚 Recursos Adicionais

- [Documentação Angular](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## ❓ Dúvidas e Suporte

- Consulte a documentação do projeto
- Abra uma issue no GitHub
- Entre em contato com a equipe de desenvolvimento

---

Estamos ansiosos para ver suas contribuições! Se precisar de ajuda, não hesite em perguntar. Boa codificação! 🚀 