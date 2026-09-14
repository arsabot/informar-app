import * as cheerio from 'cheerio';
import { Normalizer } from './Normalizer';

export interface ExtractedTableRow {
  [columnName: string]: string;
}

export interface ExtractedTable {
  headers: string[];
  rows: ExtractedTableRow[];
  rowCount: number;
}

export class HtmlTableExtractor {
  /**
   * Parsea un documento HTML y extrae todas las tablas identificadas en estructuras clave-valor.
   */
  public static extractTables(html: string): ExtractedTable[] {
    const $ = cheerio.load(html);
    const tables: ExtractedTable[] = [];

    $('table').each((tableIdx, tableEl) => {
      const headers: string[] = [];
      const rows: ExtractedTableRow[] = [];

      // Extraer encabezados de thead o primera fila tr
      const headerCells = $(tableEl).find('thead th, thead td');
      if (headerCells.length > 0) {
        headerCells.each((_, th) => {
          headers.push(Normalizer.cleanText($(th).text()).toLowerCase());
        });
      } else {
        // Buscar en primer tr
        const firstRowCells = $(tableEl).find('tr').first().find('th, td');
        firstRowCells.each((_, cell) => {
          headers.push(Normalizer.cleanText($(cell).text()).toLowerCase());
        });
      }

      // Si no hay headers legibles, generar genéricos col_0, col_1...
      const effectiveHeaders = headers.length > 0 
        ? headers 
        : Array.from({ length: 10 }, (_, i) => `col_${i}`);

      // Extraer filas del cuerpo (tbody o tr directos)
      const rowElements = $(tableEl).find('tbody tr').length > 0 
        ? $(tableEl).find('tbody tr') 
        : $(tableEl).find('tr').slice(headers.length > 0 ? 1 : 0);

      rowElements.each((_, rowEl) => {
        const rowData: ExtractedTableRow = {};
        const cells = $(rowEl).find('td, th');
        
        if (cells.length === 0) return;

        cells.each((cellIdx, cell) => {
          const colName = effectiveHeaders[cellIdx] || `col_${cellIdx}`;
          const cellText = Normalizer.cleanText($(cell).text());
          const cellLink = $(cell).find('a').attr('href');

          rowData[colName] = cellText;
          if (cellLink) {
            rowData[`${colName}_link`] = cellLink;
          }
        });

        // Solo agregar si la fila tiene datos significativos
        if (Object.values(rowData).some(val => val.length > 0)) {
          rows.push(rowData);
        }
      });

      tables.push({
        headers: effectiveHeaders,
        rows,
        rowCount: rows.length
      });
    });

    return tables;
  }

  /**
   * Extrae listas de enlaces públicos con sus textos y atributos asociados.
   */
  public static extractLinks(html: string, selector: string = 'a'): Array<{ text: string; href: string; title?: string }> {
    const $ = cheerio.load(html);
    const links: Array<{ text: string; href: string; title?: string }> = [];

    $(selector).each((_, el) => {
      const href = $(el).attr('href');
      const text = Normalizer.cleanText($(el).text());
      const title = $(el).attr('title') || undefined;

      if (href && (text || title)) {
        links.push({ text, href, title });
      }
    });

    return links;
  }
}
