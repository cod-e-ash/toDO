export interface toDoList {
    _id: string;
    user: string;
    title: string;
    content: toDoItem[];
    lastupd: Date;
}

export interface toDoItem {
    _id: string;
    text: string;
    done: boolean;
}
