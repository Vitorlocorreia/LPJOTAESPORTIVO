# Evolução visual — JOTA v2

Conteúdo, ordem das seções, formulário e identidade preservados. Paleta em preto, branco, tons neutros e metal; fotografias tratadas em escala de cinza. Versão anterior em `reference/jota-v1`.

## Direção e comparação
A referência ATLAS integra o movimento à composição: capítulos fixados, expansão de enquadramentos, escala, tipografia monumental e transições de profundidade. A v2 traduz essa lógica para o esporte: estádio como espaço, marca extrudada como protagonista e projetos como sequência horizontal. Não há rolagem artificial ou bloqueio de navegação.

## Implementação
- Hero com palco fotográfico, camadas editoriais, marca WebGL extrudada e ambiente metálico procedural. A rolagem fixa o palco brevemente, aproxima o estádio e desloca a marca antes de revelar o manifesto.
- Manifesto com leitura progressiva por palavra e prova em escala monumental.
- Projetos com fotografias amplas e transição horizontal vinculada à rolagem em desktop; controles e teclado preservados. Deslize nativo em mobile e movimento reduzido.
- Serviços com imagem contextual, acordeão exclusivo e composição editorial.
- Princípios com foco progressivo, imagem de estádio em profundidade e tipografia ampla.
- Equipe com camadas e velocidades diferentes; públicos com máscara de imagem e seleção contrastante.
- Fechamento com tipografia vinculada ao scroll, formulário original em etapas e revisão antes do WhatsApp.

## Performance e acessibilidade
Sem bibliotecas novas. Geometria e iluminação geradas localmente; nenhum HDR ou modelo externo. WebGL não é carregado em mobile estreito, economia de dados ou movimento reduzido. Renderização sob demanda, limitada por visibilidade. As animações são melhorias progressivas: informações e controles continuam acessíveis sem elas. Imagens locais otimizadas, fontes locais e carregamento tardio das fotos de conteúdo.

## Verificação
Prévia local verificada em 1440×900, 390×844 e 320×740. Sem erros de console ou imagens quebradas na verificação final. Menu mobile, controles de projetos, expansão de case e formulário Atleta até revisão verificados. Nenhuma mensagem enviada. Sintaxe de app.js, experience.js e logo-3d.js validada. Prefers-reduced-motion possui alternativa estática; não foi emulado nesta verificação.

## Pendências editoriais já previstas
Cases, atribuição de resultados, nomes/cargos e contato continuam aguardando validação do cliente. Mantido o conteúdo-base existente. Não publicado.
