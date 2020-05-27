export class Utility {
    static randomRange(minimum,maximum){
        return Math.floor(Math.random()*(maximum-minimum+1))+minimum
    }
    static randomSort(a,b){
        return Utility.randomRange(0,1) * 2 - 1
    }
}