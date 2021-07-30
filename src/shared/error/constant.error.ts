export const VndError = {
  USER_UNAUTHORIZED: 'USER_UNAUTHORIZED',
  USER_CONFLICT: 'USER_CONFLICT',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_NOT_ACTIVATE: 'USER_NOT_ACTIVATE',
  USER_SUBMIT_OTP_OR_PHONE_INCORRECT: 'USER_SUBMIT_OTP_OR_PHONE_INCORRECT',
  USER_OTP_NOT_MATCH: 'USER_OTP_NOT_MATCH',
  USER_PASSWORD_NOT_CORRECT: 'USER_PASSWORD_NOT_CORRECT',
}

export const VndErrorType = {
  USER_UNAUTHORIZED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_UNAUTHORIZED",
      Message: "Username or password incorrect." 
    }
  },
  USER_CONFLICT: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_CONFLICT",
      Message: "Username conflict." 
    }
  },
  USER_NOT_FOUND: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_NOT_FOUND",
      Message: "Username not found." 
    }
  },

  USER_SUBMIT_OTP_OR_PHONE_INCORRECT: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_SUBMIT_OTP_OR_PHONE_INCORRECT",
      Message: "Otp or Phone incorrect." 
    }
  },

  USER_PASSWORD_NOT_CORRECT: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_PASSWORD_NOT_CORRECT",
      Message: "Password incorrect." 
    }
  },

  USER_OTP_NOT_MATCH: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_OTP_NOT_MATCH",
      Message: "otp not match." 
    }
  },

  USER_FRONT_UNDETECTED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_FRONT_UNDETECTED",
      Message: "front cccd not detected." 
    }
  },

  USER_BACK_UNDETECTED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_BACK_UNDETECTED",
      Message: "back cccd not detected." 
    }
  },

  USER_SELFIE_UNDETECTED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_SELFIE_UNDETECTED",
      Message: "selfie not detected." 
    }
  },

  USER_FRONT_BACK_UNDETECTED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_FRONT_BACK_UNDETECTED",
      Message: "front cccd not detected." 
    }
  },

  USER_FRONT_SELFIE_UNDETECTED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_FRONT_SELFIE_UNDETECTED",
      Message: "front and back cccd not detected." 
    }
  },

  USER_SELFIE_BACK_UNDETECTED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_SELFIE_BACK_UNDETECTED",
      Message: "selfie and back cccd not detected." 
    }
  },

  USER_ALL_INFORMATION_UNDETECTED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_ALL_INFORMATION_UNDETECTED",
      Message: "all info not detected." 
    }
  },

  USER_ID_NUMBERS_UNMATCHED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_ID_NUMBERS_UNMATCHED",
      Message: "id cccd not match." 
    }
  },

  USER_FACES_UNMATCHED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_FACES_UNMATCHED",
      Message: "face not match with cccd." 
    }
  },
  USER_FULLNAME_UNMATCHED: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_FULLNAME_UNMATCHED",
      Message: "face not match with cccd." 
    }
  },

  PERSON_MORE_THAN_ONE_IN_IMAGE: {
    Message: 'error',
    Data:{
      ErrorCode: "PERSON_MORE_THAN_ONE_IN_IMAGE",
      Message: "Person more than 1 in image ." 
    }
  },
  USER_UPLOAD_FAIL: {
    Message: 'error',
    Data:{
      ErrorCode: "USER_UPLOAD_FAIL",
      Message: "Username upload  image fail." 
    }
  },

  REQUEST_TO_AI_FAIL: {
    Message: 'error',
    Data:{
      ErrorCode: "REQUEST_TO_AI_FAIL",
      Message: "request to ai fail." 
    }
  },
}
