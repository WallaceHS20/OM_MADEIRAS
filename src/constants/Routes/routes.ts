import { UserRole } from "@/Interfaces/Auth";
import { BaseRouteKey, IRouteDefinition, PageRoutesKeys, SectionKeys } from "@/Interfaces/Routes";

type SystemRoutesMap = {
  [key in SectionKeys]: Record<string, IRouteDefinition>;
};

export const getVisibleRoutes = (role: UserRole) => {
  const sections = Object.values(SectionKeys);

  return sections
    .map((section) => {
      const routes = Object.values(SYSTEM_ROUTES[section] ?? {}).filter(
        (route) =>
          route?.[BaseRouteKey.ROLE]?.includes(role) &&
          route?.[BaseRouteKey.ICON],
      );

      return { section, routes };
    })
    .filter((s) => s.routes.length > 0);
};

export const SYSTEM_ROUTES: SystemRoutesMap = {
  [SectionKeys.AUTH]: {
    LOGIN: {
      [BaseRouteKey.PATH]: PageRoutesKeys.LOGIN,
      [BaseRouteKey.TITLE]: "Entrar no Sistema",
      [BaseRouteKey.ROLE]: [UserRole.ADMIN, UserRole.CUSTOMER],
    },
  },

  [SectionKeys.OVERVIEW_PANEL]: {
    [PageRoutesKeys.DASHBOARD]: {
      [BaseRouteKey.PATH]: PageRoutesKeys.DASHBOARD,
      [BaseRouteKey.TITLE]: "Painel geral",
      [BaseRouteKey.ROLE]: [UserRole.ADMIN, UserRole.CUSTOMER],
      [BaseRouteKey.ICON]: "pi pi-home",
    },
  },

  [SectionKeys.SERVICE]: {
    [PageRoutesKeys.PROTOCOLS]: {
      [BaseRouteKey.PATH]: PageRoutesKeys.PROTOCOLS,
      [BaseRouteKey.TITLE]: "Protocolos",
      [BaseRouteKey.ROLE]: [UserRole.ADMIN],
      [BaseRouteKey.ICON]: "pi pi-users",
    },
    [PageRoutesKeys.CONTACT]: {
      [BaseRouteKey.PATH]: PageRoutesKeys.CONTACT,
      [BaseRouteKey.TITLE]: "Fale Conosco",
      [BaseRouteKey.ROLE]: [UserRole.ADMIN, UserRole.CUSTOMER],
      [BaseRouteKey.ICON]: "pi pi-envelope",
    },
  },

  [SectionKeys.SCHEDULING]: {
    [PageRoutesKeys.SCHEDULING_SUPPORT]: {
      [BaseRouteKey.PATH]: PageRoutesKeys.SCHEDULING_SUPPORT,
      [BaseRouteKey.TITLE]: "Apoio ao agendamento",
      [BaseRouteKey.ROLE]: [UserRole.ADMIN],
      [BaseRouteKey.ICON]: "pi pi-cog",
    },
  },

  [SectionKeys.FINANCIAL]: {
    [PageRoutesKeys.REIMBURSE]: {
      [BaseRouteKey.PATH]: PageRoutesKeys.REIMBURSE,
      [BaseRouteKey.TITLE]: "Reembolso",
      [BaseRouteKey.ROLE]: [UserRole.ADMIN, UserRole.CUSTOMER],
      [BaseRouteKey.ICON]: "pi pi-wallet",
    },
    [PageRoutesKeys.REIMBURSE_ANALYSIS]: {
      [BaseRouteKey.PATH]: PageRoutesKeys.REIMBURSE_ANALYSIS,
      [BaseRouteKey.TITLE]: "Análise de reembolso",
      [BaseRouteKey.ROLE]: [UserRole.ADMIN],
      [BaseRouteKey.ICON]: "pi pi-chart-line",
    },
    [PageRoutesKeys.REIMBURSE_TRACKING]: {
      [BaseRouteKey.PATH]: PageRoutesKeys.REIMBURSE_TRACKING,
      [BaseRouteKey.TITLE]: "Acompanhamento",
      [BaseRouteKey.ROLE]: [UserRole.ADMIN, UserRole.CUSTOMER],
      [BaseRouteKey.ICON]: "pi pi-search",
    },
  },

  [SectionKeys.ADMIN]: {
    [PageRoutesKeys.BENEFICIARIES_LIST]: {
      [BaseRouteKey.PATH]: PageRoutesKeys.BENEFICIARIES_LIST,
      [BaseRouteKey.TITLE]: "Lista de beneficiários",
      [BaseRouteKey.ROLE]: [UserRole.ADMIN],
      [BaseRouteKey.ICON]: "pi pi-list",
    },
    [PageRoutesKeys.BENEFICIARIES]: {
      [BaseRouteKey.PATH]: PageRoutesKeys.BENEFICIARIES,
      [BaseRouteKey.TITLE]: "Beneficiário",
      [BaseRouteKey.ROLE]: [UserRole.ADMIN],
      [BaseRouteKey.ICON]: "pi pi-user",
    },
  },
};
