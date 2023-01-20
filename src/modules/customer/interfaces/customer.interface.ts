import { Status } from "src/shared/enums/status.enum";

export interface Customer {
  id: string;
  name: string;
  email: string;
  status: Status;
  emails: number;
}
