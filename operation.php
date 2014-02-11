<?php
"; print "樁徑 : " . $_GET["pilediameter"] . "
"; print "土壤單位重為 : " . $_GET["soilunitweight"] . "
"; print "土壤摩擦角為 : " . $_GET["frictionangle"] . "
"; print "土壤凝聚力為 : " . $_GET["cohesion"]; } ?> 請輸入樁長 : 

請輸入樁徑 : 

請輸入土壤單位重 : 

請輸入土壤摩擦角 : 

請輸入土壤凝聚力 : 


您輸入的基樁直徑為: m

您輸入的基樁長度為: m

您輸入的土壤摩擦角為: °

您輸入的土壤凝聚力為: kN/m2

您輸入的土壤單位重為: kN/m3

"; //計算Nc參數並將其設為變數$nc $nc = (($nq)-1)*(1/(tan(deg2rad($fa)))); echo "Nc = " . $nc ."
"; //計算Nr參數並將其設為變數$nr $nr = 2*($nq+1)*tan(deg2rad($fa)); echo "Nr = " . $nr ."
"; //計算Fcs修正因子並將其設為變數$fcs $fcs = 1+(($nq)/($nc)); echo "Fcs = " . $fcs . "
"; //計算Fqs修正因子並將其設為變數$fqs $fqs = 1+tan(deg2rad($fa)); echo "Fqs = " . $fqs . "
"; //計算Frs修正因子並將其設為變數$frs $frs = 1-0.4; echo "Frs = " . $frs . "
"; //以下四行為計算Fqd修正因子並將其設為變數$fqd $fqd = 1+2*(tan(deg2rad($fa)))* (pow((1-(sin(deg2rad($fa)))),2))* rad2deg(atan(($pl/$pd)*pi()/180)); echo "Fqd = " . $fqd . "
"; //計算Fcd修正因子並將其設為變數$fcd $fcd = $fqd-((1-$fqd)/(($nc)*tan(deg2rad($fa)))); echo "Fcd = " . $fcd . "
"; //Frd修正因子為1 $frd = 1; echo "Frd = " . $frd . "
" ?>

"假設土壤彈性模數Es = 600 kN/m2

土壤柏松比v = 0.3"

" ; //計算Fqr修正因子並將其設為變數$fqr $fqr = pow( M_E , ( (-3.8) * tan(deg2rad($fa))) + ( 3.07 * sin(deg2rad($fa)) ) * (log10 (2*100)) ); echo "Fqr = " . $fqr . "
" ?>in

?>