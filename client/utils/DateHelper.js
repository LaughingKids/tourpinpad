export const convertDateString = function(dateString) {
  var dateValue = Date.parse(dateString);
  var date = new Date(dateValue);
  var dateReturn = date.toLocaleDateString();
  return dateReturn;
}

export const defaultDateString = function(dateString) {
  var dateArray = dateString.split("T");
  return dateArray[0];
}


export const distanceDate = function(arrivalDate,dispatcherDate){
    var startDate = Date.parse(arrivalDate);
    var endDate = Date.parse(dispatcherDate);
    var distance = ((endDate - startDate) / (24 * 3600 * 1000));
    return distance + 1;
}
