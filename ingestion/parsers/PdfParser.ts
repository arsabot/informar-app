import pdf from 'pdf-parse';
import { Normalizer } from './Normalizer';

export interface ParsedPdfResult {
  text: string;
  pageCount: number;
  info: Record<string, any>;
  isScannedPdf: boolean;
  lines: string[];
  tablesDetected: string[][][];
}

export class PdfParser {
  /**
   * Procesa un buffer de archivo PDF extrayendo texto, páginas y detectando si requiere OCR.
   */
  public static async parse(buffer: Buffer): Promise<ParsedPdfResult> {
    try {
      const data = await pdf(buffer);

      const text = data.text || '';
      const pageCount = data.numpages || 1;
      const cleanText = Normalizer.cleanText(text);

      // Heurística de detección de PDF escaneado:
      // Si el promedio de caracteres por página es menor a 60, probablemente sea una imagen escaneada sin capa de texto.
      const charDensityPerPage = cleanText.length / pageCount;
      const isScannedPdf = charDensityPerPage < 60;

      const rawLines = text
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);

      // Detección heurística de tablas estructuradas por columnas con múltiples espacios o tabulaciones
      const tablesDetected: string[][][] = [];
      let currentTable: string[][] = [];

      for (const line of rawLines) {
        // Si la línea tiene columnas separadas por 2 o más espacios consecutivos o tabulaciones
        const cols = line.split(/\s{2,}|\t/).map(c => c.trim()).filter(Boolean);
        if (cols.length >= 2) {
          currentTable.push(cols);
        } else {
          if (currentTable.length >= 3) {
            tablesDetected.push([...currentTable]);
          }
          currentTable = [];
        }
      }

      if (currentTable.length >= 3) {
        tablesDetected.push(currentTable);
      }

      return {
        text,
        pageCount,
        info: data.info || {},
        isScannedPdf,
        lines: rawLines,
        tablesDetected
      };
    } catch (error: any) {
      throw new Error(`Error al procesar el documento PDF: ${error?.message || 'Archivo corrupto o no soportado'}`);
    }
  }
}
