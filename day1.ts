//1. Type
// - Là định nghĩa kiểu dữ liệu. 
// - Phù hợp với các kiểu phức tạp, kiểu tổng hợp (union), hoặc kiểu giao nhau (intersection).
// - Nó linh hoạt hơn interface trong một số trường hợp và được dùng để mô tả kiểu dữ liệu chính xác.

// Khai báo kiểu:
    type Point = {
        x: number;
        y: number;
    };
    let point: Point = { x: 10, y: 20 };

// Union Types: Cho phép biến thuộc nhiều kiểu khác nhau:
    type ID = string | number;
    let userId: ID = "abc123"; // Hợp lệ
    userId = 123; // Hợp lệ
    //userId = true; // Lỗi'

// Intersection Types: Kết hợp nhiều kiểu thành một:
    type A = { name: string };
    type B = { age: number };
    type Person = A & B;
    let person: Person = { name: "John", age: 25 };

// Literal Types: Giới hạn giá trị cụ thể:
    type Status = "success" | "error" | "loading";
    let currentStatus: Status = "success";
    //currentStatus = "failed"; // Lỗi

// Kiểu phức tạp: type có thể kết hợp nhiều cấu trúc:
    type User = {
        id: string | number;
        roles: string[];
        status: "active" | "inactive";
    };
    let user: User = {
        id: "u1",
        roles: ["admin", "user"],
        status: "active",
    };

// VD1: API Responses: Định nghĩa kiểu trả về từ API
    type ApiResponse = { data: string[] } | { error: string };
    function handleResponse(response: ApiResponse) {
    if ("data" in response) {
        console.log(response.data);
    } else {
        console.error(response.error);
    }
    }

// VD2: Xử lý nhiều kiểu dữ liệu: Dùng union types để xử lý các tham số linh hoạt:
    type Input = string | number;
    function processInput(input: Input) {
    return typeof input === "string" ? input.toUpperCase() : input * 2;
    }
    console.log(processInput("hello")); // "HELLO"
    console.log(processInput(5)); // 10

// - Sử dụng type khi cần định nghĩa kiểu nguyên thủy, union, hoặc intersection.
// - Tránh lạm dụng union types quá phức tạp (ví dụ: string | number | boolean | null), hãy tách thành các kiểu cụ thể nếu có thể.

// VD3: Kết hợp với Type Guards để kiểm tra kiểu:
    function isString(value: string | number): value is string {
        return typeof value === "string";
    }
    let value: string | number = "test";
    if (isString(value)) {
        console.log(value.toUpperCase()); // TypeScript biết value là string
    }

// 2.Enum
// - Là cách định nghĩa một tập hợp các giá trị cố định. 
// - Giúp mã dễ đọc và hạn chế lỗi khi gán giá trị không hợp lệ.

// Enum số (Numeric Enum):
    enum Direction {
        Up, // 0
        Down, // 1
        Left, // 2
        Right, // 3
    }
    let move: Direction = Direction.Up; // 0
    console.log(Direction[0]); // "Up"

// - Giá trị mặc định bắt đầu từ 0 và tăng dần, nhưng có thể tùy chỉnh
    enum StatusCode {
        OK = 200,
        BadRequest = 400,
        NotFound = 404,
    }
    let response: StatusCode = StatusCode.OK; // 200

// - Enum chuỗi (String Enum):
    enum Role {
        Admin = "ADMIN",
        User = "USER",
        Guest = "GUEST",
    }
    let userRole: Role = Role.Admin; // "ADMIN"
//Enum chuỗi rõ ràng hơn và dễ debug, phù hợp khi giá trị cần được truyền (ví dụ: qua API).

// - Const Enum: Biên dịch thành giá trị trực tiếp, giảm kích thước mã JavaScript:
    const enum Size {
        Small = "S",
        Large = "L",
    }
    let shirtSize: Size = Size.Small; // Biên dịch thành "S"

//VD1: Dùng enum để quản lý trạng thái giao diện hoặc API
    enum AppStatus {
        Loading = "LOADING",
        Success = "SUCCESS",
        Error = "ERROR",
    }
    function renderUI(status: AppStatus) {
        switch (status) {
        case AppStatus.Loading:
            console.log("Showing spinner...");
            break;
        case AppStatus.Success:
            console.log("Showing data...");
            break;
        case AppStatus.Error:
            console.log("Showing error message...");
            break;
        }
    }
    renderUI(AppStatus.Loading);

//VD2: Hằng số cố định: Dùng trong trò chơi hoặc hệ thống có giá trị cố định:
    enum GameMove {
        Rock = "ROCK",
        Paper = "PAPER",
        Scissors = "SCISSORS",
    }
    let playerMove: GameMove = GameMove.Rock;

