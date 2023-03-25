import { Course } from "./Course";
import { Student } from "./Student";
import { Test } from "./Test";

export class Batch{
    ID: string;
    courses?: [string];
    students?: [string];
    tests?: [string];
    constructor(ID: string, courses?: [string], students?: [string], tests?: [string] ){
        this.ID = ID;
        this.courses = courses;
        this.students = students;
        this.tests = tests;
    }
}