# Diretrizes do Projeto (basefront)

Frontend em Vue 3 com Vite, TypeScript, Pinia e Vue Router.

## Comandos Essenciais
- **Dev:** `npm run dev`
- **Checagem de tipos:** `npm run type-check` (vue-tsc)
- **Testes Unitários:** `npm test` (Vitest com Happy DOM)
- **Testes E2E:** `npm run test:e2e` (Playwright)
- **Build:** `npm run build`

## Padrões de Código
- **Vue 3:** Sempre use Single File Components com `<script setup lang="ts">`. Nunca use Options API.
- **Imports:** Use o alias `@/` para referenciar o diretório `src/` (evite caminhos relativos longos como `../../`).
- **Pinia:** Use a sintaxe de *Setup Store* (`defineStore('nome', () => { ... }, { persist: true })`), seguindo o padrão de [src/stores/theme.ts](file:///Users/taliberti/Development/Personal/basefront/src/stores/theme.ts).
- **Layouts:** Páginas em `src/views/` usam layouts definidos via metadados de rota (`meta: { layout: 'default' | 'auth' | 'blank' }`).
- **TypeScript:** Tipagem estrita. Evite o uso de `any`; crie ou reutilize tipos em `src/types/`.

## Restrições e Cuidados
- Não instale novas dependências no `package.json` sem necessidade explícita.
- Não altere ou comite arquivos sensíveis de ambiente (`.env`).
- Ao criar ou refatorar componentes, garanta que `npm run type-check` passe sem erros.
