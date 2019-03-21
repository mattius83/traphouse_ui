export class Subnet {

    name: string;
    id: string;
    sysAdmin: string;
    type: string;
    connections: Array<string>;

    constructor(name, id, sysAdmin, connections) {
        this.type = 'subnet';
        this.name = name;
        this.id = id;
        this.sysAdmin = sysAdmin;
        this.connections = connections;
     }

}
