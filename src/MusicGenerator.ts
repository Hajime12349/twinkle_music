import {waveform} from '../src/waveform'
import {Star} from '../src/Star'

export const generate = (delta: number, len: number, context: AudioContext, stars: Star[]): AudioBuffer => {
  let buf = context.createBuffer(1,len,context.sampleRate);
  let data = buf.getChannelData(0);

  for(let i=0;i<data.length;i++){
    let sample = 0;

    for(let j=0;j<stars.length;j++){
      let star = stars[j];
      sample += waveform(i+delta,context.sampleRate,star.freq,star.period,star.power);
    }
    sample /= stars.length;

    data[i] = sample;
  }

  return buf

}
