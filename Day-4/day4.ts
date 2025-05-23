// I. Conditional Types
// - Cho phép định nghĩa một kiểu dựa trên điều kiện, dựa vào mối quan hệ giữa các kiểu. 
// - Nó thường được dùng để xử lý các tình huống phức tạp như suy ra kiểu trả về của hàm hoặc lọc kiểu.
// *Cú pháp: T extends U ? X : Y
// - Nếu T mở rộng (extends) U, kết quả là X.
// - Nếu không, kết quả là Y.
    type CheckType<T> = T extends string ? "String" : "Other";

    let result1: CheckType<string> = "String"; // Hợp lệ
    let result2: CheckType<number> = "Other";  // Hợp lệ
    // Nếu T là string, kết quả là "String"; nếu không, kết quả là "Other".

// 1. Conditional Type Constraints (Ràng buộc Kiểu Có Điều Kiện)
// Ràng buộc trong Conditional Types sử dụng extends để giới hạn kiểu T phải thỏa mãn một điều kiện nhất định trước khi áp dụng logic kiểu. 
// Điều này giúp kiểm soát chặt chẽ hơn khi làm việc với các kiểu generic.
    type ConstrainToString<T> = T extends string ? T : never;

    type StringResult = ConstrainToString<string>; // string
    type NumberResult = ConstrainToString<number>; // never
    // T extends string yêu cầu T phải là string, nếu không, kết quả là never.
    // Điều này giới hạn Conditional Type chỉ hoạt động với các kiểu thỏa mãn ràng buộc.

// VD2: Phức tạp hơn:
    interface HasId {
        id: number;
    }

    type ExtractId<T> = T extends HasId ? T["id"] : never;

    interface User {
        id: number;
        name: string;
    }

    interface Product {
        code: string;
    }

    type UserId = ExtractId<User>;    // number
    type ProductId = ExtractId<Product>; // never
//Giải thích: T extends HasId đảm bảo T phải có thuộc tính id, và T["id"] lấy kiểu của id (là number) nếu điều kiện đúng.

// 2. Inferring Within Conditional Types (Suy Ra Trong Kiểu Có Điều Kiện)
// - Sử dụng từ khóa infer để suy ra một kiểu mới trong quá trình xử lý Conditional Types. 
// - Điều này rất hữu ích khi bạn cần trích xuất kiểu trả về của hàm, kiểu phần tử của mảng, hoặc kiểu lồng nhau.
    type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

    function getName(): string {
        return "Alice";
    }

    function getAge(): number {
        return 25;
    }

    type NameType = GetReturnType<typeof getName>; // string
    type AgeType = GetReturnType<typeof getAge>;   // number
    type NotFunction = GetReturnType<number>;      // never
// - infer R suy ra kiểu trả về (R) của hàm T.
// - Nếu T không phải là hàm, kết quả là never.

// 3. Distributive Conditional Types (Kiểu Có Điều Kiện Phân Phối)
// - Khi T là một Union Type, Conditional Types tự động phân phối (distribute) qua từng phần tử của union, áp dụng logic điều kiện cho mỗi phần tử riêng lẻ. 
// - Điều này tạo ra một union mới dựa trên kết quả của từng phần tử.
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>; // string[] | number[]
// - T extends any ? T[] : never được áp dụng cho từng phần tử của string | number.
// - Kết quả là string[] | number[], vì mỗi phần tử (string và number) được chuyển thành mảng tương ứng.

// II. Mapped Types
// - Cho phép tạo một kiểu mới bằng cách lặp qua các key của một kiểu hiện có (thường dùng keyof) và áp dụng một biến đổi cho từng thuộc tính.
// * Cú pháp: { [P in keyof T]: NewType }
// P là biến lặp qua từng key của T.
// keyof T trả về union của các key của T.
// NewType là kiểu mới được áp dụng cho từng thuộc tính.
    interface User {
        id: number;
        name: string;
        age: number;
    }

    type ReadonlyUser = { readonly [P in keyof User]: User[P] };

    const user: ReadonlyUser = { id: 1, name: "Alice", age: 25 };
    user.id = 2; // Lỗi: Cannot assign to 'id' because it is a read-only property
    //Giải thích: readonly [P in keyof User]: User[P] ánh xạ qua từng key (id, name, age) và giữ nguyên kiểu gốc (User[P]), nhưng thêm readonly.

