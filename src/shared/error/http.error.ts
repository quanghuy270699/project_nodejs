const { VndErrorType } = require('./constant.error')

export const getCustomError = vndError => {
  return VndErrorType[vndError]
}
