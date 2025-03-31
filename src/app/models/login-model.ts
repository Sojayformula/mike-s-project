export class LoginModel{
 email!:string
 password!:string
}

export interface LoginResponseModel {
    message: string
    deletedAt: any
    _id: string
    educationalDetails: EducationalDetail[]
    employmentDetails: EmploymentDetail[]
    familyDetails: FamilyDetails
    personalDetails: PersonalDetails
    password: string
    email: string
    createdAt: string
    children: string[]
    department: string
    role: Role
    updatedAt: string
    __v: number
    refreshToken: string
    documents: any[]
    isDeleted: boolean
    isFirstLogin: boolean
    token: string
  }
  
  export interface EducationalDetail {
    schoolName: string
    programOfStudy: string
    startDate: string
    endDate: string
    certificateFile: string
  }
  
  export interface EmploymentDetail {
    staffId: string
    jobTitle: string
    location: string
    employmentStatus: string
    site: string
    hireDate: string
  }
  
  export interface FamilyDetails {
    maritalStatus: string
    spouseName: string
    spousePhone: string
    marraigecertificate: string
  }
  
  export interface PersonalDetails {
    firstName: string
    lastName: string
    otherName: string
    birthday: string
    age: string
    gender: string
    phoneNumber: string
    homeAddress: string
    nationality: string
    socialSecurityNumber: string
    email: string
  }
  
  export interface Role {
    _id: string
    name: string
    description: string
    permissions: Permission[]
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Permission {
    _id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  