export class getLeaveModel{
    leaveStatus! : string
    leaveType! :string
    search!:string
    page!: number
    pageSize!: number
    department!:string
}

export interface getLeaveResponseModel {
    success: boolean
    message: string
    page: number
    pageSize: number
    totalCount: number
    leaves: LeaveDetails[]
  }
  
  export interface LeaveDetails {
    _id: string
    leaveType: LeaveType
    startDate: string
    endDate: string
    emergencyContact: string
    leaveStatus: string
    totalDays: number
    appliedBy: AppliedBy
    decidedBy: any
    comment: any
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface LeaveType {
    _id: string
    name: string
  }
  
  export interface AppliedBy {
    _id: string
    personalDetails: PersonalDetails
    department: Department
  }
  
  export interface PersonalDetails {
    firstName: string
    lastName: string
  }
  
  export interface Department {
    _id: string
    name: string
  }
  
export class mediaModel{
  file!:string
}
export interface mediaResponseModel{
    url: string
  }
 
  
  // DEPARTMENT MODEL CLASS
  
  export class departmentModel{
    page!:number
    pageSize!:number
    
  }

  export interface departmentResponseModel{
      success: boolean
      message: string
      timestamp: string
      data: Data
    }
    
    export interface Data {
      total: number
      page: number
      pageSize: number
      departments: Department[]
    }
    
    export interface Department {
      _id: string
      name: string
      description: string
      status: string
      departmentHead: any
      createdAt: string
      updatedAt: string
      __v: number
    }