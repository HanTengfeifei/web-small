
var requestHandler = {
  url:"",
  method:"",
  params: {},
  success: function (res) {
    // success  
  },
  fail: function () {
    // fail  
  },
}

//GET请求  
function GET(requestHandler) {
  request("GET",requestHandler)
}
//POST请求  
function POST(requestHandler) {
  request("POST",requestHandler)
}

function request(method,requestHandler) {
  var API_URL = requestHandler.url;
  //注意：可以对params加密等处理  
  var params = requestHandler.params;

  wx.request({
    url: API_URL,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
     header: {
        'content-type': 'application/x-www-form-urlencoded',
      //  "content-type":"application/json",
     },  
    success: function (res) {
      //注意：可以对参数解密等处理 
      if(res.data.code == 50) {
            wx.navigateTo({
              url: "../login/login"
            })
        requestHandler.success(res)
      } else {
        requestHandler.success(res)
      }
    },
    fail: function (res) {
      requestHandler.fail(res)
    },
    complete: function () {
      // complete  
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST,
}  