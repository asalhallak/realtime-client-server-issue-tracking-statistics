import React from 'react';
import './App.css';
import useGenerateStory from "./hooks/useGenerateStory";
import createStory from "./events/createStory";
import {randomIntFromInterval, sleep} from "./utils/common";
import useStats from "./hooks/useStats";
import {Story} from "./model/Story";


function App() {
    const {story, next} = useGenerateStory()
    const stats = useStats()


    React.useEffect(() => {
        handleStoryCreation(story)

    }, [story]);

    const handleStoryCreation = async (story: Story) => {
        const randomSleepTimeMs = randomIntFromInterval(10, 500)
        createStory(story)
        await sleep(randomSleepTimeMs)
        next()
    }

    const tdStyle = {padding: '10px', border: '1px solid black'}
    return (
        <div className="App">
            {

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <table style={{borderCollapse: 'collapse', textAlign: 'center'}}>
                        <tbody>
                        <tr>
                            <td style={tdStyle}>Stories Produced Per Second</td>
                            <td style={tdStyle}>{stats?.storiesProducedPerSec}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Stories Completed Per Second</td>
                            <td style={tdStyle}>{stats?.storiesCompletedPerSec}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Completed Stories</td>
                            <td style={tdStyle}>{stats?.completedStories}</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Open Stories</td>
                            <td style={tdStyle}>{stats?.openStories}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default App;
