import React from 'react';
import {Story, Task} from "../model/Story";
import {randomIntFromInterval} from "../utils/common";

export default function useGenerateStory() {

    const getStory = () => {
        const numberOfTasks = randomIntFromInterval(1, 5)
        const story: Story = {
            status: 'open',
            tasks: Array.from({length: numberOfTasks}, () => {
                const estimate = randomIntFromInterval(0, 1000)
                const task: Task = {
                    estimate,
                    status: 'open'
                }
                return task
            })
        }
        return story
    }


    const [story, setStory] = React.useState<Story>(getStory())

    const next = () => {
        setStory(getStory())
    }


    return {story, next}
}
