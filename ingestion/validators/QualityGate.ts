import { z } from 'zod';
import { ExtractionStatus } from '../core/types';

export interface ValidationItemResult<T> {
  item: T;
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface QualityGateResult<T> {
  status: ExtractionStatus;
  validItems: T[];
  rejectedItems: T[];
  warnings: string[];
  errors: string[];
  confidenceScore: number; // 0 a 100
}

export class QualityGate {
  /**
   * Valida un lote de elementos contra su esquema Zod y ejecuta controles de consistencia cívica.
   */
  public static validateBatch<T>(
    items: T[],
    schema: z.ZodType<T>,
    customCheck?: (item: T) => { warnings?: string[]; errors?: string[] }
  ): QualityGateResult<T> {
    const validItems: T[] = [];
    const rejectedItems: T[] = [];
    const allWarnings: string[] = [];
    const allErrors: string[] = [];

    if (items.length === 0) {
      return {
        status: 'PARTIAL',
        validItems: [],
        rejectedItems: [],
        warnings: ['No se extrajeron registros en esta corrida'],
        errors: [],
        confidenceScore: 0
      };
    }

    items.forEach((rawItem, idx) => {
      const parseResult = schema.safeParse(rawItem);

      if (!parseResult.success) {
        const errorMsgs = parseResult.error.issues.map(
          issue => `[Fila ${idx + 1}] Campo '${issue.path.join('.')}': ${issue.message}`
        );
        allErrors.push(...errorMsgs);
        rejectedItems.push(rawItem);
      } else {
        const validatedItem = parseResult.data;
        let hasCustomErrors = false;

        if (customCheck) {
          const check = customCheck(validatedItem);
          if (check.warnings && check.warnings.length > 0) {
            allWarnings.push(...check.warnings.map(w => `[Fila ${idx + 1}] ${w}`));
          }
          if (check.errors && check.errors.length > 0) {
            allErrors.push(...check.errors.map(e => `[Fila ${idx + 1}] ${e}`));
            rejectedItems.push(validatedItem);
            hasCustomErrors = true;
          }
        }

        if (!hasCustomErrors) {
          validItems.push(validatedItem);
        }
      }
    });

    // Calcular índice de confianza (0 a 100)
    const successRatio = validItems.length / items.length;
    let confidenceScore = Math.round(successRatio * 100);

    if (allWarnings.length > 0) {
      confidenceScore = Math.max(0, confidenceScore - Math.min(20, allWarnings.length * 2));
    }

    // Determinar estado de extracción
    let status: ExtractionStatus = 'SUCCESS';
    if (validItems.length === 0) {
      status = 'FAILED';
    } else if (allErrors.length > 0 || validItems.length < items.length) {
      status = 'PARTIAL';
    } else if (allWarnings.length > 3) {
      status = 'NEEDS_REVIEW';
    }

    return {
      status,
      validItems,
      rejectedItems,
      warnings: allWarnings,
      errors: allErrors,
      confidenceScore
    };
  }

  /**
   * Reglas de calidad específicas para presupuestos municipales.
   */
  public static checkBudgetConsistency(budget: any): { warnings?: string[]; errors?: string[] } {
    const warnings: string[] = [];
    const errors: string[] = [];

    if (budget.perCapitaAmount && (budget.perCapitaAmount < 50_000 || budget.perCapitaAmount > 4_500_000)) {
      warnings.push(`Monto per cápita ($${budget.perCapitaAmount}) fuera del rango estadístico habitual para municipios argentinos`);
    }

    if (budget.breakdown && Array.isArray(budget.breakdown)) {
      const totalPct = budget.breakdown.reduce((sum: number, b: any) => sum + (b.percentage || 0), 0);
      if (Math.abs(totalPct - 100) > 3) {
        warnings.push(`La sumatoria de distribución de gasto (${totalPct.toFixed(1)}%) difiere del 100%`);
      }
    }

    return { warnings, errors };
  }
}
