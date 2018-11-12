export interface toDoList{
    _id: string;
    user: string;
    title: string;
    content: toDoItem[];
    lastupd: Date;
}

export interface toDoItem{
    text: string;
    done: boolean;
}
