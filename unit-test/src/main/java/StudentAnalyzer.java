import java.util.List;

public class StudentAnalyzer {
    public int countExcellentStudents(List<Double> scores) {
        // kiem tra danh sach rong
        if (scores == null || scores.isEmpty()) {
            return 0;
        }

        int count = 0;

        // kiem tra dieu kien (0-10) va >= 8.0
        for (Double score : scores) {
            if (score >= 0 && score <= 10 && score >= 8.0) {
                count++;
            }
        }

        return count;

    }
    
    public double calculateValidAverage(List<Double> scores) {
        // kiem tra danh sach rong
        if (scores == null || scores.isEmpty()) {
            return 0.0;
        }
        
        double sum = 0;
        int validCount = 0;
        
        // kiem tra dieu kien (0-10)
        for (Double score : scores) {
            if (score >= 0 && score <= 10) {
                sum += score;
                validCount += 1;
            }
        }

        // tra ve ket qua trung binh diem
        if (validCount==0){
            return 0.0;
        } else return sum/validCount;
    }
    
}