// 1. Mapping Modifiers (Bộ sửa đổi ánh xạ)
// - Cho phép điều chỉnh các thuộc tính của một kiểu trong quá trình ánh xạ, sử dụng các toán tử như + (thêm), - (loại bỏ) để thay đổi tính chất của thuộc tính (ví dụ: readonly, optional).
// * Cú pháp:
// +?: Thêm tính chất tùy chọn (optional).
// -?: Loại bỏ tính chất tùy chọn (required).
// +readonly: Thêm tính chất chỉ đọc.
// -readonly: Loại bỏ tính chất chỉ đọc (nếu có).
    interface User {
        id: number;
        name?: string;
    }

    // Thêm readonly và loại bỏ optional
    type ModifiedUser = { [P in keyof User]-?: { readonly [K in P]: User[P] } };

    const user: ModifiedUser = { id: 1, name: "Alice" };
    user.id = 2; // Lỗi: Cannot assign to 'id' because it is a read-only property
    user.name = "Bob"; // Lỗi: Cannot assign to 'name' because it is a read-only property
    //-? loại bỏ tính chất tùy chọn của name, làm cho nó trở thành bắt buộc.
    // readonly [K in P] thêm tính chất chỉ đọc cho tất cả thuộc tính.
// Ứng dụng: Tạo các biến thể của kiểu với các thuộc tính được kiểm soát chặt chẽ hơn.

// 2. Key Remapping via as (Ánh xạ lại key qua as)
// - sử dụng từ khóa as trong Mapped Types để ánh xạ lại (remap) tên của các key, thay vì giữ nguyên tên gốc. 
// - Điều này cho phép thay đổi hoặc biến đổi tên key dựa trên logic tùy chỉnh.
// * Cú pháp: { [P in keyof T as NewKey]: T[P] }
// - P in keyof T lặp qua các key.
// - as NewKey ánh xạ key P thành một tên mới (NewKey).
    interface User {
        id: number;
        name: string;
    }

    type PrefixedUser = { [P in keyof User as `prefix_${P}`]: User[P] };

    const prefixedUser: PrefixedUser = {
        prefix_id: 1,
        prefix_name: "Alice"
    };
    // - prefix_${P} thêm tiền tố "prefix_" cho mỗi key (id thành prefix_id, name thành prefix_name).
    // - Kiểu mới chỉ chứa các key đã được ánh xạ lại.

// Ví dụ với điều kiện
    type FilterAndRemap<T> = {
        [P in keyof T as T[P] extends string ? P : never]: T[P];
    };

    interface Person {
        name: string;
        age: number;
        city: string;
    }

    type StringProps = FilterAndRemap<Person>;
    const stringProps: StringProps = { name: "Alice", city: "Hanoi" }; // Hợp lệ
    // - as T[P] extends string ? P : never giữ lại key nếu kiểu của thuộc tính là string, loại bỏ các key khác (như age).
    // - Kết quả chỉ chứa name và city.

// Lưu ý về Key Remapping
// - Nếu ánh xạ tạo ra never cho một key, key đó sẽ bị loại bỏ khỏi kiểu cuối cùng.
// - Có thể kết hợp as với Template Literal Types để tạo tên key động:
    type SuffixUser = { [P in keyof User as `${P}_suffix`]: User[P] };
    const suffixUser: SuffixUser = { id_suffix: 1, name_suffix: "Alice" };

// 3. Further Exploration (Khám phá thêm)
// -  Mapped Types có nhiều ứng dụng nâng cao và có thể kết hợp với các tính năng khác của TypeScript để tạo ra các kiểu phức tạp

