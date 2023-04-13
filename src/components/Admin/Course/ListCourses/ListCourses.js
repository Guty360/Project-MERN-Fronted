import React, { useEffect, useState } from "react";
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { size, map } from "lodash";
import { Loader } from "semantic-ui-react";
import { CourseItem } from "../CourseItem";

const courseController = new Course();

export function ListCourses() {
  const [courses, setCourses] = useState(false);
  const { accesToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses(accesToken);
        setCourses(response.docs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!courses) return <Loader active inline="centered" />;

  if (size(courses) === 0) return "No hay Ningún Curso";

  return (
    <div>
      {map(courses, (course) => (
        <CourseItem key={course._id} course={course} />
      ))}
    </div>
  );
}
