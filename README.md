# OrderFlow - Gerenciador de Pedidos

<p align="center">
  <img src="assets/logo_OrderFlow.png" alt="Logo do OrderFlow" width="300">
</p>

## Descrição

OrderFlow é um sistema para gestão operacional de pedidos em ambientes com mesas e atendimento presencial.

- Finalidade: organizar o fluxo de pedidos, mesas e atendimento de forma simples e eficiente.
- Público-alvo: donos de organização e colaboradores.
- Contexto de uso: gestão de mesas, acesso por código e acompanhamento do fluxo operacional.

## Principais funcionalidades

- Acesso por código
- Diferenciação entre dono da organização e colaborador
- Geração e gerenciamento de código de acesso
- Associação de mesas ao garçom logado
- Interface otimizada para dispositivos móveis

## Tecnologias utilizadas

- Linguagens: TypeScript
- Frameworks: Expo, React Native, Expo Router
- Bibliotecas principais: react-native-safe-area-context, react-native-screens, expo-clipboard, expo-status-bar, expo-linking

## Pré-requisitos

- Git instalado
- Node.js (recomendado: versão 18 ou superior)
- Gerenciador de pacotes (npm, yarn ou pnpm)

## Como baixar o projeto

```bash
# Clonar o repositório (HTTPS)
git clone https://github.com/j-nilton/orderflow-gerenciador-de-pedidos.git

# Acessar a pasta do projeto
cd orderflow-gerenciador-de-pedidos
```

## Como instalar as dependências

```bash
# usando npm
npm install

# ou yarn
yarn

# ou pnpm
pnpm install
```

## Como rodar o sistema

```bash
# iniciar o servidor de desenvolvimento
npm run start

# ou expo
npx expo start

# ou
npx expo start --tunnel
```

- Para web: opcionalmente use `npm run web`. A URL de acesso será exibida no terminal pelo Expo DevTools.
- Para Android: `npm run android` (dispositivo/emulador configurado).
- Para iOS: `npm run ios` (macOS com Xcode configurado).

## Estrutura do projeto

```text
orderflow-gerenciador-de-pedidos/
├── assets/                            # arquivos estáticos (ícones, logo, imagens)
│   ├── logo_OrderFlow.png             # logo do sistema
│   ├── icon.png                       # ícone do app (Expo)
│   ├── splash-icon.png                # imagem de splash (Expo)
│   ├── adaptive-icon.png              # ícone adaptativo (Android)
│   └── favicon.png                    # favicon (web)
├── src/                               # código-fonte da aplicação
│   ├── app/                           # apresentação e navegação (telas e componentes visuais)
│   │   ├── index.tsx                  # tela de boas-vindas (acesso por código)
│   │   ├── login.tsx                  # login de colaborador
│   │   ├── login-owner.tsx            # login do dono da organização
│   │   ├── owner-code.tsx             # geração/gerenciamento de código do dono
│   │   ├── collab-code.tsx            # confirmação de acesso do colaborador
│   │   ├── products.tsx               # gerenciamento de produtos
│   │   ├── dashboard.tsx              # visão geral das mesas
│   │   ├── create-table.tsx           # criação de mesa
│   │   ├── table/[id].tsx             # detalhes da mesa e pedidos
│   │   └── components/
│   │       └── BaseModal.tsx          # componente modal base
│   ├── viewmodel/                     # MVVM: estados e ações para a UI
│   │   ├── useWelcomeViewModel.ts
│   │   ├── useLoginViewModel.ts
│   │   ├── useOwnerLoginViewModel.ts
│   │   ├── useOwnerCodeViewModel.ts
│   │   ├── useDashboardViewModel.ts
│   │   ├── useCreateTableViewModel.ts
│   │   └── useTableDetailsViewModel.ts
│   ├── usecase/                       # casos de uso que orquestram regras de aplicação
│   │   ├── TableUseCase.ts
│   │   ├── OrderUseCase.ts
│   │   ├── ProductUseCase.ts
│   │   └── AccessCodeUseCase.ts
│   ├── model/                         # domínio (entidades, erros e contratos de serviços)
│   │   ├── entities/
│   │   │   ├── Table.ts
│   │   │   ├── Order.ts
│   │   │   └── Product.ts
│   │   ├── services/
│   │   │   ├── TableService.ts
│   │   │   ├── OrderService.ts
│   │   │   └── ProductService.ts
│   │   └── errors/                    # erros de domínio (se aplicável)
│   ├── infra/                         # implementações técnicas e serviços concretos (ex.: mocks)
│   │   └── services/
│   │       ├── MockTableService.ts
│   │       ├── MockOrderService.ts
│   │       ├── MockProductService.ts
│   │       └── MockAccessCodeService.ts
│   └── di/                            # injeção e orquestração de dependências
│       └── index.ts
├── app.json                           # configuração do projeto (Expo)
├── package.json                       # dependências e scripts
├── tsconfig.json                      # configuração do TypeScript
└── .gitignore                         # arquivos ignorados pelo Git
```
