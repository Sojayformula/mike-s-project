export class decideLeaveModel{
    leaveId!: string
    status!: string
    comment!: string
}
export interface decideLeaveResponseModel{
    success: boolean
    message: string
    data: Data
    timestamp: string
  }
  
  export interface Data {
    leave: Leave
    decidedBy: DecidedBy
    decisionComment: string
  }
  
  export interface Leave {
    leaveType: LeaveType
    startDate: string
    endDate: string
    emergencyContact: string
    leaveStatus: string
    totalDays: number
    appliedBy: AppliedBy
    decidedBy: any
    comment: string
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface LeaveType {
    _id: string
    name: string
    isDeductible: string
  }
  
  export interface AppliedBy {
    _id: string
    personalDetails: PersonalDetails
    department: string
    role: Role
    leaveBalance: number
  }
  
  export interface PersonalDetails {
    firstName: string
    lastName: string
  }
  
  export interface Role {
    _id: string
    name: string
    defaultLeaveDays: number
  }
  
  export interface DecidedBy {
    firstName: string
    lastName: string
  }
   
  