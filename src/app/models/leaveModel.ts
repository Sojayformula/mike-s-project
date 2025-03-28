export class leaveModel{
    leaveType!: string
    startDate!: string
    endDate!: string
    documentUrl!: string
    emergencyContact!: string
    shortNote!: string
}

export interface leaveResponseModel{
    success: boolean
    message: string
    data: Data
    timestamp: string
  }
  
  export interface Data {
    leaveType: string
    startDate: string
    endDate: string
    emergencyContact: string
    leaveStatus: string
    totalDays: number
    documentUrl: string
    appliedBy: string
    decidedBy: any
    comment: any
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
  }

export class leavetypeModel{
page!:string
pageSize!:string
}

export interface leavetypeResponseModel {
status: Status
data: Data
}

export interface Status {
success: boolean
message: string
timestamp: string
}

export interface Data {
total: number
page: number
pageSize: number
leaveTypes: Leavetype[]
}

export interface Leavetype {
_id: string
name: string
isDeductible: string
maxDays: string
createdAt: string
updatedAt: string
__v: number
}
