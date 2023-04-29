import { useMemo } from 'react'
import styles from './index.module.css'
import { Task } from '../Task'
import { Alert } from '../Alert'

export function Tasks({
    tasks,
    searchTaskName,
    onRemoveTask,
    onChangeCompletedTask
}) {

    const isVisibleTask = (task) => {
        const taskName = task.name.toLocaleLowerCase()
        return taskName.includes(searchTaskName)
    }

    const stateTasks = useMemo(() => {
        if (tasks.length === 0) {
            return 'empty'
        } else if (!tasks.some(task => isVisibleTask(task))) {
            return 'search-empty'
        }

        return 'default'

    }, [tasks, searchTaskName])

    if (stateTasks === 'empty') {
        return <Alert type={stateTasks} />
    }

    if (stateTasks === 'search-empty') {
        return <Alert type="warning" />
    }

    return (
        <ul className={styles.tasks}>
            {tasks.map(task => isVisibleTask(task) && (
                <Task
                    {...task}
                    key={task.id}
                    onRemove={onRemoveTask}
                    onChangeCompleted={onChangeCompletedTask}
                />
            ))}
        </ul>
    )
}
