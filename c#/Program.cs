using System;

namespace SR.Tree {
    class Program {
        const string PATH_SETTINGS = "../../../../";
        static Settings settings;
        static void Main(string[] args)
        {
            settings = new Settings();
            settings.LoadSettings(PATH_SETTINGS);

            for (int i = 1; i <= settings.qtyTriangles; i++)
            {
                for (int j = 0; j < i; j++)
                {
                    string branch = new String('*', j);
                    Console.WriteLine(branch.PadLeft(settings.qtyTriangles + 3) + "*" + branch);
                }
            }
        }
    }
}
