export interface toDoList{
    _id: string;
    title: string;
    content: toDoItem[];
    lastupd: Date;
}

export interface toDoItem{
    text: string;
    status: boolean;
}
