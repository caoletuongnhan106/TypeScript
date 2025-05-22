// I. Generic
// 1. Generic Types (Kiểu Generic)
// - Cho phép định nghĩa các kiểu linh hoạt, nơi kiểu cụ thể được xác định khi sử dụng.
// - Nó thường áp dụng cho hàm, giao diện, hoặc kiểu tùy chỉnh.
    function print<T>(value: T): T {
        console.log(value);
        return value;
    }

    print<number>(42);      // Output: 42
    print<string>("Hello"); // Output: Hello
    // <T> là kiểu generic, đại diện cho bất kỳ kiểu nào. Khi gọi print, truyền kiểu cụ thể (number, string) để TypeScript kiểm tra.
    // Ứng dụng: Tạo các hàm hoặc kiểu tái sử dụng cho nhiều kiểu dữ liệu.

// 2. Generic Classes
// - Có thể sử dụng generic để làm việc với các kiểu dữ liệu khác nhau.
// - Cho phép lưu trữ và thao tác dữ liệu kiểu động.
    class Container<T> {
        private items: T[] = [];

        add(item: T): void {
            this.items.push(item);
        }

        get(index: number): T {
            return this.items[index];
        }
    }

    const numberContainer = new Container<number>();
    numberContainer.add(1);
    numberContainer.add(2);
    console.log(numberContainer.get(0)); // Output: 1

    const stringContainer = new Container<string>();
    stringContainer.add("Hello");
    stringContainer.add("World");
    console.log(stringContainer.get(1)); // Output: World
    // Lớp Container<T> sử dụng T để định nghĩa kiểu của items. 
    // Khi khởi tạo, bạn chỉ định kiểu cụ thể (number hoặc string), và TypeScript đảm bảo tính nhất quán.
    // Ứng dụng: Dùng để tạo các cấu trúc dữ liệu như danh sách, ngăn xếp (stack), hoặc hàng đợi (queue) với kiểu tùy chỉnh.

// 3. Generic Constraints (Ràng buộc Generic)
// - Giới hạn kiểu generic phải tuân theo một giao diện hoặc có các thuộc tính/chức năng nhất định bằng cách sử dụng extends.
    interface HasName {
        name: string;
    }

    function printName<T extends HasName>(item: T): void {
        console.log(item.name);
    }

    printName({ name: "Alice" }); // Output: Alice
    printName({ name: "Bob", age: 25 }); // Output: Bob
    printName(42); // Lỗi: Argument of type 'number' is not assignable to parameter of type 'HasName'
    // T extends HasName yêu cầu T phải có thuộc tính name. 
    // Điều này đảm bảo hàm printName chỉ làm việc với các đối tượng có thuộc tính name.
    // Ứng dụng: Kiểm soát chặt chẽ hơn khi làm việc với các kiểu phức tạp.

// 4. Using Type Parameters in Generic Constraints (Sử dụng tham số kiểu trong ràng buộc Generic)
// - Sử dụng một tham số generic để ràng buộc một tham số khác, tạo mối quan hệ giữa các kiểu.
    function copyFields<T, U extends T>(target: T, source: U): T {
        return { ...target, ...source };
    }

    const person = { name: "Alice" };
    const employee = copyFields(person, { age: 25, role: "Developer" });
    console.log(employee); // Output: { name: "Alice", age: 25, role: "Developer" }

    copyFields(person, { id: 1 }); // Lỗi: Type '{ id: number; }' is not assignable to type 'T'
    // U extends T yêu cầu U phải là một kiểu con của T, đảm bảo source có thể mở rộng target mà không mất dữ liệu.
    // Ứng dụng: Hữu ích khi sao chép hoặc mở rộng đối tượng với các thuộc tính bổ sung.

// Using Class Types in Generics (Sử dụng kiểu lớp trong Generics)
// - Sử dụng kiểu của một lớp làm generic để làm việc với các instance của lớp đó.
    class Animal {
        move() { console.log("Moving..."); }
    }

    class Dog extends Animal {
        bark() { console.log("Woof!"); }
    }

    function createInstance<T extends Animal>(ctor: new () => T): T {
        return new ctor();
    }

    const dog = createInstance(Dog);
    dog.move(); // Output: Moving...
    dog.bark(); // Output: Woof!
    // T extends Animal giới hạn T là một lớp kế thừa từ Animal. 
    // new () => T là kiểu của constructor không tham số trả về instance của T.
    // Ứng dụng: Tạo factory method để khởi tạo các đối tượng từ lớp con.

