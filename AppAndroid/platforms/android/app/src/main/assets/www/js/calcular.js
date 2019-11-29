

 // Calcular Distancia
 function calculator(lat1h,long1h,lat2h,long2h) {
  var degtorad = 0.01745329;
  var radtodeg = 57.29577951;
  var lat1 = parseFloat(lat1h);
  var lat2 = parseFloat(lat2h);
  var long1 = parseFloat(long1h);
  var long2 = parseFloat(long2h);
  if ((lat1h.lastIndexOf("S"))!=-1 || (lat1h.lastIndexOf("s"))!=-1)
    lat1 = (lat1 * (-1));
  if ((lat1h.lastIndexOf("W"))!=-1 || (lat1h.lastIndexOf("w"))!=-1)
    lat1 = (lat1 * (-1));
  if((lat2h.lastIndexOf("S"))!=-1 || (lat2h.lastIndexOf("s"))!=-1)
    lat2 = (lat2 * (-1));
  if((lat2h.lastIndexOf("W")!=-1) || (lat2h.lastIndexOf("w"))!=-1)
    lat2 = (lat2 * (-1));
  if((long1h.lastIndexOf("S")!=-1) || (long1h.lastIndexOf("s"))!=-1)
    long1 = (long1 * (-1));
  if((long1h.lastIndexOf("W")!=-1) || (long1h.lastIndexOf("w"))!=-1)
    long1 = (long1 * (-1));
  if((long2h.lastIndexOf("S")!=-1) || (long2h.lastIndexOf("s"))!=-1)
    long2 = (long2 * (-1));
  if((long2h.lastIndexOf("W")!=-1) || (long2h.lastIndexOf("w"))!=-1)
    long2 = (long2 * (-1));
  var dlong = (long1 - long2);
  var dvalue = (Math.sin(lat1 * degtorad) * Math.sin(lat2 * degtorad))
   + (Math.cos(lat1 * degtorad) * Math.cos(lat2 * degtorad)
   * Math.cos(dlong * degtorad));
  var dd = Math.acos(dvalue) * radtodeg;
  var miles = (dd * 69.16);
  miles = (miles * 100)/100;
  var km = (dd * 111.302);
  km = (km * 100)/100;

  alert(miles);
  alert(km);
  //document.pasa.result.value = FormatNumber(miles, 2);
  //document.pasa.result2.value = FormatNumber(km, 2);
 }


</script>