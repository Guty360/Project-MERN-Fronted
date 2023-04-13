import React, { useEffect, useState } from "react";
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { size, map } from "lodash";
import { Loader, Pagination } from "semantic-ui-react";
import { CourseItem } from "../CourseItem";
import "./ListCourses.scss";

const courseController = new Course();

export function ListCourses() {
  const [courses, setCourses] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState()
  const { accesToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses(accesToken, {
          page,
          limit: 5,
        });
        setCourses(response.docs);
        setPagination({
            limit: response.limit,
            page: response.page,
            pages: response.pages,
            total: response.total
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  const pageChange = (_,data) =>{
    setPage(data.activePage)
  }

  if (!courses) return <Loader active inline="centered" />;

  if (size(courses) === 0) return "No hay Ningún Curso";

  return (
    <div className="list-course">
      {map(courses, (course) => (
        <CourseItem key={course._id} course={course} />
      ))}
      <div className="list-course__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={pageChange}
        />
      </div>
    </div>
  );
}
