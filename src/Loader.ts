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
            const period = 2 as number
            const freq = 400 as number
            const star: Star = {
              power,
              period,
              freq,
            }
            return star
          })
        resolve(stars)
      }
    });
  });
}

export const load_mock = async (url: string): Promise<Star[]> => {
  return [[0.7,1,400],[0.3,0.5,800],[0.3,7,200]]
  .map((row) =>{
    const power = row[0] as number
    const period = row[1] as number
    const freq = row[2] as number
    const star: Star = {
      power,
      period,
      freq,
    }
    return star
  });
}
