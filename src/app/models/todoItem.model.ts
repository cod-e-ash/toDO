export class toDoItemList{
    _id: string;
    title: string;
    items: toDoItem[];
    lastupd: Date;
}

export class toDoItem{
    content: string;
    status: boolean;
}