// a) Kết hợp với Conditional Types: Tạo một kiểu chỉ chứa các thuộc tính có giá trị không phải null hoặc undefined:
    type NonNullableProperties<T> = {
        [P in keyof T as T[P] extends null | undefined ? never : P]: T[P];
    };

    interface Data {
        id: number;
        name: string;
        optional?: string | null;
    }

    type CleanData = NonNullableProperties<Data>;
    const clean: CleanData = { id: 1, name: "Alice" }; // Hợp lệ, optional bị loại
    // Giải thích: as T[P] extends null | undefined ? never : P loại bỏ các thuộc tính có thể là null hoặc undefined.

// b) Tạo kiểu lồng nhau (Nested Mapped Types): Biến đổi tất cả thuộc tính của một đối tượng lồng nhau thành readonly
    type DeepReadonly<T> = {
        readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
    };

    interface Nested {
        id: number;
        details: {
            name: string;
            age: number;
        };
    }

    type ReadonlyNested = DeepReadonly<Nested>;
    const nested: ReadonlyNested = { id: 1, details: { name: "Alice", age: 25 } };
    nested.details.name = "Bob"; // Lỗi: Cannot assign to 'name' because it is a read-only property
    // Giải thích: T[P] extends object ? DeepReadonly<T[P]> : T[P] đệ quy qua các thuộc tính lồng nhau.

// Lưu ý quan trọng:
// - Hiệu suất: Mapped Types chỉ hoạt động tại thời gian biên dịch, không ảnh hưởng runtime.
// - Giới hạn: Chỉ ánh xạ qua key cấp đầu tiên; để xử lý lồng nhau, cần dùng đệ quy như DeepReadonly.
// - Kết hợp: Thường dùng với keyof, Conditional Types, và Template Literal Types để tăng tính linh hoạt.
// - Tránh lạm dụng: Quá nhiều biến đổi có thể làm code khó đọc, nên cân nhắc sử dụng utility type có sẵn (như Partial, Readonly) nếu phù hợp.

// III. Template Literal Types
// - Cho phép định nghĩa kiểu chuỗi bằng cách sử dụng cú pháp template literals (${}).
// - Kết hợp các Literal Types (kiểu nguyên văn) hoặc Union Types để tạo ra các kiểu chuỗi mới.
// * Cú pháp: `prefix-${T}`
// - T là một kiểu (thường là Literal Type hoặc Union Type).
// - Kết quả là một kiểu chuỗi động dựa trên giá trị của T.
    type Color = "red" | "blue";
    type ColorPrefix = `prefix-${Color}`; // "prefix-red" | "prefix-blue"

    let color1: ColorPrefix = "prefix-red"; // Hợp lệ
    let color2: ColorPrefix = "prefix-blue"; // Hợp lệ
    let color3: ColorPrefix = "prefix-green"; // Lỗi: Type '"prefix-green"' is not assignable to type '"prefix-red" | "prefix-blue"'
// Giải thích: prefix-${Color} tạo ra một Union Type gồm các chuỗi có tiền tố "prefix-" và phần hậu tố là "red" hoặc "blue".

// 1. String Unions in Types (Union Chuỗi trong Kiểu)
// - Template Literal Types thường được sử dụng với Union Types để tạo ra các kiểu chuỗi kết hợp từ nhiều giá trị chuỗi. 
// - Khi kết hợp một Union Type trong Template Literal, TypeScript sẽ tự động phân phối (distribute) và tạo ra tất cả các tổ hợp chuỗi có thể.
    type Size = "small" | "medium" | "large";
    type Color = "red" | "blue";
    type Item = `${Size}-${Color}`;

    let item1: Item = "small-red"; // Hợp lệ
    let item2: Item = "large-blue"; // Hợp lệ
    let item3: Item = "tiny-red"; // Lỗi: Type '"tiny-red"' is not assignable to type '"small-red" | "small-blue" | "medium-red" | "medium-blue" | "large-red" | "large-blue"'
 
