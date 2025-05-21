// I. The Basics
// 1. Type Annotations: Bạn khai báo kiểu rõ ràng cho biến, hàm, hoặc tham số:
    let username: string = "Alice";
    let userId: number = 101;
    function add(a: number, b: number): number {
    return a + b;
    }
    //Ứng dụng: Đảm bảo giá trị gán đúng kiểu, tránh lỗi runtime (e.g., gán username = 123 sẽ báo lỗi biên dịch)

// 2. Type Inference: TypeScript tự động suy ra kiểu nếu bạn không khai báo:
    let count = 5; // TypeScript suy ra: number
    count = "5"; // Lỗi: Type 'string' is not assignable to type 'number'
    // Ứng dụng: Giảm sự rườm rà khi viết mã, nhưng bạn nên khai báo kiểu cho các hàm hoặc API trả về để rõ ràng hơn.

// II. Everyday Types
// 1. Primitive Types: string, number, boolean, bigint, symbol, null, undefined
// VD: let price: number = 99.99;

// 2. Array
    let scores: number[] = [90, 85, 88];
    let names: Array<string> = ["Alice", "Bob"];

// 3. Tuple: Mảng có độ dài và kiểu cố định:
    let userInfo: [string, number] = ["Alice", 25];
    userInfo[0] = "Bob"; // Hợp lệ
    userInfo[2] = 30; // Lỗi: Tuple chỉ có 2 phần tử
    // Ứng dụng: Dùng để lưu trữ dữ liệu có cấu trúc cố định, như tọa độ [x: number, y: number]

// 4. Any: Bỏ qua kiểm tra kiểu, nên hạn chế dùng vì mất đi lợi ích của TypeScript:
    let data: any = "Hello";
    data = 123; // Hợp lệ, nhưng không an toàn

// 5. Unknown: An toàn hơn, yêu cầu kiểm tra kiểu trước khi sử dụng:
    let response: unknown = fetchData(); // Giả sử API trả về dữ liệu
    if (typeof response === "string") {
    console.log(response.toUpperCase());
    }
    //Ứng dụng: Xử lý dữ liệu từ API khi chưa biết kiểu chính xác

// 6. Never: Dùng cho hàm không bao giờ trả về giá trị:\
    function throwError(message: string): never {
        throw new Error(message);
    }

// 7. Union Types:
// - cho phép một biến hoặc tham số có thể thuộc nhiều kiểu dữ liệu khác nhau. 
// - Nó được biểu diễn bằng ký hiệu | (dấu gạch đứng).
    let id: string | number = "A123";
    id = 123; // Hợp lệ

// 8. Literal Types:
// - Là kiểu dữ liệu cụ thể, chỉ cho phép một giá trị cụ thể (thường là chuỗi, số hoặc boolean).
    let status: "active" | "inactive" = "active";
    status = "pending"; // Lỗi: Type '"pending"' is not assignable to type '"active" | "inactive"'
    // Ứng dụng: Định nghĩa trạng thái hoặc biến thể trong React
    
    type ButtonVariant = "primary" | "secondary";
    interface ButtonProps {
    variant: ButtonVariant;
    }
    const Button: React.FC<ButtonProps> = ({ variant }) => (
    <button className={variant}>{variant}</button>
    );

// III. Narrowing
// - Xác định kiểu cụ thể bằng cách sử dụng các kỹ thuật như kiểm tra điều kiện, từ khóa typeof, instanceof

// 1. Sử dụng typeof để kiểm tra kiểu dữ liệu:
    function printValue(value: string | number) {
        if (typeof value === "string") {
            // Trong block này, TypeScript biết `value` là `string`
            console.log(value.toUpperCase());
        } else {
            // Trong block này, TypeScript biết `value` là `number`
            console.log(value.toFixed(2));
        }
    }

    printValue("hello"); // Output: HELLO
    printValue(42);     // Output: 42.00

// 2. Sử dụng Literal Types với điều kiện:
    type Status = "loading" | "success" | "error";

    function logStatus(status: Status) {
        if (status === "loading") {
            // TypeScript biết `status` là `"loading"`
            console.log("Đang tải...");
        } else if (status === "success") {
            // TypeScript biết `status` là `"success"`
            console.log("Thành công!");
        } else {
            // TypeScript biết `status` là `"error"`
            console.log("Lỗi!");
        }
    }

    logStatus("success"); // Output: Thành công!

