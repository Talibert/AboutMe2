/**
 * ============================================================================
 * TIPAGEM DE RECURSOS TECNOLÓGICOS (TECH FEATURES)
 * ============================================================================
 *
 * Define o formato de cada recurso tecnológico exibido no BaseCarousel.
 */

export interface TechItem {
  id: string
  icon: string
  badge: string
  title: string
  description: string
  highlights: string[]
}
