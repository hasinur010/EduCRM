export class Level{
    key: string;
    levelNO: string;
    batches: string[];

    constructor(levelNO: string, batches?: string[], key?: string){
        this.key = key ? key : "unknown";
        this.levelNO = levelNO;
        this.batches = batches? batches : [];
    }

}