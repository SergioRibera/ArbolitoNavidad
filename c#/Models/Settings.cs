using System;
using System.IO;
using System.Globalization;

namespace SR.Tree {
    public class Settings {

        public int qtyDecorators, rowTree, timeRedraw;
        public string treeChar, decorChar, msgCongrats, msgSecondary, colorTree, colorCongrats, colorSecondary;

        /// <summary></summary>
        /// <param name="pathSettings">Este parámetro indica la ruta en la que
        /// se encuentra el archivo de configuracion llamado settings por
        /// defecto</param>
        public void LoadSettings(string pathSettings){
            pathSettings = Path.Join(pathSettings, "settings");
            if(!File.Exists(pathSettings))
                throw new Exception("This path to file is invalid");
            string txtSettings = File.ReadAllText(pathSettings);
            string[] sets = txtSettings.Split('\n');
            foreach(var set in sets){
                if(!set.StartsWith('#')){
                    string[] paramsSet = set.Split('=');
                    switch(paramsSet[0].Trim()){
                        case "Quantity Decorations":
                            qtyDecorators = int.Parse(paramsSet[1]?.Trim(), CultureInfo.InvariantCulture);
                            break;
                        case "Rows On Tree":
                            rowTree = int.Parse(paramsSet[1]?.Trim(), CultureInfo.InvariantCulture);
                            break;
                        case "Time Wait Redraw":
                            timeRedraw = int.Parse(paramsSet[1]?.Trim(), CultureInfo.InvariantCulture);
                            break;
                        case "Tree Character":
                            treeChar = paramsSet[1]?.Trim();
                            break;
                        case "Decorations Character":
                            decorChar = paramsSet[1]?.Trim();
                            break;
                        case "Color MSG Congrats":
                            colorCongrats = paramsSet[1]?.Trim();
                            break;
                        case "Color MSG Secondary":
                            colorSecondary = paramsSet[1]?.Trim();
                            break;
                        case "Color Tree":
                            colorTree = paramsSet[1]?.Trim();
                            break;
                        case "MSG Congrats":
                            msgCongrats = paramsSet[1]?.Trim();
                            break;
                        case "MSG Secondary":
                            msgSecondary = paramsSet[1]?.Trim();
                            break;
                    }
                }
            }
        }
    }
}