// 6. Generic Parameter Defaults (Tham số Generic mặc định)
// - Đặt giá trị mặc định cho tham số generic để sử dụng khi không chỉ định kiểu.
    function createDefault<T = string>(value: T = "default" as T): T {
        return value;
    }

    console.log(createDefault()); // Output: "default"
    console.log(createDefault<number>(42)); // Output: 42
    // Nếu không truyền kiểu, T mặc định là string, và giá trị mặc định là "default", có thể ghi đè bằng cách truyền kiểu khác (number).
    // Ứng dụng: Tiện lợi khi có kiểu mặc định hợp lý cho đa số trường hợp.

// 7. Variance Annotations (Ghi chú phương sai)
// Xử lý mối quan hệ giữa các kiểu generic liên quan đến kế thừa (subtyping), bao gồm covariance (phương sai thuận), contravariance (phương sai nghịch), và bivariance (phương sai hai chiều). 
// TypeScript sử dụng các từ khóa như in và out để điều chỉnh.
    interface Box<out T> {
        getValue(): T; // Chỉ xuất (out), covariance
    }

    interface Setter<in T> {
        setValue(value: T): void; // Chỉ nhập (in), contravariance
    }

    class Animal {}
    class Dog extends Animal {}

    let box: Box<Animal> = new Box<Dog>(); // Hợp lệ (covariance)
    box.getValue(); // OK, vì chỉ đọc

    let setter: Setter<Dog> = new Setter<Animal>(); // Hợp lệ (contravariance)
    setter.setValue(new Animal()); // OK, vì chỉ ghi
// out T: Chỉ cho phép sử dụng T để trả về (covariance), phù hợp với các phương thức như getValue.
// in T: Chỉ cho phép sử dụng T làm tham số (contravariance), phù hợp với các phương thức như setValue.
// Không dùng in/out: Mặc định là bivariance (cả hai chiều), nhưng có thể gây lỗi nếu không cẩn thận.

// II. Keyof Type Operator
// - keyof trích xuất tất cả các key (tên thuộc tính) của một kiểu dưới dạng một union type.
    interface User {
        id: number;
        name: string;
        age: number;
    }

    type UserKeys = keyof User; // "id" | "name" | "age"

    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }

    const user: User = { id: 1, name: "Alice", age: 25 };
    console.log(getProperty(user, "name")); // Output: "Alice"
    // keyof User tạo ra kiểu "id" | "name" | "age". Khi kết hợp với generic K extends keyof T, nó đảm bảo key chỉ nhận các giá trị hợp lệ của T.
    // Ứng dụng: Kiểm soát truy cập thuộc tính động, xây dựng utility type như Pick.

// III. Typeof Type Operator (Toán tử Typeof)
// - typeof lấy kiểu của một giá trị tại thời điểm chạy và chuyển thành kiểu TypeScript để sử dụng trong khai báo kiểu.
    const point = { x: 10, y: 20 };
    type PointType = typeof point; // { x: number; y: number }

    function printPoint(p: PointType) {
        console.log(`x: ${p.x}, y: ${p.y}`);
    }

    printPoint({ x: 5, y: 15 }); // Output: x: 5, y: 15
    // typeof point suy ra kiểu của biến point và gán cho PointType. 
    // Điều này hữu ích khi muốn tái sử dụng kiểu từ một đối tượng đã định nghĩa.
    // Ứng dụng: Sao chép kiểu từ giá trị hiện có, đặc biệt trong khai báo biến hoặc hàm.

// IV. Indexed Access Types (Kiểu truy cập chỉ số)
// - Cho phép truy cập kiểu của một thuộc tính cụ thể trong một kiểu bằng cách sử dụng cú pháp T[K], trong đó K là một key hợp lệ của T.
    interface User {
        id: number;
        name: string;
        age: number;
    }

    type UserId = User["id"]; // number
    type UserName = User["name"]; // string

    function getId(u: User): UserId {
        return u.id;
    }

    console.log(getId({ id: 1, name: "Alice", age: 25 })); // Output: 1
    // User["id"] lấy kiểu của thuộc tính id (là number)