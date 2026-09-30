/**
 * Tipos para a seção de Jornada Profissional e Carreira
 */

export type MilestoneStatus = 'completed' | 'current'

export interface CareerMilestone {
  id: string
  role: string
  date: string
  status: MilestoneStatus
  description?: string
  badge?: string
}

export interface CareerExperience {
  company: string
  companyType?: string
  currentRole: string
  period: string
  location?: string
  description: string
  highlights: string[]
  technologies: string[]
  milestones: CareerMilestone[]
}
