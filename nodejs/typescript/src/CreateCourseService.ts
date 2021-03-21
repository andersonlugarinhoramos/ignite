/**
 * name - string
 * duration - number
 * educator - string
 */

interface ICourse {
  name: string;
  duration?: number;
  eduactor: string;
}

class CreateCourseService {
  execute(data: ICourse) {
    console.log(data);
  }
}

export default new CreateCourseService();