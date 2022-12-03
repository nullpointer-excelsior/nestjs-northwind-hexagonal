import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
    
    @Prop({ type: Number, index: true })
    employeeId: number;
    @Prop()
    lastName: string;
    @Prop()
    firstName: string;
    @Prop()
    title: string;
    @Prop()
    titleOfCourtesy: string;
    @Prop()
    birthDate: Date;
    @Prop()
    hireDate: Date;
    @Prop()
    address: string;
    @Prop()
    city: string;
    @Prop()
    region: string;
    @Prop()
    postalCode: string;
    @Prop()
    country: string;
    @Prop()
    homePhone: string;
    @Prop()
    extension: string;
    @Prop()
    notes: string;
    @Prop()
    reportsTo: number;
    @Prop()
    photoPath: string;
   
    
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);