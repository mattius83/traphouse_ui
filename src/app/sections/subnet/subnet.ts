export class Subnet {

    name: string;
    id: string;
    sysAdmin: string;
    connections: Array<string>;

    constructor(name, id, sysAdmin, connections) {
        this.name = name;
        this.id = id;
        this.sysAdmin = sysAdmin;
        this.connections = connections;
     }

}
