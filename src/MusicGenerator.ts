import {waveform} from '../src/waveform'
import {Star} from '../src/Star'

export const generate = (delta: number, len: number, context: AudioContext, stars: Star[]): AudioBuffer => {
    let buf = context.createBuffer(1,len,context.sampleRate);
    let data = buf.getChannelData(0);
    let star = stars[0] // HACK: 暫定的な措置。星が複数ある場合の統合方法を考える
    for(let i=0;i<data.length;i++){
      // data[i] = waveform(i,context.sampleRate,400,2,0.3);
      data[i] = waveform(i+delta,context.sampleRate,star.freq,2,star.power);
    }
    return buf
}
