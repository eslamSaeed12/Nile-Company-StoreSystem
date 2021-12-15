import { validateOrReject } from "class-validator";
import { plainToClass, ClassConstructor } from "class-transformer";

export default (cls: ClassConstructor<any>, body: object) => {
  const classBody = plainToClass(cls, body);

  return validateOrReject(classBody, {
    validationError: { target: false, value: false },
    stopAtFirstError: true,
  });
};
