import { Colors } from './class/colors.ts';
import { Settings } from './class/settings.ts';
import { RandomUtils } from './class/SR.ts';

const PATH_SETTINGS: string = "../";
const settings: Settings = new Settings();
const colors = new Colors();

function countAsteriscs(count: number): number{
    let result: number = 0;
    for(let i: number = 1; i <= count * 2; i++)
        if(i % 2 == 1)
            result += i;
    return result;
}
let colorDecorators: Array<string> = new Array<string>("green", "red", "yellow", "blue");
let posDecorations: Array<number>;

function DrawTree(): void{
    console.clear();
    let pos:number = 0;
    let res: string = "";
    for (let a:number = 0; a < settings.rowTree; a++) {
        for (let b: number = 0; b < settings.rowTree - a - 1; b++)
            res += " ";
        for (let b: number = settings.rowTree - a - 1; b < settings.rowTree + a; b++){
            if(posDecorations.includes(pos)) {
                let func = colorDecorators[RandomUtils.random(0, colorDecorators.length - 1)];
                res += (colors["red"])(settings.decorChar);
                //eval(`res += Colors[${func}](settings.decorChar)`);
            } else {
                //eval(`${res} += ${Colors}[${settings.colorTree}](${settings.decorChar})`);
                res += colors["green"](settings.treeChar);
            }
            pos++;
        }
        console.log(res);
    }
}
function DrawMsg(): void{
    console.log(settings.msgCongrats);
    console.log(settings.msgSecondary);
}
(() => {
    settings.loadSettings(PATH_SETTINGS);
    posDecorations = RandomUtils.generateRandom(settings.qtyDecorators, 0, countAsteriscs(settings.rowTree));
    setInterval(() => {
        DrawTree();
        DrawMsg();
    }, settings.timeRedraw);
})();
