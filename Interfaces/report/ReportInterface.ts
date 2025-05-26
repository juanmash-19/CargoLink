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

export interface ReportUser {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  role: string;
}

export interface ReportShipment {
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
  status: 'pending' | 'resolved' | 'closed';
  reportingUser: ReportUser;
  reportingUserType: string;
  reportedUser: ReportUser;
  reportedUserType: string;
  reportedShipment: ReportShipment;
  solutionExplanation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportResponse {
  message: string;
  report?: Report;
}

export interface ReportsResponse {
  reports: ReportWrapper[];
}

export interface ReportWrapper {
  report: Report;
}
