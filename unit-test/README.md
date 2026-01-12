# Unit Test Practice with JUnit - Student Analyzer

## Mô tả bài toán

Dự án này thực hành viết kiểm thử đơn vị (Unit Test) sử dụng JUnit 5 cho chương trình phân tích điểm số học sinh.

### Chức năng chính

Lớp `StudentAnalyzer` cung cấp 2 phương thức:

1. **`countExcellentStudents(List<Double> scores)`**
   - Đếm số lượng học sinh đạt loại Giỏi (điểm >= 8.0)
   - Bỏ qua các điểm không hợp lệ (< 0 hoặc > 10)
   - Trả về 0 nếu danh sách rỗng hoặc null

2. **`calculateValidAverage(List<Double> scores)`**
   - Tính điểm trung bình của các điểm hợp lệ (khác 0-10)
   - Bỏ qua các điểm không hợp lệ
   - Trả về 0.0 nếu danh sách rỗng, null hoặc không có điểm hợp lệ nào

### Quy tắc xử lý điểm

| Điều kiện | Xử lý |
|-----------|-------|
| Điểm < 0 | Bỏ qua (dữ liệu sai) |
| Điểm > 10 | Bỏ qua (dữ liệu sai) |
| 0 <= Điểm <= 10 | Hợp lệ |
| Danh sách rỗng/null | Trả về giá trị mặc định |

## Cấu trúc dự án

```
unit-test/
├── pom.xml                          # Maven project configuration
├── src/
│   ├── main/
│   │   └── java/
│   │       └── StudentAnalyzer.java     # Class chứa các phương thức cần test
│   └── test/
│       └── java/
│           └── StudentAnalyzerTest.java # Class chứa các test case
└── README.md
```

## Yêu cầu hệ thống

- **Java**: JDK 17 trở lên
- **Maven**: 3.6+ (để quản lý dependencies và chạy test)
- **JUnit**: 5.10.0

## Cách cài đặt và chạy

### 1. Cài đặt dependencies

```bash
# Tại thư mục unit-test
cd unit-test
mvn clean install
```

### 2. Chạy toàn bộ test

```bash
# Chạy tất cả test cases
mvn test

# Hoặc dùng Maven Surefire plugin
mvn surefire:test
```

### 3. Chạy một test cụ thể

```bash
# Chạy test cụ thể cho phương thức countExcellentStudents
mvn test -Dtest=StudentAnalyzerTest#testCountExcellentStudents_NormalCase

# Chạy test cụ thể cho phương thức calculateValidAverage
mvn test -Dtest=StudentAnalyzerTest#testCalculateValidAverage_NormalCase
```

### 4. Xem báo cáo test

```bash
# Tạo báo cáo HTML
mvn surefire-report:report

# Báo cáo sẽ được tạo tại: target/site/surefire-report.html
```

## Kết quả test mong đợi

Dự án bao gồm **17 test cases**:

### Test cases cho `countExcellentStudents()` (8 tests)

| Test case | Mô tả | Kết quả mong đợi |
|-----------|-------|------------------|
| `testCountExcellentStudents_NormalCase` | Danh sách có điểm hợp lệ và không hợp lệ | 2 |
| `testCountExcellentStudents_AllValid` | Danh sách toàn bộ hợp lệ | 4 |
| `testCountExcellentStudents_EmptyList` | Danh sách rỗng | 0 |
| `testCountExcellentStudents_NullList` | Danh sách null | 0 |
| `testCountExcellentStudents_AllInvalid` | Danh sách toàn điểm không hợp lệ | 0 |
| `testCountExcellentStudents_Boundary_8` | Giá trị biên 8.0 | 1 |
| `testCountExcellentStudents_Boundary_0And10` | Giá trị biên 0 và 10 | 2 |
| `testCountExcellentStudents_NoExcellentStudents` | Không có học sinh giỏi | 0 |

### Test cases cho `calculateValidAverage()` (9 tests)

| Test case | Mô tả | Kết quả mong đợi |
|-----------|-------|------------------|
| `testCalculateValidAverage_NormalCase` | Danh sách có điểm hợp lệ và không hợp lệ | 8.17 |
| `testCalculateValidAverage_AllValid` | Danh sách toàn bộ hợp lệ | 7.5 |
| `testCalculateValidAverage_EmptyList` | Danh sách rỗng | 0.0 |
| `testCalculateValidAverage_NullList` | Danh sách null | 0.0 |
| `testCalculateValidAverage_AllInvalid` | Danh sách toàn điểm không hợp lệ | 0.0 |
| `testCalculateValidAverage_Boundary_0` | Giá trị biên 0 | 5.0 |
| `testCalculateValidAverage_Boundary_10` | Giá trị biên 10 | 10.0 |
| `testCalculateValidAverage_DecimalPrecision` | Kiểm tra độ chính xác số thập phân | 8.333 |
| `testCalculateValidAverage_SingleValidScore` | Chỉ có một điểm hợp lệ | 8.5 |

## Ví dụ kết quả test khi chạy

```
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running StudentAnalyzerTest
[INFO] Tests run: 17, Failures: 0, Errors: 0, Skipped: 0
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

## Mục tiêu học tập

Thông qua bài tập này, sinh viên sẽ học được:

1. **Viết Unit Test**: Sử dụng JUnit 5 để viết test case
2. **Phân tích test case**: Xác định các trường hợp bình thường, biên, ngoại lệ
3. **Assertion**: Sử dụng `assertEquals()` và các phương thức assertion khác
4. **Quản lý project**: Sử dụng Maven để quản lý dependencies và chạy test
5. **TDD (Test-Driven Development)**: Tư duy viết test trước khi viết code

## Lịch sử phát triển

- **Issue #1**: Viết hàm `countExcellentStudents()`
- **Issue #2**: Viết hàm `calculateValidAverage()`
- **Issue #3**: Viết test cho 2 hàm trên
- **Issue #4**: Viết tài liệu README.md

## Tài liệu tham khảo

- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [Maven Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/)
- [Unit Testing Best Practices](https://martinfowler.com/bliki/UnitTest.html)
