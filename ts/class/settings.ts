import { resolve } from 'https://raw.githubusercontent.com/halvardssm/deno-path/master/mod.ts';
import { existsSync } from "https://deno.land/std@0.82.0/fs/mod.ts";

export class Settings{
    // Numeros
    public qtyDecorators: number = 0;
    public rowTree: number = 0;
    public timeRedraw: number = 0;
    // Textos
    public treeChar: string = "";
    public decorChar: string = "";
    public msgCongrats: string = "";
    public msgSecondary: string = "";
    public colorTree: string = "";
    public colorCongrats: string = "";
    public colorSecondary: string = "";

    public loadSettings(pathSettings: string): void {
        pathSettings = resolve(pathSettings, 'settings');
        if(!existsSync(pathSettings))
        throw new Error("This path to file is invalid");
        let txtSettingsFile = Deno.readTextFile(pathSettings);
        txtSettingsFile.then(txtSettings => {
            let sets: Array<string> = txtSettings.split('\n');
            sets.forEach(sett => {
                if(!sett.startsWith('#')){
                    let paramsSet: Array<string> = sett.split('=');
                    switch(paramsSet[0].trim()){
                        case "Quantity Decorations":
                            this.qtyDecorators = Number.parseInt(paramsSet[1]?.trim());
                            break;
                        case "Rows On Tree":
                                this.rowTree = Number.parseInt(paramsSet[1]?.trim());
                            break;
                        case "Time Wait Redraw":
                                this.timeRedraw = Number.parseInt(paramsSet[1]?.trim());
                            break;
                        case "Tree Character":
                                this.treeChar = paramsSet[1]?.trim();
                            break;
                        case "Decorations Character":
                                this.decorChar = paramsSet[1]?.trim();
                            break;
                        case "Color MSG Congrats":
                                this.colorCongrats = paramsSet[1]?.trim();
                            break;
                        case "Color MSG Secondary":
                                this.colorSecondary = paramsSet[1]?.trim();
                            break;
                        case "Color Tree":
                                this.colorTree = paramsSet[1]?.trim();
                            break;
                        case "MSG Congrats":
                                this.msgCongrats = paramsSet[1]?.trim();
                            break;
                        case "MSG Secondary":
                                this.msgSecondary = paramsSet[1]?.trim();
                            break;
                    }
                }
            });
        });
    }
}
