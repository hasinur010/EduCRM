import { Course } from "./Course";
import { Student } from "./Student";
import { Test } from "./Test";

export class Batch{
    key: string
    name: string;
    courses: string[];
    students: string[];
    tests: string[];
    constructor(name: string, courses?: string[], students?: string[], tests?: string[], key?: string ){
        this.key = key ? key : "unknown";
        this.name = name;
        this.courses = courses ? courses: ["unknown"];
        this.students = students ? students : ["unknown"];
        this.tests = tests ? tests : ["unknown"];
    }

    addStudent(student: Student){
        if(this.students.length == 0) this.students = []
        this.students.push(student.key)
    }
}