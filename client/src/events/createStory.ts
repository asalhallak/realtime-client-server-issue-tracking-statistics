import socket from "../socket";
import {Story} from "../model/Story";

const STATS_EVENT = 'createStory';

export default function createStory (story: Story) {
    socket.emit(STATS_EVENT, story)
}
