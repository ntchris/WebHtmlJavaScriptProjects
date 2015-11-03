
   
   f:
   cd "F:\source\PBChChess2011\PBChChessPkg\"
   del PBChChessPkg.zip
   "C:\Program Files\7-Zip\7z" a  -tzip -r   -x!.zip -x!.svn -x!.settings -x!.project -x!*.psd -x!*.txt  PBChChessPkg.zip

   f:
   cd F:\source\PBChChess2011\Support
      
   
   "C:\Program Files (x86)\RIM\BBBWebWorksSDKforTabletOS2.0.0.4\bbwp\bbwp\bbwp" "F:\source\PBChChess2011\PBChChessPkg\PBChChessPkg.zip"  -o "F:\source\PBChChess2011"   

  
   "C:\Program Files (x86)\RIM\BBBWebWorksSDKforTabletOS2.0.0.4\bbwp\bbwp\blackberry-tablet-sdk\bin\"blackberry-deploy  -installApp -password  playbook -device  192.168.228.131  -package F:\source\PBChChess2011\PBChChessPkg.bar

   
   
