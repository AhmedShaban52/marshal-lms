import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditCourseForm } from "./_components/EditCourseForm";
import { CourseStrucutre } from "./_components/CourseStrucutre";

type Params = Promise<{ courseId: string }>;

export default async function EditRoute({ params }: { params: Params }) {
  const { courseId } = await params;
  const data = await adminGetCourse(courseId);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Edit Course:
        <span className="text-primary underline">{data.title}</span>
      </h1>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-strucutre">Course Strucutre</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Provide basic information about the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="course-strucutre">
          <Card>
            <CardHeader>
              <CardTitle>Course Strucutre</CardTitle>
              <CardDescription>
                Here you can update your Course Strucutre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseStrucutre data={data}/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
