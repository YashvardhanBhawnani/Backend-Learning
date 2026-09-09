import express from "express";
import fs from "fs";
import courses from "./mock_student_course.json" with { type: "json" };

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// GET /api/courses
// POST /api/courses
app
  .route("/api/courses")
  .get((req, res) => {
    return res.status(200).json(courses);
  })
  .post((req, res) => {
    const body = req.body;
    courses.push({ id: courses.length + 1, ...body });
    fs.writeFile(
      "mock_student_course.json",
      JSON.stringify(courses),
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ status: "error", message: "Failed To Write To File" });
        }
        return res.json({ status: "success", id: courses.length });
      },
    );
  });

// GET /api/courses/:id/students
app.get("/api/courses/:id/students", (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find((course) => course.id === id);
  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }
  return res.status(200).json(course.enrolledStudents);
});

// POST /api/courses/:id/enroll
app.post("/api/courses/:id/enroll", (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  const course = courses.find((course) => course.id === id);
  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }
  const alreadyEnroll = course.enrolledStudents.some(
    (student) => student.email === email,
  );
  if (alreadyEnroll) {
    return res.status(409).json({
      message: "Student already enrolled in this course",
    });
  }
  course.enrolledStudents.push({ name, email });
  fs.writeFile(
    "mock_student_course.json",
    JSON.stringify(courses, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to update courses",
        });
      }
    },
  );
  res.status(201).json({
    message: "Student enrolled successfully",
    student: { name, email },
    enrolledStudents: courses.enrolledStudents,
  });
});

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}!`);
});
