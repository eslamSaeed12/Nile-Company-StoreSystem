import { ClassConstructor } from "class-transformer";
import {
  Job,
  RecurrenceRule,
  RecurrenceSpecDateRange,
  RecurrenceSpecObjLit,
  scheduleJob,
} from "node-schedule";

interface ITask {
  run(): void;
  schedule(): void;
  getJob(): Job;
  cancel(): void;
}

interface ITaskConfiguration {
  name: string;
  rule:
    | string
    | number
    | RecurrenceRule
    | RecurrenceSpecDateRange
    | RecurrenceSpecObjLit
    | Date;
}

const TASK_SYMBOL = Symbol.for("TASK_INSTANCE");

export function Task(taskConfig: ITaskConfiguration) {
  return function (target: ClassConstructor<TaskRunner>) {
    Reflect.defineMetadata(TASK_SYMBOL, taskConfig, target);
  };
}

export abstract class TaskRunner implements ITask {
  public static token = Symbol("JOB");

  private job!: Job;

  getJob(): Job {
    return this.job;
  }

  private getConfigFromDecorator(): ITaskConfiguration {
    let conf = <ITaskConfiguration>(
      Reflect.getMetadata(TASK_SYMBOL, this.constructor)
    );
    if (!conf || conf === undefined) {
      throw Error(
        "Task configuration is missed ,please add Task decorator to your task"
      );
    }
    console.log(conf);
    return conf;
  }

  run(): void {
    let conf = this.getConfigFromDecorator();
    this.job = scheduleJob(conf.name, conf.rule, this.schedule);
  }

  cancel(): void {
    this.job.cancel();
  }

  abstract schedule(): void;
}
