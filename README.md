# 💰 Controle Financeiro

Uma aplicação web moderna e intuitiva para gerenciamento de finanças pessoais, desenvolvida com Angular 18.1.2 e Material Design. Mantenha suas finanças organizadas e tome decisões financeiras mais inteligentes com nossa interface amigável e recursos poderosos.

## ✨ Funcionalidades Principais

### 📊 Dashboard Financeiro
- **Resumo Financeiro em Tempo Real**
  - 📈 Visualização clara de receitas totais
  - 📉 Acompanhamento de despesas totais
  - 💵 Saldo atual atualizado
  - 📊 Gráficos e estatísticas (em breve)

### 💳 Gestão de Cartões de Crédito
- Cadastro e gerenciamento de múltiplos cartões
- Acompanhamento de faturas
- Controle de limites
- Categorização de gastos

### 📅 Controle de Despesas Fixas
- Cadastro de despesas recorrentes
- Lembretes de vencimentos
- Categorização por tipo
- Status de pagamento

### 💹 Gestão de Receitas
- Registro de diferentes fontes de renda
- Categorização de receitas
- Acompanhamento mensal
- Previsão de receitas futuras

## 🛠️ Tecnologias Utilizadas

- ⚡ **Angular 18.1.2** - Framework web moderno e robusto
- 🎨 **Angular Material** - Design system elegante e responsivo
- 🔄 **NgRx** (em breve) - Gerenciamento de estado previsível
- 🌊 **RxJS** - Programação reativa para melhor controle de dados
- 📝 **TypeScript** - Tipagem estática para código mais seguro
- 🎯 **SCSS** - Estilização avançada e manutenível

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- 📦 **Node.js** (versão 18 ou superior)
- 📦 **npm** (versão 9 ou superior)
- 🛠️ **Angular CLI** (versão 18.1.2)

## 🚀 Instalação e Execução

1. **Clone o repositório:**
```bash
git clone [URL_DO_REPOSITÓRIO]
cd controle-financeiro
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
ng serve
```

4. **Acesse a aplicação:**
Abra seu navegador e visite `http://localhost:4200`

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── core/           # Serviços essenciais, modelos e utilitários
│   │   ├── models/     # Interfaces e tipos
│   │   ├── services/   # Serviços compartilhados
│   │   └── utils/      # Funções utilitárias
│   │
│   ├── features/       # Módulos principais da aplicação
│   │   ├── dashboard/  # Visão geral das finanças
│   │   ├── credit-cards/  # Gestão de cartões
│   │   ├── fixed-expenses/  # Despesas fixas
│   │   └── income/     # Controle de receitas
│   │
│   └── shared/        # Recursos compartilhados
│       ├── components/ # Componentes reutilizáveis
│       ├── directives/ # Diretivas personalizadas
│       └── pipes/      # Pipes para transformação de dados
│
├── assets/           # Recursos estáticos (imagens, ícones)
└── styles/          # Estilos globais e temas
```

## 📜 Scripts Disponíveis

- 🔥 `ng serve` - Inicia o servidor de desenvolvimento
- 🏗️ `ng build` - Compila o projeto para produção
- 🧪 `ng test` - Executa os testes unitários
- 🔄 `ng e2e` - Executa os testes end-to-end

## 🤝 Como Contribuir

Adoraríamos contar com sua contribuição! Siga estes passos:

1. 🍴 Faça um fork do projeto
2. 🌱 Crie uma branch para sua feature
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. ✍️ Faça suas alterações e commit
   ```bash
   git commit -m 'feat: adiciona nova funcionalidade'
   ```
4. 📤 Push para a branch
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. 🔃 Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📬 Contato

Tem alguma dúvida ou sugestão? Abra uma [issue](../../issues) ou entre em contato conosco!

---
⭐️ Se este projeto te ajudou, considere dar uma estrela!
