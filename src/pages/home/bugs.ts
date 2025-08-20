// TypeScript Bugs Collection
// This file contains various bugs and issues commonly found in TypeScript code

// Bug 1: Type mismatch - assigning string to number
let userId: number = "123"; // Error: Type 'string' is not assignable to type 'number'

// Bug 2: Undefined property access
interface User {
  name: string;
  email: string;
}

const user: User = {
  name: "John Doe"
  // Missing email property
};

console.log(user.email.toUpperCase()); // Error: Cannot read property 'toUpperCase' of undefined

// Bug 3: Incorrect function parameter types
function calculateArea(width: number, height: number): number {
  return width * height;
}

const area = calculateArea("10", 5); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

// Bug 4: Array type mismatch
const numbers: number[] = [1, 2, 3, 4, 5];
numbers.push("6"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

// Bug 5: Promise handling without await
async function fetchUserData(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Jane", email: "jane@example.com" });
    }, 1000);
  });
}

const userData = fetchUserData(); // Bug: Not awaiting the promise
console.log(userData.name); // Error: Property 'name' does not exist on type 'Promise<User>'

// Bug 6: Incorrect object destructuring
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

const { apiUrl, timeout, nonExistent } = config; // Error: Property 'nonExistent' does not exist on type

// Bug 7: Type assertion without proper checking
const response: any = { data: "some data" };
const userData2 = response.data as User; // Dangerous type assertion without validation

// Bug 8: Incorrect generic usage
function createArray<T>(item: T, count: number): T[] {
  return new Array(count).fill(item);
}

const stringArray = createArray<string>("hello", 3);
stringArray.push(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

// Bug 9: Missing return type annotation
function processData(data: any) { // Missing return type
  if (typeof data === "string") {
    return data.toUpperCase();
  } else if (typeof data === "number") {
    return data * 2;
  }
  // Missing return statement for other cases
}

// Bug 10: Incorrect enum usage
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

const status: Status = "PENDING"; // Error: Type '"PENDING"' is not assignable to type 'Status'

// Bug 11: Async function without proper error handling
async function riskyOperation(): Promise<void> {
  const result = await fetchUserData();
  console.log(result.nonExistentProperty); // Error: Property 'nonExistentProperty' does not exist
}

// Bug 12: Incorrect interface implementation
interface Animal {
  name: string;
  makeSound(): string;
}

class Dog implements Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  // Missing makeSound method implementation
}

// Bug 13: Incorrect union type usage
type StringOrNumber = string | number;

function processValue(value: StringOrNumber): string {
  return value.toUpperCase(); // Error: Property 'toUpperCase' does not exist on type 'number'
}

// Bug 14: Incorrect optional chaining
const user3: User | null = null;
const email = user3?.email?.toUpperCase(); // This is actually correct, but let's add a bug
const name = user3.name; // Error: Object is possibly 'null'

// Bug 15: Incorrect type guard
function isString(value: any): value is string {
  return typeof value === "string";
}

const testValue: any = 123;
if (isString(testValue)) {
  console.log(testValue.toUpperCase()); // TypeScript thinks this is safe, but it's actually a number
}

// Bug 16: Incorrect callback function
const numbers2 = [1, 2, 3, 4, 5];
const doubled = numbers2.map((num) => {
  return num.toUpperCase(); // Error: Property 'toUpperCase' does not exist on type 'number'
});

// Bug 17: Incorrect class property initialization
class Person {
  name: string; // Error: Property 'name' has no initializer and is not definitely assigned
  age: number;
  
  constructor(age: number) {
    this.age = age;
  }
}

// Bug 18: Incorrect module import/export
// This would cause issues if the module doesn't exist
import { nonExistentFunction } from './non-existent-module';

// Bug 19: Incorrect conditional type
type ConditionalType<T> = T extends string ? number : boolean;
const result: ConditionalType<string> = "hello"; // Error: Type 'string' is not assignable to type 'number'

// Bug 20: Incorrect template literal type
type Greeting<T extends string> = `Hello, ${T}!`;
const greeting: Greeting<"World"> = "Hello, Universe!"; // Error: Type '"Hello, Universe!"' is not assignable to type 'Hello, World!'

export {
  User,
  Status,
  Animal,
  Dog,
  Person,
  StringOrNumber,
  ConditionalType,
  Greeting
};
