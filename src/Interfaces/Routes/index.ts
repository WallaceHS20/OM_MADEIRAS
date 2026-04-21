import type { UserRole } from "../Auth";

export enum BaseRouteKey {
  PATH = "path",
  TITLE = "title",
  ROLE = "role",
  ICON = "icon"
}

export interface IRouteDefinition {
  [BaseRouteKey.PATH]: string;
  [BaseRouteKey.TITLE]: string;
  [BaseRouteKey.ROLE]: UserRole[];
  [BaseRouteKey.ICON]?: string;
}

export enum SectionKeys {
  AUTH = "auth",
  SERVICE = "atendimento",
  SCHEDULING = "agendamento",
  FINANCIAL = "financeiro",
  ADMIN = "administrativo",
  OVERVIEW_PANEL = "visão geral"
}

export enum PageRoutesKeys {
  // Auth
  LOGIN = "/login",

  // Dashboard
  DASHBOARD = "/dashboard",

  // Beneficiário
  BENEFICIARIES = "/beneficiarios",
  BENEFICIARIES_LIST = "/beneficiarios/lista",

  // Reembolso
  REIMBURSE = "/reembolso",
  REIMBURSE_ANALYSIS = "/reembolso/analise",
  REIMBURSE_TRACKING = "/reembolso/acompanhamento",

  // Agendamento
  SCHEDULING_SUPPORT = "/agendamento/apoio",

  // Atendimento / Protocolos
  PROTOCOLS = "/atendimento/protocolos",
  PROTOCOL_DETAILS = "/atendimento/protocolos/:id",
  RETURN_TO_BENEFICIARY = "/atendimento/retorno",

  // Fale Conosco
  CONTACT = "/atendimento/fale-conosco",

  // Financeiro / Assuntos gerais
  FINANCIAL = "/financeiro",

  // Guias e Ocorrências
  GUIDES = "/guias",
  GUIDE_ISSUE = "/guias/emissao",
  GUIDE_OCCURRENCE = "/guias/ocorrencia",

  // Cancelamento
  CANCELLATION = "/cancelamento",

  // Migração / Inclusão
  MIGRATION = "/migracao",
  INCLUSION = "/inclusao"
}