// LeaveType model
export interface LeaveType {
    _id: string;
    name: string;
  }
  
  // PersonalDetails model
  export interface PersonalDetails {
    firstName: string;
    lastName: string;
  }
  
  // Department model
  export interface Department {
    _id: string;
    name: string;
  }
  
  // AppliedBy model
  export interface AppliedBy {
    _id: string;
    personalDetails: PersonalDetails;
    department: Department;
  }
  
  // Leave model
  export interface Leave {
    _id: string;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    emergencyContact: string;
    leaveStatus: string;
    totalDays: number;
    documentUrl: string;
    appliedBy: AppliedBy;
    decidedBy: any; // Adjust based on what is returned (e.g., string or null)
    comment: any;   // Adjust based on what is returned (e.g., string or null)
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  // EmployeeLeavesResponse model
  export interface EmployeeLeavesResponse {
    success: boolean;
    message: string;
    page: string;
    pageSize: string;
    totalCount: number;
    leaves: Leave[];
  }
  