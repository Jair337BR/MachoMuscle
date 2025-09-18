# MachoMuscle

Interface mobile-first para um app de treinos com foco em hipertrofia guiada, UX minimalista, gamificação e comunidade.

## Visão geral

A aplicação apresenta quatro áreas principais que simulam a experiência completa do produto:

- **Início:** resumo da semana, checklist guiado do treino do dia com GIF de execução e biblioteca de exemplos para iniciantes.
- **Gamificação:** painel com nível, missões diárias, vitrine de badges e ranking da tribo.
- **Comunidade:** feed no estilo Twitter/Threads com composer e tags centradas em hipertrofia, força, mobilidade e recuperação.
- **Perfil:** personalização de nome, @, bio, highlights e escolha dinâmica das cores de destaque.
- **Painel admin:** acesso autenticado com credenciais (`admin1` / `machomuscle`) para customizar rotinas individuais e manter o foco em hipertrofia.
- **Layout responsivo:** telas adaptam-se para diferentes larguras com grids de duas colunas em desktop e navegação fluida em mobile.

## Cores base

A paleta foi construída para que amarelo, laranja, roxo e azul se complementem sem gerar ruído visual. É possível alternar o destaque principal diretamente na tela de perfil.

| Cor     | Hex      | Uso principal                        |
|---------|----------|--------------------------------------|
| Amarelo | `#F7C948` | Energia e destaques luminosos        |
| Laranja | `#FF8852` | Chamadas de ação quentes             |
| Roxo    | `#6C63FF` | Acento padrão, hero e botões primários|
| Azul    | `#1FB6FF` | Detalhes dinâmicos e gradientes      |

## Como executar

1. Clone o repositório e navegue até a pasta `MachoMuscle`.
2. Abra o arquivo `index.html` no navegador (ou utilize uma extensão como Live Server no VS Code).
3. Explore os botões da barra inferior para navegar entre as seções e utilize os CTAs para abrir as páginas complementares (Jornada, semana detalhada, personalização, histórico etc.).

## Interações implementadas

- Mudança de cor do tema através do seletor na tela de perfil.
- Atualização automática de nome, usuário, bio e avatar conforme o usuário digita.
- Criação de novos posts na comunidade com tags opcionais e filtros de trends que controlam a visibilidade do feed.
- Adição de destaques públicos no mural do perfil.
- Acesso a páginas internas para plano da semana, detalhes de desempenho, histórico de rituais e personalização do próximo treino.
- Loja de recompensas com estados de resgate, vitrine de badges com seleção dinâmica e acompanhamento de missões favoritas.
- Chat da tribo com envio de mensagens rápidas sincronizado com o nome configurado no perfil.
- Checklists do treino diário com contagem de progresso, GIFs de apoio e atualização automática conforme os exercícios são concluídos.
- Planner semanal drag and drop com blocos por grupamento (domingo a sábado) que respeita a divisão de hipertrofia e salva no armazenamento local.
- Páginas dedicadas com design consistente para plano da semana, personalização de treino, histórico de rituais, filtros de trends e painel administrativo.
- Painel administrativo com login protegido para editar cada dia da semana, atualizar vídeos de referência e sincronizar o plano visível no cartão "Treino do dia".

Sinta-se à vontade para adaptar os textos e dados mockados para refletir a experiência desejada.
