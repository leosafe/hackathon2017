import request from 'request'
export default {
  getImages (words, activeCategory, cb, fb) {
    let API = 'http://ec2-54-202-16-95.us-west-2.compute.amazonaws.com/api/ArtefactClass/GetArtefact'
    let mockRequest = {
      'Userid': '789',
      'DeviceId': '9879879879879',
      'SessionId': '78979879789',
      'Artefact': words,
      'AssociatedSound': null,
      'StoryClassId': activeCategory,
      'RawText': null,
      'FirstOnly': true,
      'LocalSource': false,
      'Animated': false,
      'GetRealData': true
    }
    console.log(words)
    request.post({
      url: API,
      form: mockRequest,
      method: 'POST'
    },
      function (err, httpResponse, body) {
        if (err) {
          console.log(err)
          return false
        }

        if (httpResponse.statusCode === 200) {
          let responseUser = JSON.parse(body)
          cb(responseUser)
        }
      })
  }
}
