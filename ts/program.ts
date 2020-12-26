import * as Colors from "https://deno.land/std/fmt/colors.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts";
import { Settings } from './class/settings.ts';
import { RandomUtils } from './class/SR.ts';

const PATH_SETTINGS: string = "../";
const settings: Settings = new Settings();

function countAsteriscs(count: number): number{
    let result: number = 0;
    for(let i: number = 1; i <= count * 2; i++)
        if(i % 2 == 1)
            result += i;
    return result;
}
let colorDecorators: Array<string> = new Array<string>("green", "red", "yellow", "blue");
let posDecorations: Array<number>;

async function Main(): Promise<void> {
    settings.loadSettings(PATH_SETTINGS);
    posDecorations = RandomUtils.generateRandom(settings.qtyDecorators, 0, countAsteriscs(settings.rowTree));
    while(true){
        DrawTree();
        DrawMsg();
        await sleep(settings.timeRedraw);
    }
}
function DrawTree(): void{
    console.clear();
    let pos:number = 0;

    for (let a:number = 0; a < settings.rowTree; a++) {
        for (let b: number = 0; b < settings.rowTree - a - 1; b++)
            console.log(" ");
        for (let b: number = settings.rowTree - a - 1; b < settings.rowTree + a; b++){
            if(posDecorations.includes(pos)) {
                let func = colorDecorators[RandomUtils.random(0, colorDecorators.length - 1)];
                let txt: string = (Colors["blue"])(settings.decorChar);
                console.log(txt);
            } else {
                console.log(Colors["green"](settings.treeChar));
            }
            pos++;
        }
        console.log("\n");
    }
}
function DrawMsg(): void{
    console.log("\n");
    console.log(Colors["red"](settings.msgCongrats));
    console.log(Colors["yellow"](settings.msgSecondary));
}
Main();
