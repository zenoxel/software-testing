import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class StudentAnalyzerTest {

    @Test
    public void testCountExcellentStudents_NormalCase() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Danh sách có điểm hợp lệ và không hợp lệ
        List<Double> scores = Arrays.asList(9.0, 8.5, 7.0, 11.0, -1.0);
        assertEquals(2, analyzer.countExcellentStudents(scores));
    }

    @Test
    public void testCountExcellentStudents_AllValid() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Danh sách toàn bộ hợp lệ
        List<Double> scores = Arrays.asList(8.0, 8.5, 9.0, 10.0);
        assertEquals(4, analyzer.countExcellentStudents(scores));
    }

    @Test
    public void testCountExcellentStudents_EmptyList() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Danh sách rỗng
        assertEquals(0, analyzer.countExcellentStudents(Collections.emptyList()));
    }

    @Test
    public void testCountExcellentStudents_NullList() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Danh sách null
        assertEquals(0, analyzer.countExcellentStudents(null));
    }

    @Test
    public void testCountExcellentStudents_AllInvalid() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Danh sách toàn điểm không hợp lệ
        List<Double> scores = Arrays.asList(-5.0, -1.0, 11.0, 15.0);
        assertEquals(0, analyzer.countExcellentStudents(scores));
    }

    @Test
    public void testCountExcellentStudents_Boundary_8() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Giá trị biên 8.0 (đạt giỏi)
        List<Double> scores = Arrays.asList(8.0, 7.9);
        assertEquals(1, analyzer.countExcellentStudents(scores));
    }

    @Test
    public void testCountExcellentStudents_Boundary_0And10() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Giá trị biên 0 và 10
        List<Double> scores = Arrays.asList(0.0, 10.0, 5.0, 8.5);
        assertEquals(2, analyzer.countExcellentStudents(scores));
    }

    @Test
    public void testCountExcellentStudents_NoExcellentStudents() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Không có học sinh giỏi
        List<Double> scores = Arrays.asList(5.0, 6.5, 7.9, 7.5);
        assertEquals(0, analyzer.countExcellentStudents(scores));
    }

    @Test
    public void testCalculateValidAverage_NormalCase() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Danh sách có điểm hợp lệ và không hợp lệ
        List<Double> scores = Arrays.asList(9.0, 8.5, 7.0, 11.0, -1.0);
        assertEquals(8.17, analyzer.calculateValidAverage(scores), 0.01);
    }

    @Test
    public void testCalculateValidAverage_AllValid() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Danh sách toàn bộ hợp lệ
        List<Double> scores = Arrays.asList(5.0, 7.5, 10.0);
        assertEquals(7.5, analyzer.calculateValidAverage(scores), 0.001);
    }

    @Test
    public void testCalculateValidAverage_EmptyList() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Danh sách rỗng
        assertEquals(0.0, analyzer.calculateValidAverage(Collections.emptyList()), 0.001);
    }

    @Test
    public void testCalculateValidAverage_NullList() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Danh sách null
        assertEquals(0.0, analyzer.calculateValidAverage(null), 0.001);
    }

    @Test
    public void testCalculateValidAverage_AllInvalid() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Danh sách toàn điểm không hợp lệ
        List<Double> scores = Arrays.asList(-5.0, -1.0, 11.0, 15.0);
        assertEquals(0.0, analyzer.calculateValidAverage(scores), 0.001);
    }

    @Test
    public void testCalculateValidAverage_Boundary_0() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Giá trị biên 0
        List<Double> scores = Arrays.asList(0.0, 5.0, 10.0);
        assertEquals(5.0, analyzer.calculateValidAverage(scores), 0.001);
    }

    @Test
    public void testCalculateValidAverage_Boundary_10() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Giá trị biên 10
        List<Double> scores = Arrays.asList(10.0, 10.0, 10.0);
        assertEquals(10.0, analyzer.calculateValidAverage(scores), 0.001);
    }

    @Test
    public void testCalculateValidAverage_DecimalPrecision() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Kiểm tra độ chính xác số thập phân
        List<Double> scores = Arrays.asList(8.33, 7.67, 9.0);
        // (8.33 + 7.67 + 9.0) / 3 = 25.0 / 3 = 8.333...
        assertEquals(8.333, analyzer.calculateValidAverage(scores), 0.001);
    }

    @Test
    public void testCalculateValidAverage_SingleValidScore() {
        StudentAnalyzer analyzer = new StudentAnalyzer();
        // Chỉ có một điểm hợp lệ
        List<Double> scores = Arrays.asList(8.5, -5.0, 15.0);
        assertEquals(8.5, analyzer.calculateValidAverage(scores), 0.001);
    }
}
