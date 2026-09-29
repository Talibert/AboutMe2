import { test, expect } from '@playwright/test'

test.describe('Navegação e Layout', () => {
  test('deve carregar a página inicial com sucesso', async ({ page }) => {
    await page.goto('/')

    // Verifica o título da página
    await expect(page).toHaveTitle(/Início | Taliberti/)

    // Verifica se a logo/marca está visível no header
    const brand = page.locator('.brand')
    await expect(brand).toBeVisible()
    await expect(page.locator('.brand-name')).toHaveText('Taliberti.')
  })

  test('deve navegar entre as páginas Início e Projetos', async ({ page }) => {
    await page.goto('/')

    // Clica no link 'Projetos'
    await page.click('nav >> text=Projetos')

    // Aguarda e valida a URL e título
    await expect(page).toHaveURL(/\/projects$/)
    await expect(page).toHaveTitle(/Projetos/)
  })

  test('deve alternar o tema e persistir a escolha no recarregamento', async ({ page }) => {
    await page.goto('/')

    const html = page.locator('html')
    const initialTheme = await html.getAttribute('data-theme')

    // Clica no botão de alternância de tema
    await page.click('.theme-toggle-btn')

    // Verifica que o tema mudou no DOM
    const expectedTheme = initialTheme === 'dark' ? 'light' : 'dark'
    await expect(html).toHaveAttribute('data-theme', expectedTheme)

    // Recarrega a página para testar a persistência via Pinia/localStorage
    await page.reload()
    await expect(html).toHaveAttribute('data-theme', expectedTheme)
  })
})
