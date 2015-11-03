 d:
   cd "d:\source\PBChChess2011\PBChChessPkg\"
   del PBChChessPkg.zip
   "C:\Program Files\7-Zip\7z" a  -tzip -r   -x!.zip -x!.svn -x!.settings -x!.project -x!*.psd -x!*.txt -x!*.db PBChChessPkg.zip

   d:
   cd d:\source\PBChChess2011\Support
      
   
   "C:\Program Files\Research In Motion\BlackBerry WebWorks SDK for TabletOS 2.1.0.6\bbwp\bbwp" "d:\source\PBChChess2011\PBChChessPkg\PBChChessPkg.zip"  -o "d:\source\PBChChess2011"   


   
   "C:\Program Files\Research In Motion\BlackBerry WebWorks SDK for TabletOS 2.1.0.6\bbwp\blackberry-tablet-sdk\bin\blackberry-deploy"  -installApp -password  xddx -device  10.251.222.202  -package d:\source\PBChChess2011\PBChChessPkg.bar -devmode
 