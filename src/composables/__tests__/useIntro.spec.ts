import { describe, it, expect } from 'vitest'
import { useIntro } from '../useIntro'

describe('useIntro.ts', () => {
  it('1. Deve iniciar com o intro ativo por padrão', () => {
    const { isIntroActive } = useIntro()
    expect(isIntroActive.value).toBe(true)
  })

  it('2. Deve marcar intro como inativo ao chamar finishIntro()', () => {
    const { isIntroActive, finishIntro } = useIntro()
    finishIntro()
    expect(isIntroActive.value).toBe(false)
  })
})
