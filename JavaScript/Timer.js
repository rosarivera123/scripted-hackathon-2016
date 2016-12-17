var countUp= 0;

 function countupTimer (){
     countUp = countUp + 1
 $("#sec").text(countUp)
    window.setTimeout(countupTimer,1000); 
 }
 $(document).ready(function(){
    window.setTimeout(countupTimer,1000); 
 })