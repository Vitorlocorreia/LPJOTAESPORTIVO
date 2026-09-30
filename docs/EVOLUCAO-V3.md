# Menu mobile e logo → WhatsApp

Menu redesenhado em tela inteira: marca no topo, fechamento com alvo amplo, links numerados e CTA destacado na base. Alturas pequenas permitem rolagem; dialog nativo preserva Escape e foco.

O mesmo logo do hero agora ocupa uma camada independente e acompanha o scroll. Completa uma rotação de 360° no eixo vertical, reduz de escala, desce ao canto inferior direito e se transforma em um botão fixo de WhatsApp. Movimento reversível ao retornar ao topo. Desktop utiliza geometria 3D; mobile usa o vetor metálico com transformação CSS para evitar WebGL pesado. Movimento reduzido usa troca direta sem giro.

Link conectado ao contato já configurado em content.js. Somente clicar abre o WhatsApp; nenhuma mensagem é enviada automaticamente. O link só recebe foco/clique ao concluir a transformação e fica oculto quando um diálogo está aberto.

Verificado na prévia: menu mobile em 390×844, abertura/fechamento, giro/deslocamento, transformação e link final; desktop em 1440×900, reversão ao topo e botão final. Sem erros de console na verificação. Capturas em menu-mobile-v3.png e whatsapp-mobile-v3.png.
