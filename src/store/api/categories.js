import request from 'request'
export default {
  getCategories (cb) {
    let API = 'http://ec2-54-202-16-95.us-west-2.compute.amazonaws.com/api/ArtefactClass/GetAvailableStoryTypes'
    request.get(API,
      function (err, httpResponse, body) {
        if (err && err.message) {
          console.log(err)
        }

        if (httpResponse && httpResponse.statusCode === 200) {
          let response = body
          cb(response)
        }
      })
  }

}