// VD thực tế: Tạo kiểu cho tên sự kiện trong ứng dụng
    type EventType = "click" | "hover" | "focus";
    type EventHandler = `on${EventType}`;

    const handlers: Record<EventHandler, () => void> = {
        onClick: () => console.log("Clicked"),
        onHover: () => console.log("Hovered"),
        onFocus: () => console.log("Focused")
    };
    //Giải thích: on${EventType} tạo ra "onClick" | "onHover" | "onFocus", đảm bảo chỉ các sự kiện hợp lệ được sử dụng.

// 2. Inferring with Template Literals (Suy Ra với Template Literals)
// - Sử dụng từ khóa infer trong Template Literal Types để suy ra một phần của chuỗi.
// - Thường dùng để trích xuất tiền tố, hậu tố hoặc phần giữa của chuỗi.
    type ExtractSuffix<T> = T extends `prefix-${infer Suffix}` ? Suffix : never;

    type Suffix1 = ExtractSuffix<"prefix-red">; // "red"
    type Suffix2 = ExtractSuffix<"prefix-blue">; // "blue"
    type Suffix3 = ExtractSuffix<"suffix-red">; // never
    // - T extends prefix-${infer Suffix}`` kiểm tra xem T có bắt đầu bằng "prefix-" không.
    // - Nếu đúng, infer Suffix suy ra phần còn lại ("red", "blue"), nếu không, trả về never.

// 3. Intrinsic String Manipulation Types (Các Kiểu Thao tác Chuỗi Nội tại)
// - TypeScript cung cấp các utility type tích hợp để thao tác chuỗi tại thời gian biên dịch, bao gồm Uppercase, Lowercase, Capitalize, và Uncapitalize.
// - Chúng thường được dùng với Template Literal Types để biến đổi chuỗi.
// * Danh sách:
// Uppercase<StringType>: Chuyển chuỗi thành chữ hoa.
// Lowercase<StringType>: Chuyển chuỗi thành chữ thường.
// Capitalize<StringType>: Viết hoa chữ cái đầu, phần còn lại giữ nguyên.
// Uncapitalize<StringType>: Viết thường chữ cái đầu, phần còn lại giữ nguyên.

// a) Uppercase
    type Action = "get" | "set";
    type UpperAction = Uppercase<Action>; // "GET" | "SET"

    let action: UpperAction = "GET"; // Hợp lệ
    //Giải thích: Uppercase chuyển "get" thành "GET", "set" thành "SET".

// b) Lowercase
        type UpperAction = "GET" | "SET";
        type LowerAction = Lowercase<UpperAction>; // "get" | "set"

        let action: LowerAction = "get"; // Hợp lệ
        // Giải thích: Lowercase chuyển "GET" thành "get", "SET" thành "set".

// c) Capitalize
    type Event = "click" | "hover";
    type CapitalizedEvent = Capitalize<Event>; // "Click" | "Hover"

    type EventHandler = `on${CapitalizedEvent}`;
    let handler: EventHandler = "onClick"; // Hợp lệ
    // Giải thích: Capitalize viết hoa chữ cái đầu: "click" thành "Click", "hover" thành "Hover".

// d) Uncapitalize
    type CapitalizedEvent = "Click" | "Hover";
    type UncapitalizedEvent = Uncapitalize<CapitalizedEvent>; // "click" | "hover"

    let event: UncapitalizedEvent = "click"; // Hợp lệ
    // Giải thích: Uncapitalize viết thường chữ cái đầu: "Click" thành "click", "Hover" thành "hover".
    
// * Lưu ý quan trọng
// Phân phối: Template Literal Types tự động phân phối qua Union Types, tạo ra tất cả tổ hợp có thể.
// Hiệu suất: Chỉ hoạt động tại thời gian biên dịch, không ảnh hưởng runtime.
// Kết hợp: Thường dùng với Mapped Types, Conditional Types, và infer để tạo kiểu phức tạp.
// Giới hạn: Intrinsic String Manipulation Types chỉ áp dụng cho Literal Types, không hoạt động với kiểu string chung.