import {dateTimeRu} from "../helpers/date";

const toDoFactory = $resource => {
    let taskList = [],
        id = 1,
        requested = false;

    const init = () => {
        $resource('/api/data').query(data => {
            for (let item of data) {
                let {title, text, date} = item;

                taskList.push({
                    id: id++,
                    title: title,
                    text: text,
                    completed: false,
                    opened: dateTimeRu(date),
                    closed: null
                });
            }
        });
        requested = true;

        return taskList;
    };

    const tasks = () => {
        if (requested)
            return taskList;
        else
            return init();
    };

    return {
        getTasks: () => {
            return tasks();
        },
        getActiveTasks: () => {
            return tasks().filter(task => !task.completed)
        },
        addTask: (title, text, date=null) => {
            taskList.push({
                id: id++,
                title: title,
                text: text,
                completed: false,
                opened: dateTimeRu(date),
                closed: null
            });
        },
        removeTask: task => {
            taskList.splice(taskList.indexOf(task), 1);
        },
        toggleTask: task => {
            task.completed = !task.completed;

            if (task.completed)
                task.closed = dateTimeRu();
            else
                task.closed = null;
        },
        removeAllCompleted: () => {
            taskList = taskList.filter(task => !task.completed);
        },
        changeTask: (task, title, text) => {
            task.title = title;
            task.text = text;
        }
    }
};

export default toDoFactory;
