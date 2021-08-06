export const responseSucess = {

    RESPONSE_SUCESS_LOGIN_DATA: {
        StatusCode: 200,
        Message: "Success",
        Data:{
            token: "EzGD5fOgI4...",
            user_info: {
              id: 19,
              username: "097478234",
              ekyc: 1
            }
          }
    },

    RESPONSE_SUCESS_DATA: {
      StatusCode: 200,
      Message: "Success",
      Data:{
            id: 19
        }
  },

  RESPONSE_SUCESS_UPLOAD_AVATAR: {
      StatusCode: 200,
      Message: "Success",
      Data:{
            user_id: 19,
            avatar_url: "https://gapo-ai-bot.s3.ap-southeast-1.amazonaws.com/Image/19/19.jpg"
        }
  },

  RESPONSE_SUCESS_UPLOAD_PHOTO: {
    StatusCode: 200,
    Message: "Success",
    Data:{
          user_id: 19,
          photo_url: "https://gapo-ai-bot.s3.ap-southeast-1.amazonaws.com/Image/19/19.jpg"
      }
  },

  RESPONSE_SUCESS_NO_DATA: {
      StatusCode: 200,
      Message: "Success",
      Data:{
      }
  },

  RESPONSE_SUCESS_CAREER_DATA: {
      StatusCode: 200,
      Message: "Success",
      Data:[
          {
            "id": 1,
            "careerName": "Biên/ Phiên dịch",
            "desccript": "",
            "createdDate": "2021-08-02T04:18:19.000Z",
            "activeFlag": 1
          },
          {
            "id": 2,
            "careerName": "Báo chí/ Truyền hình",
            "desccript": "",
            "createdDate": "2021-08-02T04:18:19.000Z",
            "activeFlag": 1
          }
      ]
  },

  RESPONSE_SUCESS_EKYC_DATA: {
    StatusCode: 200,
    Message: "Success",
    Data:{
      StatusCode: 200, 
      Message: 'Success',
      Data: {"user_id":'1',
            "face_liveness": true,
            "face_compare":true,
            "cccd_back":false,
            "cccd_front":false,
            "is_verified":false,
            "full_name":"Nguyen van A",
            "birthday": '12/2/2001',
            "cccd_number": '192029039',
            "hometown": "Phuc Long, Ha Long, quang Ninh",
            "address": "Hai Ly, Ha Nam, Ha Nam",
            "image_face_url": "https://4w2444444444444444.com",
            "image_cccd_front_url": "https://4w2444444444444444.com",
            "image_cccd_back_url": "https://4w2444444444444444.com"

          }
    }
  },

  RESPONSE_SUCESS_USER_INFO: { 
    StatusCode: 200, 
    Message: 'Success',
    Data: {"user_id":12,
          "full_name": "nGUYEN vAN a",
          "birthday": '13/2/2002',
          "phone_number": "0939399393",
          "image_face_url": "https://4w2444444444444444.com.jpg"

        }
  },

  RESPONSE_SUCESS_USER_INFO_EKYC: { 
    StatusCode: 200, 
    Message: 'Success',
    Data: {"user_id":'12',
          "ekyc": 0,
          "full_name": 'nGUYEN vAN a',
          "birthday": '12/3/2001',
          "address": 'Hai Duong, Hai Hung, Hai Phong',
          "hometown": 'Hai Duong, Hai Hung, Hai Phong',
          "cccd": '12322323',
          "cccd_date": '12/2/2002',
          "cccd_location": 'Hai Phong',
          "phone_number": '0939930033',
          "image_face_url": 'https://4w2444444444444444.comdd.jpg'

        }
  },

  RESPONSE_SUCESS_USER_PROFILE_CV: { 
      StatusCode: 200, 
      Message: 'Success',
      Data: {"user_id": 1,
            "cv_id": 12,
            "cv_name": "Nguyen Van A CV",
            "full_name": "Nguyen Van A",
            "birthday": "12/1/2001",
            "gender": 1,
            "phone_number": "03656562565",
            "email": "nguyenvan@gmail.com",
            "address": "Ha Dong, Ha Tay, Ha Noi",
            "education": [
              "DH Thang Long",
              "Dai Hoc Kinh Te"
            ],
            "experience": [
              "Cong Ty FPT SoftWare",
              "Cty Vin Smart"
            ],
            "skills": [
              "Làm việc nhóm",
              "Excel",
              "World",
              "PowerPoint"
            ],
            "career_name": "Kinh Doanh",
            "career_id": 2,
            "avatar_url": "https://www.abc.com/file/dssfs"}
  
  },
  RESPONSE_SUCESS_LIST_CV: { 
      StatusCode: 200, 
      Message: 'Success',
      Data: [
        {
            "cv_id": "2",
            "cv_name": "Nguyen Van A CV",
            "avatar_url": "https://www.abc.com/file/dssfs",
            "created_date": "2021-08-03T09:33:23.000Z"
        },
        {
            "cv_id": "4",
            "cv_name": "Nguyen Van A CV",
            "avatar_url": "https://www.abc.com/file/dssfs",
            "created_date": "2021-08-03T10:22:38.000Z"
        }
    ]
  
  },

  RESPONSE_SUCESS_LIST_FIELDS_CAREER: {
    "StatusCode": 200,
    "Message": "Success",
    "Data": [
      {
        "id": 1,
        "career_name": "Biên/ Phiên dịch",
        "desccript": "",
        "created_date": "2021-08-02T04:18:19.000Z",
        "active_flag": 1
      },
      {
        "id": 2,
        "career_name": "Báo chí/ Truyền hình",
        "desccript": "",
        "created_date": "2021-08-02T04:18:19.000Z",
        "active_flag": 1
      }
    ]

  },

  RESPONSE_SUCESS_JOBCOMPANY_DATA: {
    "StatusCode": 200,
    "Message": "Success",
    "Data": {
      "id": 3,
      "company_name": "cong ty co phan f19",
      "user_id": "19",
      "cover_url": "https://www.abc.com/file/dssfs",
      "description": [
        "Làm việc nhóm",
        "Excel",
        "World",
        "PowerPoint"
      ],
      "location": "Ha Dong, Ha Tay, Ha Noi",
      "size": "12",
      "job_career": "Kinh doanh",
      "intro": [
        "cong ty co phan f19",
        "21232545545333",
        "Kinh doanh",
        "12"
      ],
      "core_values": [
        "DH Thang Long",
        "Dai Hoc Kinh Te"
      ],
      "logo_url": "https://www.abc.com/file/dssfs",
      "website": "https://www.abc.com",
      "email": "nguyenvan@gmail.com",
      "phone_number": "03656562565",
      "tax_id": "21232545545333"
    }
  },

  RESPONSE_SUCESS_PROVINCE: {
    "StatusCode": 200,
    "Message": "Success",
    "Data": [
      {
        "provice_id": 92,
        "provice_name": "Thành phố Cần Thơ"
      },
      {
        "provice_id": 1,
        "provice_name": "Thành phố Hà Nội"
      }
    ]
  },

  RESPONSE_SUCESS_DISTRICT: {
    "StatusCode": 200,
    "Message": "Success",
    "Data": [
      {
        "district_id": 31,
        "district_name": "Huyện Bắc Mê"
      },
      {
        "district_id": 34,
        "district_name": "Huyện Bắc Quang"
      }
    ]
  },


  RESPONSE_SUCESS_WARD: {
    "StatusCode": 200,
    "Message": "Success",
    "Data": [
      {
        "ward_id": 7,
        "ward_name": "Phường Cống Vị"
      },
      {
        "ward_id": 31,
        "ward_name": "Phường Giảng Võ"
      },
    ]
  },
}

