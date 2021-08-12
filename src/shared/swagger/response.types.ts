export const responseSucess = {

  RESPONSE_SUCESS_LOGIN_DATA: {
    "StatusCode": 200,
    "Message": "Success",
    "Data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInVzZXJuYW1lIjoiMDk3NDc4MjM0IiwiaWF0IjoxNjI4NjY3NzUxLCJleHAiOjE2Mjg3Mjc3NTF9.P19NTzyMPod4KR7agq6Z2_evx1s5MePCd7DBwOoMajY",
      "user_id": 19,
      "ekyc": true,
      "full_name": "Nguyen Van A",
      "birthday": "12/12/2000",
      "email": "email@gmail.com",
      "address": "Hải Phòng",
      "province": 1,
      "district": {
        "id": 1,
        "district_id": 1,
        "district_name": "Quận Ba Đình"
      },
      "ward": {
        "id": 31858,
        "ward_id": 1,
        "ward_name": "Phường Phúc Xá"
      },
      "gender": 1,
      "career": {
        "id": 1,
        "career_name": "Biên/ Phiên dịch"
      },
      "hometown": "",
      "cccd": "",
      "cccd_date": "01/03/2011",
      "cccd_location": "hà nội",
      "is_recruitment": null,
      "has_cv": null,
      "phone_number": "097478234",
      "image_face_url": "https://gapo-ai-bot.s3.ap-southeast-1.amazonaws.com/Image/19/19.jpg"
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
    "StatusCode": 200,
    "Message": "Success",
    "Data": {
      "user_id": 19,
      "ekyc": true,
      "full_name": "Nguyen Van A",
      "birthday": "12/12/2000",
      "address": "Hải Phòng",
      "province": {
        "id": 1,
        "province_id": 1,
        "province_name": "Thành phố Hà Nội"
      },
      "district": {
        "id": 1,
        "district_id": 1,
        "district_name": "Quận Ba Đình"
      },
      "ward": {
        "id": 31858,
        "ward_id": 1,
        "ward_name": "Phường Phúc Xá"
      },
      "gender": 1,
      "career": {
        "id": 1,
        "career_name": "Biên/ Phiên dịch"
      },
      "hometown": "",
      "cccd": "",
      "cccd_date": "01/03/2011",
      "cccd_location": "hà nội",
      "phone_number": "097478234",
      "image_face_url": "https://gapo-ai-bot.s3.ap-southeast-1.amazonaws.com/Image/19/19.jpg"
    }
  },

  RESPONSE_SUCESS_LIST_JOB: {
    "StatusCode": 200,
    "Message": "Success",
    "Data": [
      {
        "job_id": 12,
        "province": {
          "id": 7,
          "province_id": 1,
          "province_name": "Hà Nội"
        },
        "district": {
          "id": 7,
          "district_id": 3,
          "district_name": "Quận Tây Hồ"
        },
        "career": {
          "id": 1,
          "career_name": "Biên/ Phiên dịch"
        },
        "logo_url": "https://www.programmersought.com/article/68922452650.jpg",
        "title": "Tuyen Nhan vien ban hang",
        "salary": 3,
        "job_type": 1,
        "expired_date": "24/03/2021"
      },
      {
        "job_id": 13,
        "province": {
          "id": 7,
          "province_id": 1,
          "province_name": "Hà Nội"
        },
        "district": {
          "id": 7,
          "district_id": 3,
          "district_name": "Quận Tây Hồ"
        },
        "career": {
          "id": 1,
          "career_name": "Biên/ Phiên dịch"
        },
        "logo_url": "https://www.programmersought.com/article/68922452650.jpg",
        "title": "Tuyen Nhan vien ban hang",
        "salary": 3,
        "job_type": 1,
        "expired_date": "24/03/2021"
      },
    ]
  },

  RESPONSE_SUCESS_USER_INFO_EKYC: {
    "StatusCode": 200,
    "Message": "Success",
    "Data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInVzZXJuYW1lIjoiMDk3NDc4MjM0IiwiaWF0IjoxNjI4NjY3NzUxLCJleHAiOjE2Mjg3Mjc3NTF9.P19NTzyMPod4KR7agq6Z2_evx1s5MePCd7DBwOoMajY",
      "user_id": 19,
      "ekyc": true,
      "full_name": "Nguyen Van A",
      "birthday": "12/12/2000",
      "email": "email@gmail.com",
      "address": "Hải Phòng",
      "province": 1,
      "district": {
        "id": 1,
        "district_id": 1,
        "district_name": "Quận Ba Đình"
      },
      "ward": {
        "id": 31858,
        "ward_id": 1,
        "ward_name": "Phường Phúc Xá"
      },
      "gender": 1,
      "career": {
        "id": 1,
        "career_name": "Biên/ Phiên dịch"
      },
      "hometown": "",
      "cccd": "",
      "cccd_date": "01/03/2011",
      "cccd_location": "hà nội",
      "is_recruitment": null,
      "has_cv": null,
      "phone_number": "097478234",
      "image_face_url": "https://gapo-ai-bot.s3.ap-southeast-1.amazonaws.com/Image/19/19.jpg"
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

  RESPONSE_SUCESS_LIST_SUBMIT_CV: {
    "StatusCode": 200,
    "Message": "Success",
    "Data": [
      {
        "cv_id": 4,
        "title": "Tuyen Nhan vien ban hang",
        "province": {
          "ids": 1,
          "province_id": 1,
          "province_name": "Thành phố Hà Nội"
        },
        "district": {
          "ids": 1,
          "district_id": 1,
          "district_name": "Quận Ba Đình"
        },
        "salary": 6,
        "avatar_url": "https://www.programmersought.com/article/68922452650.jpg",
        "created_date": "24/03/2021"
      }
    ]
  },


  RESPONSE_SUCESS_LIST_RECRUITMENT: { 
    StatusCode: 200, 
    Message: 'Success',
    Data:{
      "StatusCode": 200,
      "Message": "Success",
      "Data": [
        {
          "recruitment_id": 2,
          "location": null,
          "title": "Tuyen Nhan vien ban hang",
          "salary_max": 25,
          "salary_min": 22,
          "job_type": null
        },
        {
          "recruitment_id": 3,
          "location": null,
          "title": "Tuyen Nhan vien ban hang",
          "salary_max": 25,
          "salary_min": 22,
          "job_type": null
        }
      ]
    }

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

  RESPONSE_SUCESS_DETAIL_JOB: {
    "StatusCode": 200,
    "Message": "Success",
    "Data": {
      "job_id": 4,
      "title": "Tuyen Nhan vien ban hang",
      "user_id": "19",
      "level_id": "Cap Bac: Truong Phong",
      "career": {
        "id": 1,
        "career_name": "Biên/ Phiên dịch"
      },
      "description": [
        "Mo ta cong ty (type list)"
      ],
      "require_degree": "Dai Hoc, Trung cap",
      "require_amount": "1- 3 nguoi",
      "require_age_start": 20,
      "require_age_end": 23,
      "require_experience": [
        "Khong yeu cau kinh nghiem"
      ],
      "employee_benefits": [
        "Luong thuong",
        "nghi tet",
        "du lich"
      ],
      "require_time": 6,
      "salary": 6,
      "expired_date": "24/03/2021",
      "province": {
        "ids": 4,
        "province_id": 2,
        "province_name": "Tỉnh Hà Giang"
      },
      "district": {
        "ids": 4,
        "district_id": 2,
        "district_name": "Quận Hoàn Kiếm"
      },
      "cover_url": "https://www.programmersought.com/article/68922452650.jpg",
      "location": "Dia chi cong ty",
      "log_url": "https://www.programmersought.com/article/68922452650.jpg",
      "website": "https://www.abc.com/",
      "phone_number": "03656562565",
      "email": "nguyenvan@gmail.com"
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