// - Dùng string enum khi giá trị cần được truyền qua API hoặc hiển thị cho người dùng.
// - Tránh lạm dụng enum khi chỉ cần literal types (ví dụ: "success" | "error" có thể thay cho enum trong trường hợp đơn giản).
// - Sử dụng const enum nếu không cần truy cập ngược (lookup) để tối ưu mã.

// 3. Object
//- Được định nghĩa thông qua type hoặc interface để mô tả cấu trúc của một đối tượng, bao gồm các thuộc tính và kiểu của chúng.

// Định nghĩa cơ bản:
    type User = {
        id: string;
        name: string;
        age: number;
        isActive?: boolean; // Thuộc tính tùy chọn
    };
    let user: User = { id: "u1", name: "John", age: 25 };

// Readonly: Ngăn thay đổi giá trị thuộc tính:
    type Product = {
        readonly id: number;
        name: string;
        price: number;
    };
    let product: Product = { id: 1, name: "Laptop", price: 1000 };
    // product.id = 2; // Lỗi

// Index Signatures: Cho phép định nghĩa kiểu cho các thuộc tính động:
    type Dictionary = {
        [key: string]: string;
    };
    let dict: Dictionary = {
        name: "John",
        role: "Admin",
    };

// Kết hợp với Union Types
    type Config = {
        name: string;
        value: string | number | boolean;
    };
    let config: Config = { name: "timeout", value: 5000 };

//VD1: Mô tả dữ liệu API:
    type UserResponse = {
        id: string;
        username: string;
        email: string;
        createdAt: Date;
    };
    async function fetchUser(id: string): Promise<UserResponse> {
        const response = await fetch(`/api/users/${id}`);
        return response.json();
    }

//VD2: Cấu hình ứng dụng:
    type AppConfig = {
        apiUrl: string;
        maxRetries: number;
        [key: string]: string | number; // Cho phép thêm thuộc tính động
    };
    let config: AppConfig = {
        apiUrl: "https://api.example.com",
        maxRetries: 3,
        timeout: 5000,
    };

// Kết hợp với Type Assertion khi làm việc với dữ liệu không rõ kiểu
    let data: any = { id: 1, name: "Book" };
    let product = data as Product; // Ép kiểu

// - Sử dụng ? cho các thuộc tính không bắt buộc để tăng tính linh hoạt.
// - Dùng readonly cho các thuộc tính không nên thay đổi (như ID).

// 4. Function
// - Được khai báo với kiểu tham số và kiểu trả về để đảm bảo tính an toàn kiểu.

// Hàm cơ bản: 
    function add(a: number, b: number): number {
        return a + b;
    }
    console.log(add(2, 3)); // 5

// Tham số tùy chọn và mặc định:
    function greet(name: string, greeting: string = "Hello"): string {
        return `${greeting}, ${name}!`;
    }
    console.log(greet("John")); // "Hello, John!"
    console.log(greet("John", "Hi")); // "Hi, John!"

// Kiểu hàm (Function Type):
    type MathOperation = (x: number, y: number) => number;
    let multiply: MathOperation = (a, b) => a * b;
    console.log(multiply(4, 5)); // 20

// Rest Parameters:
    function sum(...numbers: number[]): number {
        return numbers.reduce((total, num) => total + num, 0);
    }
    console.log(sum(1, 2, 3, 4)); // 10

// Overloading: Cho phép hàm xử lý nhiều kiểu tham số/trả về:
    function process(value: string): string;
    function process(value: number): number;
    function process(value: string | number): string | number {
    return typeof value === "string" ? value.toUpperCase() : value * 2;
    }
    console.log(process("hello")); // "HELLO"
    console.log(process(5)); // 10

// VD1: Xử lý sự kiện:
    type EventHandler = (event: { type: string; data: any }) => void;
    const handleClick: EventHandler = (event) => {
    console.log(`Event: ${event.type}, Data: ${event.data}`);
    };
    handleClick({ type: "click", data: { x: 10, y: 20 } });

// VD2: API Calls:
    async function fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        return response.json();
    }

// Dùng Type Guards trong hàm để xử lý union types:
    function logValue(value: string | number) {
        if (typeof value === "string") {
        console.log(value.toUpperCase());
        } else {
        console.log(value.toFixed(2));
        }
    }
    //Sử dụng void cho hàm không trả về giá trị để rõ ràng ý định.

// - Luôn khai báo kiểu trả về để TypeScript kiểm tra logic hàm.