// 3. Sử dụng instanceof với các lớp (class):
    class Dog {
        bark() { console.log("Woof!"); }
    }
    class Cat {
        meow() { console.log("Meow!"); }
    }

    function makeSound(animal: Dog | Cat) {
        if (animal instanceof Dog) {
            // TypeScript biết `animal` là `Dog`
            animal.bark();
        } else {
            // TypeScript biết `animal` là `Cat`
            animal.meow();
        }
    }

    makeSound(new Dog()); // Output: Woof!
    makeSound(new Cat()); // Output: Meow!

// 4. Sử dụng kiểm tra thuộc tính (Property Check):
    type User = { name: string } | { id: number };

    function printUser(user: User) {
        if ("name" in user) {
            // TypeScript biết `user` có thuộc tính `name`, nên là `{ name: string }`
            console.log(user.name);
        } else {
            // TypeScript biết `user` có thuộc tính `id`, nên là `{ id: number }`
            console.log(user.id);
        }
    }

    printUser({ name: "Alice" }); // Output: Alice
    printUser({ id: 123 });      // Output: 123

// 5. Sử dụng Type Guard (Hàm kiểm tra kiểu):
    function isString(value: any): value is string {
        return typeof value === "string";
    }

    function processValue(value: string | number) {
        if (isString(value)) {
            // TypeScript biết `value` là `string`
            console.log(value.toUpperCase());
        } else {
            // TypeScript biết `value` là `number`
            console.log(value.toFixed(2));
        }
    }

    processValue("test"); // Output: TEST
    processValue(42);     // Output: 42.00

// IV. More on Functions
// 1. Function Type Expressions:
// - Giúp xác định kiểu của tham số và giá trị trả về.
    type MathOperation = (a: number, b: number) => number;

    const add: MathOperation = (x, y) => x + y;
    const subtract: MathOperation = (x, y) => x - y;

    console.log(add(5, 3)); // Output: 8
    console.log(subtract(5, 3)); // Output: 2
//Lợi ích: Đảm bảo các hàm tuân theo một cấu trúc kiểu cụ thể, tái sử dụng được kiểu hàm.

// 2. Parameter Types
// - Kiểu tham số: Mỗi tham số trong hàm có thể được gán kiểu rõ ràng.
// - Tham số tùy chọn (Optional Parameters): Sử dụng dấu ? để đánh dấu tham số không bắt buộc.
// - Tham số mặc định (Default Parameters): Có thể gán giá trị mặc định, TypeScript suy ra kiểu từ giá trị này.
    function greet(name: string, greeting?: string): string {
        return `${greeting || "Hello"}, ${name}!`;
    }

    console.log(greet("Alice")); // Output: Hello, Alice!
    console.log(greet("Bob", "Hi")); // Output: Hi, Bob!

// 3. Rest Parameter và Rest Arguments
// - Rest Parameter: Sử dụng ... trong khai báo hàm để thu thập tất cả các tham số còn lại thành một mảng.
// - Rest Arguments: Là các giá trị thực tế được truyền vào hàm, được thu thập bởi Rest Parameter.
    function sum(...numbers: number[]): number {
        return numbers.reduce((total, num) => total + num, 0);
    }

    console.log(sum(1, 2, 3, 4)); // Output: 10
    // Ở đây, ...numbers là Rest Parameter.
    // Các giá trị 1, 2, 3, 4 là Rest Arguments.

// 4. Function Overloads
// - TypeScript cho phép định nghĩa nhiều chữ ký hàm (function signatures) cho cùng một hàm để hỗ trợ các trường hợp khác nhau.
    function combine(a: string, b: string): string;
    function combine(a: number, b: number): number;
    function combine(a: string | number, b: string | number): string | number {
        if (typeof a === "string" && typeof b === "string") {
            return a + b;
        } else if (typeof a === "number" && typeof b === "number") {
            return a + b;
        }
        throw new Error("Invalid arguments");
    }

    console.log(combine("Hello, ", "World!")); // Output: Hello, World!
    console.log(combine(5, 3)); // Output: 8
// Lợi ích: Đảm bảo TypeScript kiểm tra kiểu chính xác cho từng trường hợp sử dụng.

// 5. Other Types to Know About
// a) void: Kiểu void biểu thị rằng một hàm không trả về giá trị (hoặc trả về undefined)
    function sayHello(): void {
        console.log("Hello!");
    }
// Ứng dụng: Dùng cho các hàm chỉ thực hiện hành động mà không cần trả về kết quả.

// b) object: Kiểu object biểu thị một giá trị là một đối tượng (không phải kiểu nguyên thủy như string, number, boolean...).
    let user: object = { name: "Alice", age: 25 };
// Lưu ý: Kiểu object không cụ thể về cấu trúc, nên thường ít được sử dụng trực tiếp. 
// Thay vào đó nên dùng kiểu cụ thể hơn như { name: string, age: number }.

