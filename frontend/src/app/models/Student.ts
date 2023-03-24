export class Student {
    name: string;
    fatherName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date;
    address: string;
  
    constructor(name: string, fatherName: string, phoneNumber: string, email: string, dateOfBirth: Date, address: string) {
      this.name = name;
      this.fatherName = fatherName;
      this.phoneNumber = phoneNumber;
      this.email = email;
      this.dateOfBirth = dateOfBirth;
      this.address = address;
    }
  }