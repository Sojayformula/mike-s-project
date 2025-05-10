export class getEmployeeModel {
    maritalStatus!: string;
    gender!: string;
    employeeStatus!: string;
    department?: string;
    search?: string;
    page!: number;
    pageSize!: number;
  }
  
  export interface Response {
    success: boolean
    message: string
    page: string
    pageSize: string
    totalCount: number
    allCount: number
    employees: Employee[]
  }
  
  export interface Employee {
    _id: string
    educationalDetails: EducationalDetail[]
    employmentDetails: EmploymentDetails
    familyDetails: FamilyDetails
    nextOfKinDetails: NextOfKinDetail[]
    personalDetails: PersonalDetails
    password: string
    email: string
    personalEmail: string
    createdAt: string
    department?: Department
    documents: any[]
    role: Role
    isDeleted: boolean
    deletedAt: any
    isFirstLogin: boolean
    skypeUsername: string
    leaveBalance: number
    carryoverLeave: number
    leaveYear: number
    carryoverExpiry: any
    updatedAt: string
    __v: number
    refreshToken?: string
    employeeStatus?: string
    faceEmbedding: any[]
    qrCode?: string
    profileUrl?: string
  }
  
  export interface EducationalDetail {
    schoolName: string
    programOfStudy: string
    startDate: string
    endDate: string
    certificateFile: string
  }
  
  export interface EmploymentDetails {
    staffId: string
    jobTitle: string
    location: string
    employmentStatus: string
    employmentType: string
    site: string
    hireDate: string
  }
  
  export interface FamilyDetails {
    maritalStatus: string
    spouseName: string
    spouseEmail: string
    spousePhone: string
    marraigecertificate: string
    children?: Children[]
  }
  
  export interface Children {
    fullName: string
    dob: string
    birthCertificateUrl: string
  }
  
  export interface NextOfKinDetail {
    nextOfKinName: string
    nextOfKinRelationship: string
    nextOfKinPhone: string
    nextOfKinEmail: string
  }
  
  export interface PersonalDetails {
    firstName: string
    lastName: string
    otherName: string
    birthday: string
    age: any
    gender: string
    phoneNumber: string
    emergencyContact: string
    homeAddress: string
    nationality: string
    socialSecurityNumber: string
    email?: string
  }
  
  export interface Department {
    _id: string
    name: string
    description: string
    status: string
  }
  
  export interface Role {
    _id: string
    name: string
    description: string
    defaultLeaveDays: number
    permissions: Permission[]
  }
  
  export interface Permission {
    _id: string
    name: string
  }



  // department model
  export class getDepartmentModel{
    search!: string
    page!: number
    pageSize!: number
  }

  export interface Root {
    success: boolean
    message: string
    timestamp: string
    allCount: number
    data: Data
  }
  
  export interface Data {
    total: number
    page: string
    pageSize: string
    departments: Department[]
  }
  
  export interface Department {
    _id: string
    name: string
    description: string
    status: string
    departmentHead: DepartmentHead
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface DepartmentHead {
    _id: string
    personalDetails: PersonalDetails
  }
  
  export interface PersonalDetails {
    firstName: string
    lastName: string
  }
  


 
  