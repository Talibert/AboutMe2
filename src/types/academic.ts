export type AcademicType = 'Faculdade' | 'Curso Técnico' | 'Pós-Graduação' | 'Certificação'
export type AcademicStatus = 'Concluído' | 'Em andamento' | 'Cursando'

export interface AcademicItem {
  id: string
  type: AcademicType
  title: string
  institution: string
  period: string
  status: AcademicStatus
  description: string
  skills: string[]
  icon: string
  accentColor?: string
  credentialUrl?: string
}
