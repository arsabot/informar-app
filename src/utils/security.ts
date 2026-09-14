/**
 * Utilidades de seguridad para frontend
 */

/**
 * Valida y sanitiza URLs externas antes de ser renderizadas en atributos href
 * Previene inyección de esquemas maliciosos como javascript:, data:, vbscript:
 */
export function sanitizeUrl(url?: string | null): string {
  if (!url) return '#';
  const trimmed = url.trim();

  // Permitir únicamente protocolos web seguros (http, https) o anclas relativas
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('#')) {
    return trimmed;
  }

  return '#';
}
