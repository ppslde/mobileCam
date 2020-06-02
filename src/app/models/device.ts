export class Device {
    id: string;
    label: string;
    isInput: boolean;
    isVideo: boolean;

    constructor(id: string, label: string, isInput: boolean = false, isVideo: boolean = false) { 
        this.id = id;
        this.label = label;
        this.isInput = isInput;
        this.isVideo = isVideo;
     }
}