export class Student {
    key: string
    name: string;
    fatherName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date;
    address: string;
  
    constructor(name: string, fatherName: string, phoneNumber: string, email: string, dateOfBirth: Date, address: string, key?: string) {
      this.key = key ? key : "unknown"
      this.name = name;
      this.fatherName = fatherName;
      this.phoneNumber = phoneNumber;
      this.email = email;
      this.dateOfBirth = dateOfBirth;
      this.address = address;
    }
  }