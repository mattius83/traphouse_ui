export class Node {

    name: string;
    id: string;
    subnetId: string;
    manufacturer: string;
    model: string;
    os: string;
    type: string;
    connections: Array<string>;

    constructor(name, id) {
        this.name = name;
        this.id = id;
     }

}
