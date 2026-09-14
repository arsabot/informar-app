/**
 * Utilidades de normalización de datos cívicos argentinos.
 * Transforma cadenas desestructuradas en formatos numéricos limpios y fechas estándar ISO.
 */

const MONTH_MAP: Record<string, string> = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  agosto: '08',
  septiembre: '09',
  setiembre: '09',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};

export class Normalizer {
  /**
   * Limpia y normaliza montos monetarios en pesos argentinos (ARS).
   * Ejemplos: "$ 145.200.000,50" -> 145200000.5, "12.500" -> 12500, "150M" -> 150000000
   */
  public static parseCurrency(raw: string | number | undefined | null): number | undefined {
    if (raw === undefined || raw === null) return undefined;
    if (typeof raw === 'number') return isNaN(raw) ? undefined : raw;

    let clean = String(raw).trim();
    if (!clean) return undefined;

    // Detectar sufijos comunes (M = millones, B = miles de millones)
    const millionMatch = clean.match(/^([\d.,]+)\s*(?:millones?|m)$/i);
    if (millionMatch) {
      const base = this.parseCurrency(millionMatch[1]);
      return base !== undefined ? base * 1_000_000 : undefined;
    }

    // Remover símbolo $, letras, espacios
    clean = clean.replace(/[$ARS\s]/gi, '');

    // Manejar formato argentino común (puntos de miles y comas de decimales: 1.234.567,89)
    if (clean.includes('.') && clean.includes(',')) {
      clean = clean.replace(/\./g, '').replace(',', '.');
    } else if (clean.includes(',')) {
      // Caso 1234,56
      clean = clean.replace(',', '.');
    } else if (clean.includes('.')) {
      // Si tiene múltiples puntos (ej. 1.200.000), son separadores de miles
      const dotCount = (clean.match(/\./g) || []).length;
      if (dotCount > 1) {
        clean = clean.replace(/\./g, '');
      } else {
        // Un solo punto: si después del punto hay 3 dígitos, suele ser separador de miles
        const parts = clean.split('.');
        if (parts[1] && parts[1].length === 3) {
          clean = clean.replace('.', '');
        }
      }
    }

    const num = parseFloat(clean);
    return isNaN(num) ? undefined : num;
  }

  /**
   * Normaliza fechas de diversos formatos al estándar ISO 8601 (YYYY-MM-DD).
   * Soporta:
   * - DD/MM/YYYY, DD-MM-YYYY
   * - YYYY-MM-DD
   * - "15 de mayo de 2025"
   */
  public static parseDate(raw: string | undefined | null): string | undefined {
    if (!raw) return undefined;
    const clean = raw.trim().toLowerCase();

    // Formato ISO ya estándar (YYYY-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
      return clean;
    }

    // Formato DD/MM/YYYY o DD-MM-YYYY
    const dmyMatch = clean.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (dmyMatch) {
      const day = dmyMatch[1].padStart(2, '0');
      const month = dmyMatch[2].padStart(2, '0');
      const year = dmyMatch[3];
      return `${year}-${month}-${day}`;
    }

    // Formato natural en español: "28 de diciembre de 2024"
    const naturalMatch = clean.match(/^(\d{1,2})\s+de\s+([a-z]+)\s+(?:de\s+)?(\d{4})$/);
    if (naturalMatch) {
      const day = naturalMatch[1].padStart(2, '0');
      const monthName = naturalMatch[2];
      const month = MONTH_MAP[monthName];
      const year = naturalMatch[3];
      if (month) {
        return `${year}-${month}-${day}`;
      }
    }

    // Fallback: intentar con Date.parse
    const timestamp = Date.parse(clean);
    if (!isNaN(timestamp)) {
      return new Date(timestamp).toISOString().split('T')[0];
    }

    return undefined;
  }

  /**
   * Valida y formatea un CUIT argentino (11 dígitos).
   */
  public static formatCuit(raw: string | undefined | null): string | undefined {
    if (!raw) return undefined;
    const digits = raw.replace(/\D/g, '');
    if (digits.length !== 11) return undefined;

    return `${digits.slice(0, 2)}-${digits.slice(2, 10)}-${digits.slice(10)}`;
  }

  /**
   * Limpia textos eliminando saltos de línea repetidos, espacios dobles y caracteres de control.
   */
  public static cleanText(raw: string | undefined | null): string {
    if (!raw) return '';
    return raw
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Extrae el porcentaje asegurando rango entre 0 y 100.
   */
  public static parsePercentage(raw: string | number | undefined | null): number | undefined {
    if (raw === undefined || raw === null) return undefined;
    if (typeof raw === 'number') return Math.min(100, Math.max(0, raw));

    const clean = String(raw).replace(/[%,\s]/g, match => match === ',' ? '.' : '');
    const num = parseFloat(clean);
    if (isNaN(num)) return undefined;
    return Math.min(100, Math.max(0, num));
  }
}
