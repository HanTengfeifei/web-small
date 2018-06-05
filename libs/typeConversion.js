/** 
  * 
  * json字符串转对象或数组
  */
function stringToModel(data) {
  return JSON.parse(data);
}
/** 
*json对象或者数组转换成json字符串
*/
function jsonToString(data) {
  return JSON.stringify(data);
}
/** 
*map转换为json 
*/
function mapToJson(map) {
  return JSON.stringify(strMapToObj(map));
}
/** 
*json转换为map 
*/
function jsonToMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}


/** 
*map转化为对象（map所有键都是字符串，可以将其转换为对象） 
*/
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

/** 
*对象转换为Map 
*/
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

module.exports = {
  stringToJson: stringToModel,
  jsonToString: jsonToString,
  mapToJson: mapToJson,
  jsonToMap: jsonToMap,
  strMapToObj: strMapToObj,
  objToStrMap: objToStrMap,
}  