export class RandomUtils {
    static random(min: number, max: number): number{
        return Math.random() * (max - min) + min;
    }
    static generateRandom(count: number, min: number, max: number): Array<number> {
        let result: Array<number> = [];
        let cant: number = 1;
        while(cant < count){
            let nn: number = this.random(min, max);
            if(result.indexOf(nn) < 0){
                result.push(nn);
                cant++;
            }
        }
        return result;
    }
}
