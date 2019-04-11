import { Notification } from 'element-ui'

const defaultSuccessTitle = '成功'

const defaultWarningTitle = '警告'

const defaultInfoTitle = '消息'

const defaultErrorTitle = '失败'

const defaultDuration = 2000

const defaultMessage = '操作成功'

function notifyMsgFuc(title, message, type, duration) {
  Notification({
    title: title,
    message: message,
    type: type,
    duration: duration
  })
}

// function successMessage(message) {
//   notifyMsgFuc(defaultSuccessTitle, message, 'success', defaultDuration)
// }
//
// function errorMessage(message) {
//   Notification.error({
//     title: defaultErrorTitle,
//     message: message
//   })
// }

const notifyMsg = {
  successMessage: function(message) {
    notifyMsgFuc(defaultSuccessTitle, message, 'success', defaultDuration)
  },
  warningMessage: function(message) {
    notifyMsgFuc(defaultWarningTitle, message, 'warning', defaultDuration)
  },
  infoMessage: function(message) {
    Notification.info({
      title: defaultInfoTitle,
      message: message
    })
  },
  errorMessage: function(message) {
    Notification.error({
      title: defaultErrorTitle,
      message: message
    })
  },
  operationMsg: function(data) {
    const message = data.message === null ? defaultMessage : data.message
    if (data.success && data.success === true) {
      this.successMessage(message)
    } else {
      this.errorMessage(message)
    }
  }
}

export default notifyMsg
