# Verificação da base JOTA

Verificações realizadas na versão local:

- Sintaxe de app.js e logo-3d.js aprovada.
- IDs únicos, âncoras internas e assets referenciados no HTML presentes.
- Desktop normal e amplo (1440 × 1000): logo WebGL, manifesto, composição e controles dos projetos.
- Mobile 390 × 844: símbolo SVG, ausência de overflow horizontal, menu e serviços sem sobreposição.
- Projetos: abertura do diálogo, detalhes e fechamento.
- Formulário: obrigatoriedade dos campos, perfil Atleta, CPF opcional, cidade/UF, projeto e consentimento; resumo gerado com dados fictícios; retorno de etapas e mudança para Empresa/CNPJ.
- Link de WhatsApp gerado e inspecionado, sem abertura do destino e sem envio de mensagem.
- Nenhum erro ou aviso de execução observado no navegador nas verificações.
- Hero: CTA não se sobrepõe à faixa inferior após o ajuste.
- Fotos em WebP totalizam cerca de 709 kB; HTML, CSS e lógica autoral, cerca de 66 kB. Bibliotecas/fontes adicionais não estão incluídas nesses números. Não é medição de Lighthouse.

A preferência de movimento reduzido foi implementada e revisada no código; não foi emulada nesta sessão. Testes não substituem verificação em dispositivos reais. Conteúdo e imagens definitivos ainda dependem da aprovação da estrutura.

Captura final: hero-preview.png.