// c) unknown: - Kiểu unknown biểu thị một giá trị mà chúng ta không biết trước kiểu của nó. 
// - Nó an toàn hơn any vì phải thu hẹp kiểu trước khi sử dụng.
    let data: unknown = "Hello";
    if (typeof data === "string") {
        console.log(data.toUpperCase()); // Hợp lệ sau khi thu hẹp kiểu
    }
// Ứng dụng: Dùng khi làm việc với dữ liệu từ nguồn không xác định (như API) nhưng vẫn muốn kiểm soát kiểu an toàn.

// d) never: Kiểu never biểu thị một hàm không bao giờ hoàn thành (ném lỗi hoặc chạy vô hạn).
    function throwError(message: string): never {
        throw new Error(message);
    }
// Ứng dụng: Dùng để biểu thị các trường hợp không thể xảy ra hoặc hàm không bao giờ trả về giá trị.

// V. Object Types
// 1. Property Modifiers (Bộ sửa đổi thuộc tính):
// - Các bộ sửa đổi như optional và readonly được áp dụng cho thuộc tính trong Object Types.
    interface User {
        name: string;
        age?: number; // Optional
        readonly id: number; // Readonly
    }
    let user: User = { name: "Alice", id: 1 };
    user.age = 25; // Hợp lệ
    user.id = 2; // Lỗi: Cannot assign to 'id' because it is readonly

// 2. Optional Properties (Thuộc tính tùy chọn)
// - Sử dụng ? để đánh dấu thuộc tính không bắt buộc.
    type Config = {
        port?: number;
        host: string;
    };
    let config: Config = { host: "localhost" }; // Hợp lệ, không cần port

// 3. Readonly Properties (Thuộc tính chỉ đọc)
// - Sử dụng readonly để ngăn thay đổi giá trị sau khi khởi tạo.
    interface Point {
        readonly x: number;
        readonly y: number;
    }
    let point: Point = { x: 10, y: 20 };
    point.x = 15; // Lỗi: Cannot assign to 'x' because it is readonly

// 4. Index Signatures
// - Định nghĩa kiểu cho các thuộc tính động (tên không cố định).
    interface Dictionary {
        [key: string]: number;
    }
    let scores: Dictionary = { math: 95, science: 88 };
    console.log(scores["math"]); // Output: 95

// 5. Excess Property Checks (Kiểm tra thuộc tính thừa)
// - TypeScript kiểm tra và báo lỗi nếu đối tượng có thuộc tính không được định nghĩa trong Object Type.
    type User = { name: string };
    let user: User = { name: "Alice", age: 25 }; // Lỗi: Object literal may only specify known properties
    // Giải pháp: Sử dụng kiểu linh hoạt hơn (như [key: string]: any) hoặc gán qua biến trung gian.

//  6. Intersection Types (Kiểu giao nhau)
// - Kết hợp nhiều Object Types bằng toán tử &.
    type Person = { name: string };
    type Employee = { id: number };
    type EmployeePerson = Person & Employee;

    let emp: EmployeePerson = { name: "Alice", id: 1 };

// 7. Generic Object Types
// - Cho phép Object Types linh hoạt với các kiểu generic.
    interface Box<T> {
        value: T;
    }
    let numberBox: Box<number> = { value: 123 };
    let stringBox: Box<string> = { value: "Hello" };

// 8. The Array Type: Định nghĩa mảng với kiểu dữ liệu cụ thể:
    let numbers: number[] = [1, 2, 3];
    let names: Array<string> = ["Alice", "Bob"];

// 9. The ReadonlyArray Type (Kiểu mảng chỉ đọc): Mảng không thể thay đổi giá trị sau khi khởi tạo:
    let readonlyNumbers: ReadonlyArray<number> = [1, 2, 3];
    readonlyNumbers[0] = 4; // Lỗi: Cannot assign to '0' because it is in a readonly array

// 10. Tuple Types (Kiểu tuple): Mảng có số lượng và kiểu phần tử cố định.
    let tuple: [string, number] = ["Alice", 25];
    console.log(tuple[0]); // Output: Alice
    tuple[1] = 30; // Hợp lệ
    tuple.push("extra"); // Lỗi: Tuple type '[string, number]' has no property 'push'

// 11. Readonly Tuple Types: Tuple không thể thay đổi giá trị hoặc kích thước.
    let readonlyTuple: readonly [string, number] = ["Alice", 25];
    readonlyTuple[0] = "Bob"; // Lỗi: Cannot assign to '0' because it is a read-only tuple