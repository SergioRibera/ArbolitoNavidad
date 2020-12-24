using System;
using System.IO;
using System.Globalization;

namespace SR.Tree {
    public class Settings {

        public int qtyTriangles, qtyDecorators,width;
        public string msgCongrats, msgSecondary;

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
                        case "Quantity Triangles":
                            qtyTriangles = int.Parse(paramsSet[1]?.Trim(), CultureInfo.InvariantCulture);
                            break;
                        case "Quantity Decorations":
                            qtyDecorators = int.Parse(paramsSet[1]?.Trim(), CultureInfo.InvariantCulture);
                            break;
                        case "Width":
                            width = int.Parse(paramsSet[1]?.Trim(), CultureInfo.InvariantCulture);
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
