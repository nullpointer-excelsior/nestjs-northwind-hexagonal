import { UserCustomer } from "../../northwind/domain/model/entities/UserCustomer";
import { CreateCustomerDto } from "./CreateCustomerDto";

export type CreateNewCustomerDto = CreateCustomerDto & { user: UserCustomer }