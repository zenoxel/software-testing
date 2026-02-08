# JMeter Performance Testing - Wikipedia.org

## Mục tiêu

- Hiểu cách sử dụng JMeter để thực hiện kiểm thử hiệu năng
- Thiết kế kịch bản kiểm thử với các tham số khác nhau
- Phân tích kết quả kiểm thử và viết báo cáo

## Trang web kiểm thử

- **URL**: <https://www.wikipedia.org>
- **Loại**: Website bách khoa toàn thư công cộng
- **Lý do chọn**: Website ổn định, không chặn bot requests (tuy vẫn có rate limiting)

## Kịch bản kiểm thử

### Thread Group 1: Kịch bản cơ bản

**Mục tiêu**: Kiểm tra hiệu năng cơ bản với tải nhẹ

| Tham số                       | Giá trị     |
| ----------------------------- | ----------- |
| Số lượng người dùng (Threads) | 10          |
| Ramp-up Period                | 1 giây      |
| Loop Count                    | 5 lần lặp   |
| Tổng requests                 | 50 requests |

**Hành vi người dùng**:

- Gửi HTTP GET request đến trang chủ: `https://www.wikipedia.org/`

**Kết quả mong đợi**:

- Response time < 1000ms
- Error rate = 0%
- Throughput ~10-20 requests/sec

---

### Thread Group 2: Kịch bản tải nặng

**Mục tiêu**: Kiểm tra hiệu năng với tải trung bình

| Tham số                       | Giá trị      |
| ----------------------------- | ------------ |
| Số lượng người dùng (Threads) | 50           |
| Ramp-up Period                | 30 giây      |
| Loop Count                    | 3 lần lặp    |
| Tổng requests                 | 150 requests |

**Hành vi người dùng**:

1. GET request đến trang chủ: `https://www.wikipedia.org/`
2. GET request đến trang bài viết ngẫu nhiên: `https://www.wikipedia.org/wiki/Special:Random`

**Kết quả mong đợi**:

- Response time < 2000ms
- Error rate < 1%
- Throughput ~5-10 requests/sec

---

### Thread Group 3: Kịch bản tùy chỉnh

**Mục tiêu**: Kiểm tra hiệu năng với tải trong thời gian dài

| Tham số                       | Giá trị                          |
| ----------------------------- | -------------------------------- |
| Số lượng người dùng (Threads) | 20                               |
| Ramp-up Period                | 10 giây                          |
| Duration                      | 60 giây                          |
| Loop Count                    | Vô hạn (điều khiển bởi Duration) |

**Hành vi người dùng**:

1. GET request đến trang About: `https://www.wikipedia.org/wiki/Wikipedia:About`
2. GET request đến trang Contact: `https://www.wikipedia.org/wiki/Wikipedia:Contact_us`

**Kết quả mong đợi**:

- Response time < 1500ms
- Error rate < 2%
- Throughput ~15-20 requests/sec
- Không có degradation về hiệu năng theo thời gian

---

## Cấu hình JMeter

### HTTP Request Defaults

- **Server**: <www.wikipedia.org>
- **Protocol**: https
- **Port**: 443 (default HTTPS)

### Listeners

1. **Summary Report**: Lưu kết quả vào file `results/summary_report.csv`
2. **View Results Tree**: Xem chi tiết từng request

---

## Cách chạy test

### Cài đặt JMeter

```bash
# Download JMeter
wget https://downloads.apache.org//jmeter/binaries/apache-jmeter-5.6.3.tgz

# Giải nén
tar -xzf apache-jmeter-5.6.3.tgz

# Chạy JMeter GUI
cd apache-jmeter-5.6.3/bin
./jmeter
```

### Chạy test

#### Chế độ GUI (để debug)

```bash
cd apache-jmeter-5.6.3/bin
./jmeter -t /path/to/wikipedia-performance-test.jmx
```

#### Chế độ CLI (để chạy test thực tế)

```bash
cd apache-jmeter-5.6.3/bin
./jmeter -n -t /path/to/wikipedia-performance-test.jmx -l results/test_results.jtl -e -o results/html_report/
```

Tham số:

