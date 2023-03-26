import { Course } from "./Course";
import { Student } from "./Student";
import { Test } from "./Test";

export class Batch{
    key: string
    name: string;
    courses: string[];
    students: string[];
    tests: string[];
    constructor(name: string, courses?: [string], students?: [string], tests?: [string], key?: string ){
        this.key = key ? key : "unknown";
        this.name = name;
        this.courses = courses ? courses: [];
        this.students = students ? students : [];
        this.tests = tests ? tests : [];
    }
}