export interface ReportDTO {
  title: string;
  description: string;
  category: string;
  reportingUserType: string;
  reportedUserType: string;
  reportedShipment: string;
}

export interface UserBasic {
  _id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface ShipmentBasic {
  _id: string;
  title: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
}

export interface Report {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  reportingUser: UserBasic;
  reportingUserType: string;
  reportedUser?: UserBasic;
  reportedUserType?: string;
  reportedShipment: ShipmentBasic;
  solutionExplanation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportResponse {
  message: string;
  report?: Report;
}

export interface ReportsResponse {
  reports: {
    report: Report;
  }[];
}