- `-n`: Chạy chế độ non-GUI
- `-t`: File test plan (.jmx)
- `-l`: File log kết quả
- `-e`: Tạo report HTML sau khi test
- `-o`: Thư mục output cho report HTML

---

## Kết quả kiểm thử

**Tổng quan**: Test đã chạy thành công với tổng số 11,621 requests. Success rate: 98%. Errors chủ yếu là 429 (Too Many Requests) do Wikipedia rate limiting.

### Thread Group 1: Kịch bản cơ bản

| Chỉ số                     | Giá trị  |
| -------------------------- | -------- |
| Response Time (trung bình) | 269 ms   |
| Min Response Time          | 69 ms    |
| Max Response Time          | 1,873 ms |
| 90% Line                   | 521 ms   |
| 95% Line                   | 680 ms   |
| 99% Line                   | 1,709 ms |
| Total Requests             | 200      |
| Error Rate                 | 0%       |

**Nhận xét**: Kịch bản cơ bản hoạt động tốt với response time trung bình 269ms, không có lỗi. Wikipedia xử lý tốt tải nhẹ với 10 users đồng thời.

---

### Thread Group 2: Kịch bản tải nặng

| Chỉ số                     | Giá trị                                      |
| -------------------------- | -------------------------------------------- |
| Response Time (trung bình) | 343 ms                                       |
| Total Requests             | 728                                          |
| Error Rate                 | < 1%                                         |
| Response Codes             | 200 (OK), 301 (Redirect), 429 (Rate Limited) |

**Nhận xét**: Với 50 users ramp-up trong 30s, response time tăng nhẹ (343ms trung bình). Một số requests bị 429 do rate limiting của Wikipedia nhưng vẫn trong mức chấp nhận được (< 1%).

---

### Thread Group 3: Kịch bản tùy chỉnh

| Chỉ số                     | Giá trị  |
| -------------------------- | -------- |
| Response Time (trung bình) | 203 ms   |
| Min Response Time          | 43 ms    |
| Max Response Time          | 9,955 ms |
| 90% Line                   | 354 ms   |
| 95% Line                   | 462 ms   |
| 99% Line                   | 913 ms   |
| Total Requests             | 10,893   |
| Error Rate                 | ~2%      |

**Nhận xét**: Kịch bản chạy 60s với 20 users, đạt throughput tốt. Response time trung bình thấp (203ms) nhưng có outliers lớn (9,955ms) do network latency. Error rate ~2% chủ yếu từ 429 responses.

---

## Minh chứng

- File JMeter: [wikipedia-performance-test.jmx](wikipedia-performance-test.jmx)
- Kết quả CSV: [results/summary_report.csv](results/summary_report.csv)
- HTML Report: [results/html_report/](results/html_report/)
- Video demo: [jmeter.mp4](jmeter.mp4)

---

## Tổng kết

### Kết luận

Wikipedia.org thể hiện hiệu năng tốt với các chỉ số:

- **Response time**: Trung bình 200-350ms, acceptable cho E2E requests
- **Success rate**: 98% (2% errors chủ yếu do rate limiting)
- **Scalability**: Xử lý tốt từ 10 → 50 → 20 users
- **Stability**: Không có degradation rõ rệt theo thời gian

### Bài học kinh nghiệm

1. **User-Agent header là bắt buộc** khi test public websites để tránh bị 403 Forbidden
2. **Rate limiting là bình thường** với public APIs - cần thiết lập realistic expectations
3. **Outliers có thể lớn** (9,955ms) do network latency, không phản ánh server performance thực tế
4. **JMeter GUI tốt cho debug**, nhưng CLI mode nên dùng cho production tests (tiết kiệm tài nguyên)

---

## Lưu ý

- **KHÔNG** gửi quá nhiều requests để tránh bị rate limiting bởi Wikipedia
- Wikipedia có thể chặn IP nếu phát hiện traffic bất thường (DDoS-like)
- Nên chạy test vào giờ thấp điểm để tránh ảnh hưởng đến người dùng thực
- Tôn trọng chính sách sử dụng của Wikipedia

---

## Tài liệu tham khảo

- [Apache JMeter User Manual](https://jmeter.apache.org/usermanual/index.html)
- [JMeter Performance Testing Best Practices](https://www.blazemeter.com/blog/jmeter-performance-testing)
