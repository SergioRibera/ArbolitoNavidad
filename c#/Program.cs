using System;
using System.Collections.Generic;
using System.Threading;

namespace SR.Tree {
    class Program {
        const string PATH_SETTINGS = "../../../../";
        static Settings settings;

        static bool isLinux {
            get => Environment.OSVersion.Platform == PlatformID.Unix;
        }
        static int CountAsterics(int count) {
            int result = 0;
            for(int i = 1; i <= count * 2; i++){
                if(i % 2 == 1)
                    result += i;
            }
            return result;
        }
        static string[] colorDecorators = new string[]{
            "DarkGreen",
            "DarkRed",
            "DarkYellow",
            "DarkBlue"
        };
        static ConsoleColor GetColor(string c){
            ConsoleColor consoleColor = ConsoleColor.White;
            try {
                consoleColor = (ConsoleColor)Enum.Parse(typeof(ConsoleColor), c, true);
            }
            catch (Exception) { }
            return consoleColor;
        }
        static List<int> posDecorations;
        static void Main(string[] args)
        {
            settings = new Settings();
            settings.LoadSettings(PATH_SETTINGS);
            posDecorations = RandomUtils.GenerateRandom(settings.qtyDecorators, 0, CountAsterics(settings.rowTree));
            while(true){
                DrawTree();
                DrawMsgs();
                Thread.Sleep(settings.timeRedraw);
            }
        }
        static void DrawTree(){
            Console.Clear();
            int pos = 0;
            Random rdn = new Random();
            for (int a = 0; a < settings.rowTree; a++)
            {
                for (int b = 0; b < settings.rowTree - a - 1; b++)
                    Console.Write(" ");
                for (int b = settings.rowTree - a - 1; b < settings.rowTree + a; b++){
                    if(posDecorations.Exists(p => p == pos)) {
                        Console.ForegroundColor = GetColor(colorDecorators[rdn.Next(0, colorDecorators.Length - 1)]);
                        Console.Write(settings.decorChar);
                    } else {
                        Console.ForegroundColor = GetColor(settings.colorTree);
                        Console.Write(settings.treeChar);
                    }
                    pos++;
                }
                Console.Write(Environment.NewLine);
            }
        }
        static void DrawMsgs(){
            Console.WriteLine();
            Console.ForegroundColor = GetColor(settings.colorCongrats);
            Console.WriteLine(settings.msgCongrats);
            Console.ForegroundColor = GetColor(settings.colorSecondary);
            Console.WriteLine(settings.msgSecondary);
        }
    }
}
