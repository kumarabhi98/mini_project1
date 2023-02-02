export interface Task {
    taskId: string | number;
    name_: string;
    priority: string;
    assignee: string;
    story_points: string;
    status: string;
    date: number;
}