/* eslint-disable prefer-const */
import * as XLSX from 'xlsx';

export async function csvBuild(data:any) {
    const tituloHEader = 'Reporte-Documentos'
    const wb = await XLSX.utils.book_new()
    const ws = await  XLSX.utils.json_to_sheet(data.data)
    let wscols = [];
    for (let h of data.header) {
      ws[h['col']].v=h['label']
      wscols.push({ wch: h['size'] })
    }
    ws["!cols"] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, tituloHEader)
    const csv =  Buffer.from(XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }))
    return csv
  }