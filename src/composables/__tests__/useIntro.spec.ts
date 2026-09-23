import { describe, it, expect } from 'vitest'
import { useIntro } from '../useIntro'

describe('useIntro.ts', () => {
  it('1. Deve iniciar com o intro ativo e não descartado por padrão', () => {
    const { isIntroActive, isIntroDismissed } = useIntro()
    expect(isIntroActive.value).toBe(true)
    expect(isIntroDismissed.value).toBe(false)
  })

  it('2. Deve marcar intro como inativo ao chamar finishIntro()', () => {
    const { isIntroActive, finishIntro } = useIntro()
    finishIntro()
    expect(isIntroActive.value).toBe(false)
  })

  it('3. Deve marcar intro como descartado ao chamar markIntroDismissed()', () => {
    const { isIntroDismissed, markIntroDismissed } = useIntro()
    markIntroDismissed()
    expect(isIntroDismissed.value).toBe(true)
  })
})
