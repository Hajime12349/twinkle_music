import { Star } from "./Star"
import { parse } from "papaparse";

/**
 * urlから星情報をロードする
 */
export const load = async (url: string): Promise<Star[]> => {
  return new Promise<Star[]>((resolve, reject) => {
    parse(url, {
      download: true,
      header: true,
      newline: '\n',
      skipEmptyLines: true,
      complete: (results: any) => {
        const list = results.data as any[]
        const stars = list
          .filter((row) => {
            return row["Period"] !== ''
          })
          .map((row) => {
            const power = row["Period"] as number
            const freq = 400 as number
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
