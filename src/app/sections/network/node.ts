
export class Node {
    subnetId: string;
    id: string;
    currentUserName: string;
    manufacturer: string;
    model: string;
    osType: string;
    type: string;
    macAddress: string;
    ipAddress: string;
    networkType: string;
    connections: Array<string>;

    constructor(name, id) {
        this.currentUserName = name;
        this.id = id;
     }

}
