
export const waveform = ( i:number , rate:number , freq:number , T:number , amp:number ) : number => {
	return Math.sin(i/rate*freq*Math.PI)*(Math.cos(i/rate/T*Math.PI)+1)/2*amp;
}
