import Cookies from "js-cookie";

const cookieConfig = {
  expiresHours: Number(import.meta.env.VITE_COOKIE_EXPIRES_HOURS),
  sameSite: import.meta.env.VITE_COOKIE_SAMESITE as "strict" | "lax" | "none",
  secure: import.meta.env.PROD,
  path: import.meta.env.VITE_COOKIE_PATH,
  domain: import.meta.env.VITE_COOKIE_DOMAIN || undefined,
};

export class CookieService {
  static set(key: string, value: string,) {
    Cookies.set(key, value, cookieConfig);
  }

  static get(key: string): string | undefined {
    return Cookies.get(key);
  }

  static remove(key: string) {
    Cookies.remove(key);
  }

  static setBoolean(key: string, value: boolean,) {
    Cookies.set(key, value ? "true" : "false", cookieConfig);
  }

  static getBoolean(key: string): boolean {
    const value = Cookies.get(key);

    if (value === undefined) return false;

    return value === "true";
  }
}