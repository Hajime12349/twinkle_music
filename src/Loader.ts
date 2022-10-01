import { Star } from "./Star"
import { parse } from "papaparse";

/**
 * urlから星情報をロードする
 */
export const load = async (url: string): Promise<Star[]> => {
  return new Promise<Star[]>((resolve, reject) => {
    parse(url, {
      download: true,
      header: false,
      newline: '\n',
      skipEmptyLines: true,
      complete: (results: any) => {
        const list = results.data as any[]
        const stars = list.map((row) => {
          const power = row[0] as number
          const freq = row[1] as number
          const star: Star = {
            power,
            freq,
          }
          return star
        })
        resolve(stars)
      }
    });
  });
}
